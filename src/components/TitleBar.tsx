import { Dismiss16Regular, Subtract16Regular } from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";
import { api } from "../lib/api";
import { useApp } from "../state";
import { Logo } from "./Logo";

/** Windows 11 style caption area: drag region, minimize to the taskbar, close. The window has a fixed size, so there is no maximize. */
export function TitleBar() {
  const { t } = useTranslation();
  const { settings } = useApp();
  // Close keeps Zanrei in the tray only once setup is done and background mode is on (see on_window_event).
  const closeLabel = settings.setup_done && settings.run_in_background ? t("titlebar.closeToTray") : t("titlebar.close");
  return (
    <div className="titlebar" data-tauri-drag-region>
      <span className="brand">
        <Logo width={22} />
        <span>Zanrei</span>
      </span>
      <span className="grow" data-tauri-drag-region />
      <button className="tb-btn" title={t("titlebar.minimize")} aria-label={t("titlebar.minimize")} onClick={() => void api.minimizeWindow()}>
        <Subtract16Regular />
      </button>
      <button className="tb-btn close" title={closeLabel} aria-label={closeLabel} onClick={() => void api.closeWindow()}>
        <Dismiss16Regular />
      </button>
    </div>
  );
}
