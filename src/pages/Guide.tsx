import { Button, Tab, TabList } from "@fluentui/react-components";
import { ChevronDown20Regular, Open20Regular } from "@fluentui/react-icons";
import { openUrl } from "@tauri-apps/plugin-opener";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ATLAS_FACTS, ATLAS_LINKS, FRESH_GAINS, GROUPS, INSTALL_STEPS, ITEMS, REQUIREMENTS_URL, REVIOS_URL, WIN10_ENDED_URL, type GuideItem,
} from "../guide";
import { useApp } from "../state";
import { Collapse } from "../components/Collapse";
import { PageHead } from "../components/PageHead";

type Link = { key: string; url: string };

function Links({ links }: { links: Link[] }) {
  const { t } = useTranslation();
  return (
    <>
      {links.map((l) => (
        <Button key={l.key} size="small" icon={<Open20Regular />} onClick={() => void openUrl(l.url)}>{t(`guide.link.${l.key}`)}</Button>
      ))}
    </>
  );
}

function Item({ item, open, toggle }: { item: GuideItem; open: boolean; toggle: () => void }) {
  const { t } = useTranslation();
  const { setPage } = useApp();
  return (
    <div className="game">
      <button className="game-head" aria-expanded={open} onClick={toggle}>
        <span className="info">
          <span className="name">{t(`guide.items.${item.id}.title`)}</span>
          <span className="g-tags">
            <span className={`g-tag impact-${item.impact}`}>{t(`guide.impact.${item.impact}`)}</span>
            <span className="g-tag">{t(`guide.effort.${item.effort}`)}</span>
          </span>
        </span>
        <ChevronDown20Regular className={open ? "chev open" : "chev"} />
      </button>
      <Collapse open={open} className="game-body">
        <div className="g-body selectable">
          <p>{t(`guide.items.${item.id}.why`)}</p>
          <ol className="g-steps">
            {Array.from({ length: item.steps }, (_, i) => <li key={i}>{t(`guide.items.${item.id}.s${i + 1}`)}</li>)}
          </ol>
          {item.caution && <p className="g-caution">{t(`guide.items.${item.id}.caution`)}</p>}
          {(item.links || item.goto) && (
            <div className="notice-actions">
              {item.goto && <Button size="small" appearance="primary" onClick={() => setPage(item.goto!)}>{t(`guide.goto.${item.goto}`)}</Button>}
              {item.links && <Links links={item.links} />}
            </div>
          )}
        </div>
      </Collapse>
    </div>
  );
}

function Yourself() {
  const { t } = useTranslation();
  const [open, setOpen] = useState<string | null>(null);
  return (
    <>
      <p className="muted g-intro">{t("guide.yourself.intro")}</p>
      {GROUPS.map((g) => (
        <section key={g} className="g-group">
          <h2>{t(`guide.group.${g}.title`)}</h2>
          <p className="muted small">{t(`guide.group.${g}.desc`)}</p>
          <div className="rows">
            {ITEMS.filter((i) => i.group === g).map((i) => (
              <Item key={i.id} item={i} open={open === i.id} toggle={() => setOpen(open === i.id ? null : i.id)} />
            ))}
          </div>
        </section>
      ))}
      <p className="muted small">{t("guide.yourself.honest")}</p>
    </>
  );
}

function Fresh() {
  const { t } = useTranslation();
  const { system } = useApp();
  return (
    <>
      <section className="panel">
        <div className="sect-head"><h2>{t("guide.fresh.title")}</h2></div>
        <p className="muted">{t("guide.fresh.intro")}</p>
        <ul className="g-list">
          {FRESH_GAINS.map((k) => <li key={k}>{t(`guide.fresh.gain.${k}`)}</li>)}
        </ul>
        <p className="g-caution">{t("guide.fresh.warning")}</p>
      </section>

      <section className="panel g-atlas">
        <div className="sect-head">
          <h2>{t("guide.atlas.title")}</h2>
          <span className="os-badge">{t("guide.atlas.badge")}</span>
        </div>
        <p className="muted">{t("guide.atlas.intro")}</p>
        <ul className="g-list">
          {ATLAS_FACTS.map((k) => <li key={k}>{t(`guide.atlas.fact.${k}`)}</li>)}
        </ul>
        <p className="muted small">{t("guide.atlas.videos")}</p>
        <div className="notice-actions"><Links links={ATLAS_LINKS} /></div>
        <p className="muted small">{t("guide.atlas.others")} <button className="linkish" onClick={() => void openUrl(REVIOS_URL)}>ReviOS</button></p>
      </section>

      <section className={`notice${system && !system.is_windows_11 ? " warn" : ""}`}>
        <div className="notice-head"><h2>{t("guide.win10.title")}</h2></div>
        <p>{t("guide.win10.body")}</p>
        <div className="notice-actions">
          <Links links={[{ key: "win10Ended", url: WIN10_ENDED_URL }, { key: "requirements", url: REQUIREMENTS_URL }]} />
        </div>
      </section>

      <section className="panel">
        <div className="sect-head"><h2>{t("guide.install.title")}</h2></div>
        <p className="muted">{t("guide.install.intro")}</p>
        <ol className="g-flow">
          {INSTALL_STEPS.map((s) => (
            <li key={s.id}>
              <div className="g-flow-body selectable">
                <b>{t(`guide.install.step.${s.id}.title`)}</b>
                <span className="muted">{t(`guide.install.step.${s.id}.body`)}</span>
                {s.links && <div className="notice-actions"><Links links={s.links} /></div>}
              </div>
            </li>
          ))}
        </ol>
        <p className="muted small">{t("guide.install.atlasNote")}</p>
      </section>
    </>
  );
}

/** Everything that cannot be done from inside a running Windows by an app: settings in the BIOS, hardware, and starting over. */
export function Guide() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<"yourself" | "fresh">("yourself");
  return (
    <div className="page">
      <PageHead title={t("nav.guide")} desc={t("pageDesc.guide")} />
      <TabList selectedValue={tab} onTabSelect={(_, d) => setTab(d.value as "yourself" | "fresh")}>
        <Tab value="yourself">{t("guide.tab.yourself")}</Tab>
        <Tab value="fresh">{t("guide.tab.fresh")}</Tab>
      </TabList>
      {tab === "yourself" ? <Yourself /> : <Fresh />}
    </div>
  );
}
