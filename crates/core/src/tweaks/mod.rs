//! The tweak catalog and the engine that applies, reverts and inspects entries.
//!
//! Every tweak is data: a list of `Action`s. Applying goes through the snapshot journal; reverting writes the
//! documented Windows default back. State is always read from the system, never remembered.

mod catalog;

use crate::kv::{kv_get, kv_remove, kv_set};
use crate::platform::{Hive, Platform, RegKey, RegValue};
use crate::restore::Store;
use crate::system::Tier;
use crate::{Error, Result, power};
use serde::Serialize;

pub use catalog::{BLOAT_APPS, catalog};

#[derive(Serialize, Clone, Copy, PartialEq, Eq, Debug)]
pub enum Risk {
    Safe,
    Moderate,
    Advanced,
}

/// Ordered by how disruptive the follow-up is, so the largest one wins when several are pending.
#[derive(Serialize, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Debug, Default)]
pub enum Restart {
    #[default]
    None,
    Explorer,
    SignOut,
    Reboot,
}

#[derive(Serialize, Clone, Copy, PartialEq, Eq, Debug)]
pub enum Category {
    Privacy,
    Performance,
    Gaming,
    Interface,
    System,
    Cleanup,
}

#[derive(Debug)]
pub enum Action {
    /// `revert: None` = the value is absent in a stock Windows, so reverting deletes it.
    Reg {
        key: RegKey,
        apply: RegValue,
        revert: Option<RegValue>,
    },
    /// One `field=value;` pair inside a string value; other pairs are left untouched.
    RegKv {
        key: RegKey,
        field: &'static str,
        value: &'static str,
    },
    /// Apply disables the scheduled task, revert enables it.
    Task(&'static str),
    Hibernate,
    HighPerformancePlan,
    RemoveEdge,
    RemoveBloatApps,
}

#[derive(Debug)]
pub struct Tweak {
    pub id: &'static str,
    pub category: Category,
    pub risk: Risk,
    pub restart: Restart,
    /// Lowest Windows build number the tweak makes sense on (0 = any).
    pub min_build: u32,
    pub recommended: &'static [Tier],
    pub reversible: bool,
    /// Stock Windows already behaves like the applied state while the values are absent, so a PC that
    /// never touched them counts as "on". Turning it off writes explicit values instead of deleting.
    pub default_applied: bool,
    pub actions: Vec<Action>,
}

#[derive(Serialize, Clone, Copy, PartialEq, Eq, Debug)]
pub enum State {
    Applied,
    NotApplied,
    Partial,
    /// Wrong Windows version, or nothing to change on this PC.
    Unavailable,
}

#[derive(Serialize, Clone, Debug)]
pub struct TweakInfo {
    pub id: &'static str,
    pub category: Category,
    pub risk: Risk,
    pub restart: Restart,
    pub reversible: bool,
    pub recommended: bool,
    pub state: State,
}

pub fn find(id: &str) -> Option<&'static Tweak> {
    catalog().iter().find(|t| t.id == id)
}

const HIBERNATE: (&str, &str) = (r"SYSTEM\CurrentControlSet\Control\Power", "HibernateEnabled");

fn action_state(p: &dyn Platform, a: &Action) -> Result<Option<bool>> {
    Ok(match a {
        Action::Reg { key, apply, .. } => Some(p.reg_get(key)?.as_ref() == Some(apply)),
        Action::RegKv { key, field, value } => {
            let cur = reg_string(p, key)?;
            Some(kv_get(&cur, field) == Some(*value))
        }
        Action::Task(path) => p.task_enabled(path)?.map(|enabled| !enabled),
        Action::Hibernate => {
            Some(p.reg_get(&RegKey::new(Hive::Hklm, HIBERNATE.0, HIBERNATE.1))? == Some(RegValue::Dword(0)))
        }
        Action::HighPerformancePlan => Some(power::active_scheme(p)? == power::HIGH_PERFORMANCE),
        Action::RemoveEdge => Some(!p.edge_installed()),
        Action::RemoveBloatApps => Some(p.installed_apps(BLOAT_APPS)?.is_empty()),
    })
}

fn reg_string(p: &dyn Platform, key: &RegKey) -> Result<String> {
    Ok(match p.reg_get(key)? {
        Some(RegValue::String(s)) => s,
        _ => String::new(),
    })
}

pub fn state(p: &dyn Platform, t: &Tweak, build: u32) -> State {
    if build < t.min_build {
        return State::Unavailable;
    }
    if t.default_applied
        && t.actions
            .iter()
            .all(|a| matches!(a, Action::Reg { key, .. } if p.reg_get(key).ok().flatten().is_none()))
    {
        return State::Applied;
    }
    let states: Vec<bool> = t
        .actions
        .iter()
        .filter_map(|a| action_state(p, a).ok().flatten())
        .collect();
    match (states.iter().all(|&s| s), states.iter().any(|&s| s)) {
        _ if states.is_empty() => State::Unavailable,
        (true, _) => State::Applied,
        (false, true) => State::Partial,
        (false, false) => State::NotApplied,
    }
}

pub fn info(p: &dyn Platform, t: &Tweak, build: u32, tier: Tier) -> TweakInfo {
    TweakInfo {
        id: t.id,
        category: t.category,
        risk: t.risk,
        restart: t.restart,
        reversible: t.reversible,
        recommended: t.recommended.contains(&tier),
        state: state(p, t, build),
    }
}

/// Applies every action of `t` inside snapshot `sid`. Stops at the first failure; what already changed stays in the journal.
pub fn apply(store: &Store, p: &dyn Platform, sid: &str, t: &Tweak, build: u32) -> Result<()> {
    if build < t.min_build {
        return Err(Error::Msg("not available on this version of Windows".into()));
    }
    for a in &t.actions {
        match a {
            Action::Reg { key, apply, .. } => store.reg_set(p, sid, key, apply)?,
            Action::RegKv { key, field, value } => {
                let new = kv_set(&reg_string(p, key)?, field, value);
                store.reg_set(p, sid, key, &RegValue::String(new))?;
            }
            Action::Task(path) => store.task_set(p, sid, path, false)?,
            Action::Hibernate => {
                if action_state(p, a)? != Some(true) {
                    store.cmd(p, sid, &["powercfg", "/h", "off"], &["powercfg", "/h", "on"])?;
                }
            }
            Action::HighPerformancePlan => {
                let previous = power::active_scheme(p)?;
                if previous != power::HIGH_PERFORMANCE {
                    power::ensure_high_performance(p)?;
                    store.cmd(
                        p,
                        sid,
                        &["powercfg", "/setactive", power::HIGH_PERFORMANCE],
                        &["powercfg", "/setactive", &previous],
                    )?;
                }
            }
            // Not journaled: an uninstall cannot be replayed backwards, and neither can a restore point be relied on.
            Action::RemoveEdge => {
                if p.edge_installed() {
                    p.remove_edge()?;
                }
            }
            Action::RemoveBloatApps => p.remove_apps(BLOAT_APPS)?,
        }
    }
    Ok(())
}

/// Puts the stock Windows values back.
pub fn revert(p: &dyn Platform, t: &Tweak) -> Result<()> {
    if !t.reversible {
        return Err(Error::Msg("this change cannot be undone".into()));
    }
    // Reverse order: the policy that blocks a reinstall has to go before the reinstall runs.
    for a in t.actions.iter().rev() {
        match a {
            Action::Reg { key, revert, .. } => match revert {
                Some(v) => p.reg_set(key, v)?,
                None => p.reg_delete(key)?,
            },
            Action::RegKv { key, field, .. } => {
                let rest = kv_remove(&reg_string(p, key)?, field);
                if rest.is_empty() {
                    p.reg_delete(key)?;
                } else {
                    p.reg_set(key, &RegValue::String(rest))?;
                }
            }
            Action::Task(path) => {
                if p.task_enabled(path)?.is_some() {
                    p.task_set_enabled(path, true)?;
                }
            }
            Action::Hibernate => {
                p.run("powercfg", &["/h", "on"])?;
            }
            Action::HighPerformancePlan => power::set_scheme(p, power::BALANCED)?,
            // Removing programs cannot be undone; `reversible: false` keeps `revert` from ever getting here.
            Action::RemoveEdge | Action::RemoveBloatApps => {}
        }
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::restore::tests::{Fake, key};
    use std::collections::HashSet;

    fn tweak(actions: Vec<Action>) -> Tweak {
        Tweak {
            id: "t",
            category: Category::Privacy,
            risk: Risk::Safe,
            restart: Restart::None,
            min_build: 0,
            recommended: &[],
            reversible: true,
            default_applied: false,
            actions,
        }
    }

    fn setup() -> (tempfile::TempDir, Store, Fake, String) {
        let dir = tempfile::tempdir().unwrap();
        let store = Store::new(dir.path().into());
        let p = Fake::default();
        let sid = store.create(&p, "test").unwrap().id;
        (dir, store, p, sid)
    }

    #[test]
    fn apply_state_revert_for_registry_tweak() {
        let (_d, store, p, sid) = setup();
        let t = tweak(vec![
            Action::Reg {
                key: key("A"),
                apply: RegValue::Dword(0),
                revert: Some(RegValue::Dword(1)),
            },
            Action::Reg {
                key: key("B"),
                apply: RegValue::Dword(1),
                revert: None,
            },
        ]);
        assert_eq!(state(&p, &t, 19045), State::NotApplied);
        apply(&store, &p, &sid, &t, 19045).unwrap();
        assert_eq!(state(&p, &t, 19045), State::Applied);
        revert(&p, &t).unwrap();
        assert_eq!(state(&p, &t, 19045), State::NotApplied);
        assert_eq!(p.reg_get(&key("A")).unwrap(), Some(RegValue::Dword(1)));
        assert_eq!(p.reg_get(&key("B")).unwrap(), None);
    }

    #[test]
    fn stock_default_counts_as_applied_until_switched_off() {
        let (_d, store, p, sid) = setup();
        let mut t = tweak(vec![Action::Reg {
            key: key("G"),
            apply: RegValue::Dword(1),
            revert: Some(RegValue::Dword(0)),
        }]);
        t.default_applied = true;
        assert_eq!(state(&p, &t, 0), State::Applied); // value absent = Windows default = on
        revert(&p, &t).unwrap(); // switching off writes an explicit 0 ...
        assert_eq!(state(&p, &t, 0), State::NotApplied);
        apply(&store, &p, &sid, &t, 0).unwrap(); // ... and on again restores 1
        assert_eq!(state(&p, &t, 0), State::Applied);
    }

    #[test]
    fn partial_state_and_build_gate() {
        let (_d, store, p, sid) = setup();
        let mut t = tweak(vec![
            Action::Reg {
                key: key("A"),
                apply: RegValue::Dword(0),
                revert: None,
            },
            Action::Reg {
                key: key("B"),
                apply: RegValue::Dword(0),
                revert: None,
            },
        ]);
        store.reg_set(&p, &sid, &key("A"), &RegValue::Dword(0)).unwrap();
        assert_eq!(state(&p, &t, 19045), State::Partial);
        t.min_build = 22621;
        assert_eq!(state(&p, &t, 19045), State::Unavailable);
        assert!(apply(&store, &p, &sid, &t, 19045).is_err());
    }

    #[test]
    fn kv_tweak_leaves_other_settings_alone() {
        let (_d, store, p, sid) = setup();
        p.reg_set(&key("G"), &RegValue::String("VRROptimizeEnable=1;".into()))
            .unwrap();
        let t = tweak(vec![Action::RegKv {
            key: key("G"),
            field: "SwapEffectUpgradeEnable",
            value: "1",
        }]);
        apply(&store, &p, &sid, &t, 22621).unwrap();
        assert_eq!(state(&p, &t, 22621), State::Applied);
        revert(&p, &t).unwrap();
        assert_eq!(
            p.reg_get(&key("G")).unwrap(),
            Some(RegValue::String("VRROptimizeEnable=1;".into()))
        );
    }

    #[test]
    fn task_hibernate_and_power_plan() {
        let (_d, store, p, sid) = setup();
        p.tasks.lock().unwrap().insert("\\T".into(), true);
        let t = tweak(vec![
            Action::Task("\\T"),
            Action::Task("\\Absent"),
            Action::Hibernate,
            Action::HighPerformancePlan,
        ]);
        apply(&store, &p, &sid, &t, 0).unwrap();
        assert_eq!(p.task_enabled("\\T").unwrap(), Some(false));
        let ran = p.ran.lock().unwrap().clone();
        assert!(ran.contains(&"powercfg /h off".to_string()));
        assert!(ran.contains(&format!("powercfg /setactive {}", power::HIGH_PERFORMANCE)));
        // the journal knows how to go back to the Balanced plan that was active
        store.rollback(&p, &sid).unwrap();
        let ran = p.ran.lock().unwrap().clone();
        assert!(ran.contains(&format!("powercfg /setactive {}", power::BALANCED)));
        assert_eq!(p.task_enabled("\\T").unwrap(), Some(true));
    }

    #[test]
    fn removing_programs_cannot_be_reverted() {
        let (_d, store, p, sid) = setup();
        *p.edge.lock().unwrap() = true;
        let mut e = tweak(vec![Action::RemoveEdge]);
        e.reversible = false;
        apply(&store, &p, &sid, &e, 0).unwrap();
        assert_eq!(state(&p, &e, 0), State::Applied);
        assert!(revert(&p, &e).is_err());
        assert!(!p.edge_installed());

        *p.apps.lock().unwrap() = vec!["Microsoft.BingNews".into()];
        let mut b = tweak(vec![Action::RemoveBloatApps]);
        b.reversible = false;
        apply(&store, &p, &sid, &b, 0).unwrap();
        assert_eq!(state(&p, &b, 0), State::Applied);
        assert!(revert(&p, &b).is_err());
    }

    #[test]
    fn catalog_is_well_formed() {
        let ids: HashSet<_> = catalog().iter().map(|t| t.id).collect();
        assert_eq!(ids.len(), catalog().len(), "duplicate tweak id");
        for t in catalog() {
            assert!(!t.actions.is_empty(), "{} has no actions", t.id);
            assert!(
                t.id.chars().all(|c| c.is_ascii_lowercase() || c == '_'),
                "{} is not a valid i18n key",
                t.id
            );
            // anything advanced must never be suggested automatically
            if t.risk == Risk::Advanced {
                assert!(t.recommended.is_empty(), "{} is advanced but recommended", t.id);
            }
            // what cannot be undone is always advanced and always asks first
            if !t.reversible {
                assert!(t.risk == Risk::Advanced, "{} is irreversible but not advanced", t.id);
            }
            // removing software is irreversible by nature
            if t.actions
                .iter()
                .any(|a| matches!(a, Action::RemoveEdge | Action::RemoveBloatApps))
            {
                assert!(!t.reversible, "{} removes software but claims to be reversible", t.id);
            }
        }
    }
}
