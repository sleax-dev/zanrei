import { Button, ProgressBar, Switch } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguagePicker } from "../components/LanguagePicker";
import { ModeCards } from "../components/ModeCards";
import { api, errorText } from "../lib/api";
import { useApp } from "../state";

function Setting({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <div className="row">
      <div className="info">
        <div className="name">{title}</div>
        {desc && <div className="desc">{desc}</div>}
      </div>
      <div className="ctl">{children}</div>
    </div>
  );
}

export function SettingsPage() {
  const { t, i18n } = useTranslation();
  const { settings, savePrefs, update, checkForUpdate, installUpdate, toast } = useApp();
  const [autostart, setAutostart] = useState<boolean | null>(null);
  const [cleaning, setCleaning] = useState(false);

  useEffect(() => void api.getAutostart().then(setAutostart, () => setAutostart(false)), []);

  const toggleAutostart = async (on: boolean) => {
    setAutostart(on);
    try {
      await api.setAutostart(on);
    } catch (e) {
      setAutostart(!on);
      toast(errorText(e), "error");
    }
  };

  const clean = async () => {
    setCleaning(true);
    try {
      const bytes = await api.cleanTemp();
      toast(t("settings.cleaned", { size: (bytes / 2 ** 20).toFixed(1) }), "success");
    } catch (e) {
      toast(errorText(e), "error");
    } finally {
      setCleaning(false);
    }
  };

  const pct = update?.installing && update.total ? update.downloaded / update.total : undefined;
  return (
    <div className="page">
      <div className="page-head"><h1>{t("settings.title")}</h1></div>

      <section className="stack">
        <h2 style={{ margin: 0, fontSize: 15 }}>{t("settings.general")}</h2>
        <div className="rows">
          <Setting title={t("settings.language")}>
            <LanguagePicker onChange={(l) => void savePrefs({ language: l })} />
          </Setting>
        </div>
        <h2 style={{ margin: "8px 0 0", fontSize: 15 }}>{t("setup.mode.title")}</h2>
        <ModeCards value={settings.mode} onChange={(mode) => void savePrefs({ mode })} />
      </section>

      <section className="stack">
        <h2 style={{ margin: 0, fontSize: 15 }}>{t("settings.background")}</h2>
        <div className="rows">
          <Setting title={t("settings.runInBackground")} desc={t("settings.runInBackgroundDesc")}>
            <Switch checked={settings.run_in_background} onChange={(_, d) => void savePrefs({ run_in_background: d.checked })} />
          </Setting>
          <Setting title={t("settings.startWithWindows")} desc={t("settings.startWithWindowsDesc")}>
            <Switch checked={autostart === true} disabled={autostart === null} onChange={(_, d) => void toggleAutostart(d.checked)} />
          </Setting>
          <Setting title={t("games.boostTitle")} desc={t("games.boostDesc")}>
            <Switch checked={settings.game_boost} onChange={(_, d) => void savePrefs({ game_boost: d.checked })} />
          </Setting>
        </div>
      </section>

      <section className="stack">
        <h2 style={{ margin: 0, fontSize: 15 }}>{t("settings.updates")}</h2>
        <div className="rows">
          <Setting title={t("settings.version", { version: update?.current ?? "" })} desc={update?.last_checked_unix ? t("settings.lastChecked", { when: new Date(update.last_checked_unix * 1000).toLocaleString(i18n.language) }) : undefined}>
            <Button disabled={update?.checking || update?.installing} onClick={() => void checkForUpdate()}>
              {update?.checking ? t("settings.checking") : t("settings.checkNow")}
            </Button>
          </Setting>
          <Setting title={t("settings.autoUpdate")} desc={t("settings.autoUpdateDesc")}>
            <Switch checked={settings.auto_update} onChange={(_, d) => void savePrefs({ auto_update: d.checked })} />
          </Setting>
          {update?.available && (
            <Setting title={t("settings.updateAvailable", { version: update.available.version })} desc={update.available.notes ?? undefined}>
              <Button appearance="primary" disabled={update.installing} onClick={() => void installUpdate()}>
                {update.installing ? t("settings.installing") : t("settings.install")}
              </Button>
            </Setting>
          )}
        </div>
        {update?.installing && <ProgressBar value={pct} />}
        {update?.error && <p className="selectable" style={{ color: "var(--bad)", margin: 0 }}>{update.error}</p>}
      </section>

      <section className="stack">
        <h2 style={{ margin: 0, fontSize: 15 }}>{t("settings.tools")}</h2>
        <div className="rows">
          <Setting title={t("settings.cleanTemp")} desc={t("settings.cleanTempDesc")}>
            <Button disabled={cleaning} onClick={() => void clean()}>{cleaning ? t("settings.cleaning") : t("settings.clean")}</Button>
          </Setting>
          <Setting title={t("settings.quit")} desc={t("settings.quitDesc")}>
            <Button onClick={() => void api.quitApp()}>{t("settings.quit")}</Button>
          </Setting>
        </div>
      </section>
    </div>
  );
}
