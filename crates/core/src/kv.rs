//! Tiny parsers for the two string formats Windows packs several settings into.

/// `A=1;B=2;` (DirectX user GPU preferences).
pub fn kv_get<'a>(s: &'a str, field: &str) -> Option<&'a str> {
    s.split(';')
        .filter_map(|p| p.split_once('='))
        .find(|(k, _)| k.trim() == field)
        .map(|(_, v)| v.trim())
}

/// Sets `field`, keeping every other pair and their order.
pub fn kv_set(s: &str, field: &str, value: &str) -> String {
    let mut found = false;
    let mut parts: Vec<String> = s
        .split(';')
        .filter(|p| !p.trim().is_empty())
        .map(|p| match p.split_once('=') {
            Some((k, _)) if k.trim() == field => {
                found = true;
                format!("{field}={value}")
            }
            _ => p.trim().to_string(),
        })
        .collect();
    if !found {
        parts.push(format!("{field}={value}"));
    }
    parts.iter().map(|p| format!("{p};")).collect()
}

/// Removes `field`; an empty result means nothing is left to store.
pub fn kv_remove(s: &str, field: &str) -> String {
    s.split(';')
        .filter(|p| !p.trim().is_empty() && p.split_once('=').is_none_or(|(k, _)| k.trim() != field))
        .map(|p| format!("{};", p.trim()))
        .collect()
}

/// `~ FLAG1 FLAG2` (AppCompat compatibility layers; `~` marks a per-user entry).
pub fn flags_has(s: &str, flag: &str) -> bool {
    s.split_whitespace().any(|t| t == flag)
}

pub fn flags_add(s: &str, flag: &str) -> String {
    let mut tokens: Vec<&str> = s.split_whitespace().filter(|t| *t != "~").collect();
    if !tokens.contains(&flag) {
        tokens.push(flag);
    }
    format!("~ {}", tokens.join(" "))
}

/// `None` = no flags left, delete the value.
pub fn flags_remove(s: &str, flag: &str) -> Option<String> {
    let tokens: Vec<&str> = s.split_whitespace().filter(|t| *t != "~" && *t != flag).collect();
    (!tokens.is_empty()).then(|| format!("~ {}", tokens.join(" ")))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn kv_roundtrip_keeps_other_fields() {
        let s = kv_set("VRROptimizeEnable=1;", "SwapEffectUpgradeEnable", "1");
        assert_eq!(s, "VRROptimizeEnable=1;SwapEffectUpgradeEnable=1;");
        assert_eq!(kv_get(&s, "SwapEffectUpgradeEnable"), Some("1"));
        assert_eq!(
            kv_set(&s, "VRROptimizeEnable", "0"),
            "VRROptimizeEnable=0;SwapEffectUpgradeEnable=1;"
        );
        assert_eq!(kv_remove(&s, "SwapEffectUpgradeEnable"), "VRROptimizeEnable=1;");
        assert_eq!(kv_remove("A=1;", "A"), "");
        assert_eq!(kv_get("", "A"), None);
    }

    #[test]
    fn flags_keep_existing_layers() {
        let s = flags_add("~ HIGHDPIAWARE", "DISABLEDXMAXIMIZEDWINDOWEDMODE");
        assert_eq!(s, "~ HIGHDPIAWARE DISABLEDXMAXIMIZEDWINDOWEDMODE");
        assert!(flags_has(&s, "HIGHDPIAWARE"));
        assert_eq!(
            flags_remove(&s, "DISABLEDXMAXIMIZEDWINDOWEDMODE").as_deref(),
            Some("~ HIGHDPIAWARE")
        );
        assert_eq!(flags_remove("~ A", "A"), None);
        assert_eq!(flags_add("", "A"), "~ A");
    }
}
