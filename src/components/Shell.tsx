import { ArrowUndo24Regular, Flash24Regular, Home24Regular, Settings24Regular, XboxController24Regular } from "@fluentui/react-icons";
import { AnimatePresence, motion } from "motion/react";
import { type ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Category } from "../lib/api";
import { Games } from "../pages/Games";
import { Optimize } from "../pages/Optimize";
import { Overview } from "../pages/Overview";
import { Restore } from "../pages/Restore";
import { SettingsPage } from "../pages/SettingsPage";
import { useApp } from "../state";
import { Floating } from "./Floating";
import { TitleBar } from "./TitleBar";

export type Page = "overview" | "optimize" | "games" | "restore" | "settings";

const NAV: { page: Page; icon: ReactNode }[] = [
  { page: "overview", icon: <Home24Regular /> },
  { page: "optimize", icon: <Flash24Regular /> },
  { page: "games", icon: <XboxController24Regular /> },
  { page: "restore", icon: <ArrowUndo24Regular /> },
  { page: "settings", icon: <Settings24Regular /> },
];

export function Shell() {
  const { t } = useTranslation();
  const { update } = useApp();
  const [page, setPage] = useState<Page>("overview");
  const [category, setCategory] = useState<Category | "all">("all");

  const open = (p: Page, c: Category | "all" = "all") => {
    setCategory(c);
    setPage(p);
  };

  return (
    <>
      <TitleBar />
      <div className="body">
        <nav className="sidebar">
          {NAV.map((n) => (
            <button key={n.page} className={`nav-item${page === n.page ? " active" : ""}`} onClick={() => open(n.page)}>
              {page === n.page && <motion.span layoutId="nav-ind" className="ind" transition={{ type: "spring", stiffness: 500, damping: 36 }} />}
              {n.icon}
              <span>{t(`nav.${n.page}`)}</span>
            </button>
          ))}
          <span className="spacer" />
          {update?.available && (
            <button className="update-chip" onClick={() => open("settings")}>
              {t("settings.updateAvailable", { version: update.available.version })}
            </button>
          )}
        </nav>
        <main className="content">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={page} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.16 }}>
              {page === "overview" && <Overview onOpen={open} />}
              {page === "optimize" && <Optimize category={category} onCategory={setCategory} />}
              {page === "games" && <Games />}
              {page === "restore" && <Restore />}
              {page === "settings" && <SettingsPage />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      <Floating />
    </>
  );
}
