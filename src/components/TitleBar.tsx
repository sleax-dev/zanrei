import { ArrowMinimize16Regular } from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";
import { api } from "../lib/api";
import { useApp } from "../state";
import { Logo } from "./Logo";

/** Windows 11 style caption area. No maximize or close on purpose: the only action is "send to background". */
export function TitleBar() {
  const { t } = useTranslation();
  const { boost } = useApp();
  return (
    <div className="titlebar" data-tauri-drag-region>
      <span className="brand">
        <Logo />
        <span>Zanrei</span>
      </span>
      {boost.active && <span className="pill accent">{t("titlebar.boost", { game: boost.game ?? "" })}</span>}
      <span className="grow" data-tauri-drag-region />
      <button className="tb-btn" title={t("titlebar.background")} aria-label={t("titlebar.background")} onClick={() => void api.sendToBackground()}>
        <ArrowMinimize16Regular />
      </button>
    </div>
  );
}
