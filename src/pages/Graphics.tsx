import { Button, MessageBar, MessageBarActions, MessageBarBody, MessageBarTitle } from "@fluentui/react-components";
import { Open20Regular } from "@fluentui/react-icons";
import { openUrl } from "@tauri-apps/plugin-opener";
import { useTranslation } from "react-i18next";
import { gb, type Gpu } from "../lib/api";
import { fmtDay } from "../lib/format";
import { useApp } from "../state";

const DRIVER_PAGES: Record<Gpu["vendor"], string | null> = {
  Nvidia: "https://www.nvidia.com/Download/index.aspx",
  Amd: "https://www.amd.com/en/support/download/drivers.html",
  Intel: "https://www.intel.com/content/www/us/en/download-center/home.html",
  Other: null,
};
const VENDOR_NAMES: Record<Gpu["vendor"], string> = { Nvidia: "NVIDIA", Amd: "AMD", Intel: "Intel", Other: "" };
const TWO_YEARS = 2 * 365 * 24 * 3600;

export function Graphics() {
  const { t, i18n } = useTranslation();
  const { system, setPage } = useApp();
  const now = Date.now() / 1000;
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>{t("nav.graphics")}</h1>
          <p>{t("pageDesc.graphics")}</p>
        </div>
      </div>

      {system && system.gpus.length === 0 && <p className="muted">{t("overview.noGpu")}</p>}
      {system?.gpus.map((g) => {
        const old = g.driver_date_unix !== null && now - g.driver_date_unix > TWO_YEARS;
        const page = DRIVER_PAGES[g.vendor];
        return (
          <section key={g.name} className="panel">
            <div className="sect-head"><h2 className="selectable">{g.name}</h2></div>
            {old && (
              <MessageBar intent="warning">
                <MessageBarBody>
                  <MessageBarTitle>{t("graphics.oldTitle")}</MessageBarTitle>
                  {t("graphics.oldBody")}
                </MessageBarBody>
                {page && (
                  <MessageBarActions>
                    <Button size="small" icon={<Open20Regular />} onClick={() => void openUrl(page)}>{t("games.driverCheck")}</Button>
                  </MessageBarActions>
                )}
              </MessageBar>
            )}
            <dl className="dl">
              {VENDOR_NAMES[g.vendor] && <div className="dl-row"><dt>{t("graphics.maker")}</dt><dd>{VENDOR_NAMES[g.vendor]}</dd></div>}
              <div className="dl-row"><dt>{t("games.driver")}</dt><dd className="selectable">{g.driver_version}</dd></div>
              {g.driver_date_unix !== null && <div className="dl-row"><dt>{t("graphics.driverDate")}</dt><dd>{fmtDay(g.driver_date_unix * 1000, i18n.language)}</dd></div>}
              {g.vram_bytes !== null && <div className="dl-row"><dt>{t("graphics.memory")}</dt><dd>{gb(g.vram_bytes)}</dd></div>}
            </dl>
            {page && !old && (
              <div><Button size="small" icon={<Open20Regular />} onClick={() => void openUrl(page)}>{t("games.driverCheck")}</Button></div>
            )}
          </section>
        );
      })}

      <section className="panel">
        <div className="sect-head"><h2>{t("graphics.tuneTitle")}</h2></div>
        <p className="muted small">{t("graphics.tuneBody")}</p>
        <div><Button size="small" onClick={() => setPage("gaming")}>{t("graphics.openGaming")}</Button></div>
      </section>
    </div>
  );
}
