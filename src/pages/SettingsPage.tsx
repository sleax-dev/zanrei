import { Button, ProgressBar, Radio, RadioGroup, Slider, Switch } from "@fluentui/react-components";
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguagePicker } from "../components/LanguagePicker";
import { api, type AppStats, errorText, type Mode } from "../lib/api";
import { fmtDateTime } from "../lib/format";
import { useApp } from "../state";
import { PageHead } from "../components/PageHead";
import { ACCENTS, loadPicture } from "../look";

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
  const { settings, savePrefs, picture, setPicture, update, checkForUpdate, installUpdate, toast } = useApp();
  const fileInput = useRef<HTMLInputElement>(null);
  // Live numbers from stats.sleax.dev, refreshed while the page is open.
  const [stats, setStats] = useState<AppStats | null>(null);
  const [statsFailed, setStatsFailed] = useState(false);
  useEffect(() => {
    let alive = true;
    const load = () =>
      api.appStats().then(
        (s) => {
          if (alive) (setStats(s), setStatsFailed(false));
        },
        () => {
          if (alive) setStatsFailed(true);
        },
      );
    void load();
    const timer = setInterval(load, 30_000);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, []);
  const num = (n: number) => new Intl.NumberFormat(i18n.language).format(n ?? 0);
  const fromPicture = !!picture && settings.accent_from_bg;
  const isPreset = ACCENTS.includes(settings.accent.toLowerCase());

  const pickPicture = async (file: File | undefined) => {
    if (!file) return;
    try {
      await setPicture(await loadPicture(file));
    } catch {
      toast(t("look.failed"), "error");
    }
  };
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
        <div className="sect-head"><h2>{t("look.title")}</h2></div>
        <div className="rows">
          <div className="row stackrow">
            <div className="info">
              <div className="name">{t("look.accent")}</div>
              <div className="desc">{t("look.accentDesc")}</div>
            </div>
            <div className="swatches" role="radiogroup" aria-label={t("look.accent")}>
              {ACCENTS.map((c) => (
                <button
                  key={c}
                  className="swatch"
                  role="radio"
                  style={{ "--c": c } as CSSProperties}
                  aria-checked={!fromPicture && settings.accent.toLowerCase() === c}
                  aria-label={c}
                  onClick={() => void savePrefs({ accent: c, accent_from_bg: false })}
                />
              ))}
              <label
                className="swatch custom"
                role="radio"
                aria-checked={!isPreset && !fromPicture}
                title={t("look.custom")}
                style={{ "--c": isPreset ? "transparent" : settings.accent } as CSSProperties}
              >
                <input
                  type="color"
                  value={settings.accent}
                  aria-label={t("look.custom")}
                  onChange={(e) => void savePrefs({ accent: e.target.value, accent_from_bg: false })}
                />
              </label>
            </div>
          </div>
          <Setting title={t("look.background")} desc={t("look.backgroundDesc")}>
            <div className="picture-row">
              {picture && <img className="picture-thumb" src={picture} alt="" />}
              <Button onClick={() => fileInput.current?.click()}>{t("look.pick")}</Button>
              {picture && <Button appearance="subtle" onClick={() => void setPicture("")}>{t("look.remove")}</Button>}
              <input
                ref={fileInput}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  void pickPicture(e.target.files?.[0]);
                  e.target.value = "";
                }}
              />
            </div>
          </Setting>
          {picture && (
            <>
              <Setting title={t("look.blur")} desc={t("look.blurDesc")}>
                <Switch checked={settings.bg_blur} onChange={(_, d) => void savePrefs({ bg_blur: d.checked })} aria-label={t("look.blur")} />
              </Setting>
              <Setting title={t("look.dim")} desc={t("look.dimDesc")}>
                <Slider
                  min={0}
                  max={90}
                  step={5}
                  value={Math.round(settings.bg_dim * 100)}
                  onChange={(_, d) => void savePrefs({ bg_dim: d.value / 100 })}
                  aria-label={t("look.dim")}
                />
              </Setting>
              <Setting title={t("look.fromPicture")} desc={t("look.fromPictureDesc")}>
                <Switch checked={settings.accent_from_bg} onChange={(_, d) => void savePrefs({ accent_from_bg: d.checked })} aria-label={t("look.fromPicture")} />
              </Setting>
            </>
          )}
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
        <div className="sect-head"><h2>{t("settings.community")}</h2></div>
        <div className="rows">
          <div className="row">
            <div className="info">
              <div className="name">
                {stats ? <><span className="live-dot" aria-hidden="true" />{t("settings.liveNow", { n: num(stats.live) })}</> : statsFailed ? t("settings.statsError") : "…"}
              </div>
            </div>
          </div>
          <Setting title={t("settings.usageStats")} desc={t("settings.usageStatsDesc")}>
            <Switch checked={settings.usage_stats} onChange={(_, d) => void savePrefs({ usage_stats: d.checked })} aria-label={t("settings.usageStats")} />
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
