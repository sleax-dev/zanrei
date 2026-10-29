import { ArrowDownload16Regular } from "@fluentui/react-icons";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { ICONS, NAV_GROUPS, type Page, TWEAK_PAGES } from "../nav";
import { CategoryPage } from "../pages/CategoryPage";
import { Graphics } from "../pages/Graphics";
import { Library } from "../pages/Library";
import { Logs } from "../pages/Logs";
import { Overview } from "../pages/Overview";
import { Restore } from "../pages/Restore";
import { SettingsPage } from "../pages/SettingsPage";
import { Startup } from "../pages/Startup";
import { useApp } from "../state";
import { Floating } from "./Floating";
import { RestartDock } from "./RestartDock";
import { TitleBar } from "./TitleBar";

function NavButton({ page }: { page: Page }) {
  const { t } = useTranslation();
  const { page: current, setPage, tweaks, unseenErrors } = useApp();
  const active = current === page;
  const Icon = ICONS[page][active ? 1 : 0];
  const cats = TWEAK_PAGES[page];
  const list = cats && tweaks ? tweaks.filter((x) => cats.includes(x.category) && x.state !== "Unavailable") : null;
  const on = list?.filter((x) => x.state === "Applied").length ?? 0;
  return (
    <button className={`nav-item${active ? " active" : ""}`} aria-current={active ? "page" : undefined} onClick={() => setPage(page)}>
      {active && <motion.span layoutId="nav-ind" className="ind" transition={{ type: "spring", stiffness: 500, damping: 36 }} />}
      <Icon />
      <span className="label">{t(`nav.${page}`)}</span>
      {list && <span className="count" aria-label={t("nav.countLabel", { on, total: list.length })}>{on}/{list.length}</span>}
      {page === "logs" && unseenErrors > 0 && <span className="dot" role="img" aria-label={t("nav.newErrors", { count: unseenErrors })} />}
    </button>
  );
}

function PageView({ page }: { page: Page }) {
  if (page === "overview") return <Overview />;
  if (TWEAK_PAGES[page]) return <CategoryPage page={page} />;
  if (page === "startup") return <Startup />;
  if (page === "library") return <Library />;
  if (page === "graphics") return <Graphics />;
  if (page === "restore") return <Restore />;
  if (page === "logs") return <Logs />;
  return <SettingsPage />;
}

export function Shell() {
  const { t } = useTranslation();
  const { page, setPage, update } = useApp();
  return (
    <>
      <TitleBar />
      <div className="body">
        <nav className="sidebar" aria-label={t("nav.label")}>
          {NAV_GROUPS.map((g) => (
            <div className="nav-group" key={g.label ?? "main"}>
              {g.label && <div className="nav-label">{t(`nav.group.${g.label}`)}</div>}
              {g.pages.map((p) => <NavButton key={p} page={p} />)}
            </div>
          ))}
          <span className="spacer" />
          {update?.available && (
            <button className="update-chip" onClick={() => setPage("settings")}>
              <ArrowDownload16Regular />
              {t("settings.updateTo", { version: update.available.version })}
            </button>
          )}
          <NavButton page="settings" />
        </nav>
        <main className="content">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={page} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.14 }}>
              <PageView page={page} />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <RestartDock />
      <Floating />
    </>
  );
}
