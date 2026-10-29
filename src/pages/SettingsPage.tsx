import { Button, ProgressBar, Radio, RadioGroup, Switch } from "@fluentui/react-components";
import { type ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguagePicker } from "../components/LanguagePicker";
import { api, errorText, type Mode } from "../lib/api";
import { fmtDateTime } from "../lib/format";
import { useApp } from "../state";
import { PageHead } from "../components/PageHead";

const MODES: { value: Mode; key: "manual" | "recommended" | "auto" }[] = [
  { value: "Manual", key: "manual" },
  { value: "Recommended", key: "recommended" },
  { value: "Auto", key: "auto" },
];

function Setting({ title, desc, children }: { title: string; desc?: string; children: ReactNode }) {
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

  const pct = update?.installing && update.total ? update.downloaded / update.total : undefined;
  const modeKey = MODES.find((m) => m.value === settings.mode)?.key ?? "recommended";
  return (
    <div className="page">
      <PageHead title={t("nav.settings")} desc={t("pageDesc.settings")} />

      <section className="stack">
        <div className="sect-head"><h2>{t("settings.general")}</h2></div>
        <div className="rows">
          <Setting title={t("settings.language")}><LanguagePicker onChange={(l) => void savePrefs({ language: l })} /></Setting>
          <div className="row stackrow">
            <div className="info">
              <div className="name">{t("settings.automation")}</div>
              <div className="desc">{t(`setup.mode.${modeKey}.desc`)}</div>
            </div>
            <RadioGroup layout="horizontal" value={settings.mode} onChange={(_, d) => void savePrefs({ mode: d.value as Mode })} aria-label={t("settings.automation")}>
              {MODES.map((m) => <Radio key={m.value} value={m.value} label={t(`setup.mode.${m.key}.name`)} />)}
            </RadioGroup>
          </div>
        </div>
      </section>

      <section className="stack">
        <div className="sect-head"><h2>{t("settings.background")}</h2></div>
        <div className="rows">
          <Setting title={t("settings.runInBackground")} desc={t("settings.runInBackgroundDesc")}>
            <Switch checked={settings.run_in_background} onChange={(_, d) => void savePrefs({ run_in_background: d.checked })} aria-label={t("settings.runInBackground")} />
          </Setting>
          <Setting title={t("settings.startWithWindows")} desc={t("settings.startWithWindowsDesc")}>
            <Switch checked={autostart ?? false} disabled={autostart === null} onChange={(_, d) => void toggleAutostart(d.checked)} aria-label={t("settings.startWithWindows")} />
          </Setting>
        </div>
      </section>

      <section className="stack">
        <div className="sect-head"><h2>{t("settings.updates")}</h2></div>
        <div className="rows">
          <Setting
            title={t("settings.version", { version: update?.current ?? "" })}
            desc={update?.last_checked_unix ? t("settings.lastChecked", { when: fmtDateTime(update.last_checked_unix, i18n.language) }) : undefined}
          >
            <Button disabled={update?.checking || update?.installing} onClick={() => void checkForUpdate()}>
              {update?.checking ? t("settings.checking") : t("settings.checkNow")}
            </Button>
          </Setting>
          <Setting title={t("settings.autoUpdate")} desc={t("settings.autoUpdateDesc")}>
            <Switch checked={settings.auto_update} onChange={(_, d) => void savePrefs({ auto_update: d.checked })} aria-label={t("settings.autoUpdate")} />
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
        {update?.error && <p className="selectable bad-text">{update.error}</p>}
      </section>

      <section className="stack">
        <div className="sect-head"><h2>{t("settings.tools")}</h2></div>
        <div className="rows">
          <Setting title={t("settings.quit")} desc={t("settings.quitDesc")}>
            <Button onClick={() => void api.quitApp()}>{t("settings.quit")}</Button>
          </Setting>
        </div>
      </section>
    </div>
  );
}
