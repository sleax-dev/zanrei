import { Button, Spinner, Switch } from "@fluentui/react-components";
import { Add20Regular, ArrowClockwise20Regular, ChevronDown20Regular, Delete20Regular } from "@fluentui/react-icons";
import { open as pickFile } from "@tauri-apps/plugin-dialog";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SkeletonRows } from "../components/Skeleton";
import { api, errorText, type GameInfo, type GameOption } from "../lib/api";
import { useApp } from "../state";

const OPTIONS: { key: GameOption; field: "high_gpu" | "no_fso" | "high_priority"; text: "gpu" | "fso" | "priority" }[] = [
  { key: "HighGpu", field: "high_gpu", text: "gpu" },
  { key: "NoFso", field: "no_fso", text: "fso" },
  { key: "HighPriority", field: "high_priority", text: "priority" },
];

export function Library() {
  const { t } = useTranslation();
  const { settings, savePrefs, boost, toast } = useApp();
  const [games, setGames] = useState<GameInfo[] | null>(null);
  const [open, setOpen] = useState<string | null>(null);
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

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>{t("nav.library")}</h1>
          <p>{t("pageDesc.library")}</p>
        </div>
        <div className="btn-row">
          <Button icon={<ArrowClockwise20Regular />} onClick={() => void load()}>{t("games.rescan")}</Button>
          <Button icon={<Add20Regular />} onClick={() => void add()}>{t("games.add")}</Button>
        </div>
      </div>

      <div className="rows">
        <div className="row">
          <div className="info">
            <div className="name">{t("games.boostTitle")}</div>
            <div className="desc">{t("games.boostDesc")}</div>
            <div className="desc selectable">
              {boost.active ? t("games.boostActive", { game: boost.game ?? "" }) : settings.game_boost ? t("games.boostWaiting") : t("games.boostOff")}
            </div>
          </div>
          <div className="ctl"><Switch checked={settings.game_boost} onChange={(_, d) => void savePrefs({ game_boost: d.checked })} aria-label={t("games.boostTitle")} /></div>
        </div>
      </div>

      <section className="stack">
        <div className="sect-head"><h2>{t("games.yourGames")}</h2></div>
      {games === null && <SkeletonRows count={6} status={t("games.scanning")} switches={false} />}
      {games?.length === 0 && <p className="muted">{t("games.empty")}</p>}
      {games && games.length > 0 && <p className="muted small" style={{ margin: 0 }}>{t("games.found", { count: games.length, launchers: [...new Set(games.map((g) => g.launcher))].join(", ") })}</p>}
      <div className="rows">
        {games?.map((g) => {
          const isOpen = open === g.id;
          const onCount = OPTIONS.filter((o) => g.options[o.field]).length;
          return (
            <div key={g.id} className="game">
              <button className="game-head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : g.id)}>
                <span className="info">
                  <span className="name">{g.name}</span>
                  <span className="desc">{g.launcher}{onCount > 0 ? ` · ${t("games.optionsOn", { count: onCount })}` : ""}</span>
                </span>
                <ChevronDown20Regular className={isOpen ? "chev open" : "chev"} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }} className="game-body">
                    <div className="selectable path">{g.exe}</div>
                    {OPTIONS.map((o) => (
                      <div className="row sub" key={o.key}>
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
                    {g.launcher === "Custom" && (
                      <div className="game-foot">
                        <Button size="small" appearance="subtle" icon={<Delete20Regular />} onClick={() => void remove(g)}>{t("games.removeFromList")}</Button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      </section>
    </div>
  );
}
