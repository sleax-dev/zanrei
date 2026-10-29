import { Button } from "@fluentui/react-components";
import { Info20Regular, Open20Regular, Warning20Regular, Window20Regular } from "@fluentui/react-icons";
import { openUrl } from "@tauri-apps/plugin-opener";
import { useTranslation } from "react-i18next";
import { WIN10_ENDED_URL } from "../guide";
import type { SystemInfo } from "../lib/api";
import { useApp } from "../state";

const FLAVOR_DOCS = { atlas: "https://docs.atlasos.net", revios: "https://github.com/meetrevision/playbook" } as const;

/** "Windows 11 Pro · 24H2 · Build 26100", with the modified-Windows name beside it when there is one. */
export function WindowsStrip({ info }: { info: SystemInfo }) {
  const { t } = useTranslation();
  const name = `Windows ${info.is_windows_11 ? 11 : 10}${info.edition ? ` ${info.edition}` : ""}`;
  const parts = [name, info.display_version, t("overview.build", { build: info.os_build })].filter(Boolean);
  return (
    <div className="os-strip selectable">
      <Window20Regular />
      <span>{parts.join(" · ")}</span>
      {info.flavor && (
        <span className="os-badge" title={t("os.flavor.badgeHint", { name: info.flavor.name })}>
          {info.flavor.name}{info.flavor.version ? ` ${info.flavor.version}` : ""}
        </span>
      )}
    </div>
  );
}

/** What this Windows means for the user, when it is a modified build or one that no longer gets free security fixes. */
export function OsNotice({ info }: { info: SystemInfo }) {
  const { t } = useTranslation();
  const { setPage } = useApp();
  const flavor = info.flavor;
  return (
    <>
      {flavor && (
        <section className="notice">
          <div className="notice-head"><Info20Regular /><h2>{t("os.flavor.title", { name: flavor.name, version: flavor.version ?? "" }).trim()}</h2></div>
          <p>{t("os.flavor.body", { name: flavor.name })}</p>
          <ul>
            <li>{t("os.flavor.keep", { name: flavor.name })}</li>
            <li>{t("os.flavor.restore")}</li>
            <li>{t("os.flavor.own", { name: flavor.name })}</li>
          </ul>
          <div className="notice-actions">
            <Button size="small" icon={<Open20Regular />} onClick={() => void openUrl(FLAVOR_DOCS[flavor.id])}>{t("os.flavor.docs", { name: flavor.name })}</Button>
          </div>
        </section>
      )}
      {!info.is_windows_11 && (
        <section className="notice warn">
          <div className="notice-head"><Warning20Regular /><h2>{t("os.win10.title")}</h2></div>
          <p>{t("os.win10.body")}</p>
          <div className="notice-actions">
            <Button size="small" appearance="primary" onClick={() => setPage("guide")}>{t("os.win10.guide")}</Button>
            <Button size="small" icon={<Open20Regular />} onClick={() => void openUrl(WIN10_ENDED_URL)}>{t("os.win10.microsoft")}</Button>
          </div>
        </section>
      )}
    </>
  );
}
