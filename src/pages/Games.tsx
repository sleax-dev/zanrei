import { Button, Spinner, Switch } from "@fluentui/react-components";
import { Add20Regular, ArrowClockwise20Regular, Delete20Regular, Open20Regular } from "@fluentui/react-icons";
import { open as pickFile } from "@tauri-apps/plugin-dialog";
import { openUrl } from "@tauri-apps/plugin-opener";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api, errorText, type GameInfo, type GameOption, type Gpu } from "../lib/api";
import { useApp } from "../state";

const OPTIONS: { key: GameOption; field: "high_gpu" | "no_fso" | "high_priority"; text: "gpu" | "fso" | "priority" }[] = [
  { key: "HighGpu", field: "high_gpu", text: "gpu" },
  { key: "NoFso", field: "no_fso", text: "fso" },
  { key: "HighPriority", field: "high_priority", text: "priority" },
];

const DRIVER_PAGES: Record<Gpu["vendor"], string | null> = {
  Nvidia: "https://www.nvidia.com/Download/index.aspx",
  Amd: "https://www.amd.com/en/support/download/drivers.html",
  Intel: "https://www.intel.com/content/www/us/en/download-center/home.html",
  Other: null,
};

const TWO_YEARS = 2 * 365 * 24 * 3600;

export function Games() {
  const { t, i18n } = useTranslation();
  const { settings, savePrefs, boost, system, toast } = useApp();
  const [games, setGames] = useState<GameInfo[] | null>(null);
  const [working, setWorking] = useState<string | null>(null);

  const load = useCallback(async () => {
    setGames(null);
    try {
      setGames(await api.listGames());
    } catch (e) {
      toast(errorText(e), "error");
      setGames([]);
    }
  }, [toast]);
  useEffect(() => void load(), [load]);

  const set = async (g: GameInfo, option: GameOption, enabled: boolean) => {
    setWorking(`${g.id}:${option}`);
    try {
      const options = await api.setGameOption(g.exe, option, enabled);
      setGames((l) => l?.map((x) => (x.id === g.id ? { ...x, options } : x)) ?? l);
    } catch (e) {
      toast(errorText(e), "error");
    } finally {
      setWorking(null);
    }
  };

  const add = async () => {
    const file = await pickFile({ multiple: false, filters: [{ name: "Executable", extensions: ["exe"] }] });
    if (typeof file !== "string") return;
    const name = (file.split(/[\\/]/).pop() ?? file).replace(/\.exe$/i, "");
    try {
      await api.addCustomGame(name, file);
      await load();
    } catch (e) {
      toast(errorText(e), "error");
    }
  };

  const remove = async (g: GameInfo) => {
    await api.removeCustomGame(g.exe).catch((e) => toast(errorText(e), "error"));
    await load();
  };

  const now = Date.now() / 1000;
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>{t("games.title")}</h1>
          <p>{t("games.desc")}</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Button icon={<ArrowClockwise20Regular />} onClick={() => void load()}>{t("games.rescan")}</Button>
          <Button appearance="primary" icon={<Add20Regular />} onClick={() => void add()}>{t("games.add")}</Button>
        </div>
      </div>

      <div className="card">
        <div className="row" style={{ padding: 0, border: 0 }}>
          <div className="info">
            <div className="name">{t("games.boostTitle")} {boost.active && <span className="pill accent">{t("games.on")}</span>}</div>
            <div className="desc">{t("games.boostDesc")}</div>
            {boost.active && <div className="desc selectable">{t("games.boostActive", { game: boost.game ?? "" })}</div>}
          </div>
          <div className="ctl">
            <Switch checked={settings.game_boost} onChange={(_, d) => void savePrefs({ game_boost: d.checked })} aria-label={t("games.boostTitle")} />
          </div>
        </div>
      </div>

      {system && system.gpus.length > 0 && (
        <div className="card">
          <h2>{t("games.gpuTitle")}</h2>
          <div className="stack">
            {system.gpus.map((g) => {
              const old = g.driver_date_unix !== null && now - g.driver_date_unix > TWO_YEARS;
              const page = DRIVER_PAGES[g.vendor];
              return (
                <div key={g.name} className="row" style={{ padding: "6px 0", border: 0 }}>
                  <div className="info">
                    <div className="name selectable">{g.name} <span className="pill">{g.vendor}</span></div>
                    <div className="desc selectable">
                      {t("games.driver")} {g.driver_version}
                      {g.driver_date_unix !== null && ` · ${new Date(g.driver_date_unix * 1000).toLocaleDateString(i18n.language)}`}
                    </div>
                    {old && <div className="meta"><span className="pill warn">{t("games.driverOld")}</span></div>}
                  </div>
                  {page && (
                    <div className="ctl">
                      <Button size="small" icon={<Open20Regular />} onClick={() => void openUrl(page)}>{t("games.driverCheck")}</Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {games === null && <Spinner label={t("games.scanning")} />}
      {games?.length === 0 && <p style={{ color: "var(--muted)" }}>{t("games.empty")}</p>}
      <AnimatePresence initial={false}>
        {games?.map((g) => (
          <motion.div key={g.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }} className="card">
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div style={{ minWidth: 0 }}>
                <div className="name" style={{ fontWeight: 600, display: "flex", gap: 8, alignItems: "center" }}>
                  {g.name} <span className="pill">{g.launcher}</span>
                </div>
                <div className="selectable" style={{ color: "var(--muted)", fontSize: 12, wordBreak: "break-all" }}>{g.exe}</div>
              </div>
              {g.launcher === "Custom" && <Button appearance="subtle" icon={<Delete20Regular />} aria-label={t("common.remove")} onClick={() => void remove(g)} />}
            </div>
            <div className="rows" style={{ marginTop: 12, background: "transparent" }}>
              {OPTIONS.map((o) => (
                <div className="row" key={o.key} style={{ padding: "10px 4px" }}>
                  <div className="info">
                    <div className="name">{t(`games.opt.${o.text}.name`)}</div>
                    <div className="desc">{t(`games.opt.${o.text}.desc`)}</div>
                  </div>
                  <div className="ctl">
                    {working === `${g.id}:${o.key}` && <Spinner size="tiny" />}
                    <Switch checked={g.options[o.field]} disabled={working !== null} onChange={(_, d) => void set(g, o.key, d.checked)} aria-label={t(`games.opt.${o.text}.name`)} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
