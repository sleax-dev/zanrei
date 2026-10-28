import { makeStyles, NavDrawer, NavDrawerBody, NavItem, tokens } from "@fluentui/react-components";
import { ArrowUndo24Regular, Home24Regular, Settings24Regular } from "@fluentui/react-icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Overview } from "../pages/Overview";
import { Restore } from "../pages/Restore";
import { SettingsPage } from "../pages/SettingsPage";
import type { Settings } from "../lib/api";

type Page = "overview" | "restore" | "settings";

const useStyles = makeStyles({
  root: { height: "100%", display: "flex" },
  nav: { width: "240px", flexShrink: 0, backgroundColor: "transparent" },
  main: { flex: 1, overflowY: "auto", padding: tokens.spacingHorizontalXXL },
});

export function Shell({ settings, onChange }: { settings: Settings; onChange: (s: Settings) => void }) {
  const s = useStyles();
  const { t } = useTranslation();
  const [page, setPage] = useState<Page>("overview");
  return (
    <div className={s.root}>
      <NavDrawer open type="inline" className={s.nav} selectedValue={page} onNavItemSelect={(_, d) => setPage(d.value as Page)}>
        <NavDrawerBody>
          <NavItem value="overview" icon={<Home24Regular />}>{t("nav.overview")}</NavItem>
          <NavItem value="restore" icon={<ArrowUndo24Regular />}>{t("nav.restore")}</NavItem>
          <NavItem value="settings" icon={<Settings24Regular />}>{t("nav.settings")}</NavItem>
        </NavDrawerBody>
      </NavDrawer>
      <main className={s.main}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={page} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }}>
            {page === "overview" && <Overview />}
            {page === "restore" && <Restore />}
            {page === "settings" && <SettingsPage settings={settings} onChange={onChange} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
