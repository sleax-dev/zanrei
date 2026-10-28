import { Button, MessageBar, MessageBarBody, ProgressBar } from "@fluentui/react-components";
import { ShieldCheckmark24Regular } from "@fluentui/react-icons";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HardwareTiles } from "../components/Hardware";
import { LanguagePicker } from "../components/LanguagePicker";
import { ModeCards } from "../components/ModeCards";
import { api, errorText, type Mode, type SystemInfo } from "../lib/api";
import { isRtl, pickLang } from "../i18n";
import { useApp } from "../state";
import { TitleBar } from "../components/TitleBar";

const STEPS = ["language", "scan", "restore", "mode", "done"] as const;
type Step = (typeof STEPS)[number];

export function Setup() {
  const { t, i18n } = useTranslation();
  const { settings, savePrefs, applyRecommended } = useApp();
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [mode, setMode] = useState<Mode>(settings.mode);
  const [restoreOk, setRestoreOk] = useState(false);
  const step: Step = STEPS[i];
  const lang = pickLang(i18n.language);

  const go = (d: number) => {
    setDir(d);
    setI((x) => x + d);
  };

  const finish = async () => {
    await savePrefs({ language: lang, setup_done: true, mode });
    if (mode === "Auto") void applyRecommended(false);
  };

  return (
    <>
      <TitleBar />
      <div className="setup">
        <div className="setup-card">
          <div className="steps" aria-hidden>
            {STEPS.map((x, n) => <i key={x} className={n <= i ? "on" : ""} />)}
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 * dir * (isRtl(lang) ? -1 : 1) }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="stack"
              style={{ gap: 14 }}
            >
              {step === "language" && (
                <>
                  <h2>{t("setup.language.title")}</h2>
                  <p>{t("setup.language.desc")}</p>
                  <LanguagePicker />
                </>
              )}
              {step === "scan" && <ScanStep />}
              {step === "restore" && <RestoreStep ok={restoreOk} onOk={() => setRestoreOk(true)} />}
              {step === "mode" && (
                <>
                  <h2>{t("setup.mode.title")}</h2>
                  <p>{t("setup.mode.desc")}</p>
                  <ModeCards value={mode} onChange={setMode} />
                </>
              )}
              {step === "done" && (
                <>
                  <h2>{t("setup.done.title")}</h2>
                  <p>{mode === "Auto" ? t("setup.done.descAuto") : t("setup.done.desc")}</p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
          <div className="setup-foot">
            <Button appearance="subtle" disabled={i === 0 || step === "done"} onClick={() => go(-1)}>{t("common.back")}</Button>
            {step === "done" ? (
              <Button appearance="primary" onClick={() => void finish()}>{t("setup.done.start")}</Button>
            ) : (
              <Button appearance="primary" disabled={step === "restore" && !restoreOk} onClick={() => go(1)}>{t("common.next")}</Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function ScanStep() {
  const { t } = useTranslation();
  const [info, setInfo] = useState<SystemInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [run, setRun] = useState(0);

  useEffect(() => {
    setError(null);
    api.detectSystem().then(setInfo, (e) => setError(errorText(e)));
  }, [run]);

  return (
    <>
      <h2>{t("setup.scan.title")}</h2>
      <p>{t("setup.scan.desc")}</p>
      {error && (
        <>
          <MessageBar intent="error"><MessageBarBody>{t("setup.scan.failed")} {error}</MessageBarBody></MessageBar>
          <Button onClick={() => setRun((n) => n + 1)}>{t("common.retry")}</Button>
        </>
      )}
      {!info && !error && (
        <>
          <ProgressBar />
          <p>{t("setup.scan.working")}</p>
        </>
      )}
      {info && <HardwareTiles info={info} />}
    </>
  );
}

function RestoreStep({ ok, onOk }: { ok: boolean; onOk: () => void }) {
  const { t } = useTranslation();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = async () => {
    setBusy(true);
    setError(null);
    try {
      await api.createSnapshot("Zanrei – first run");
      onOk();
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <h2>{t("setup.restore.title")}</h2>
      <p>{t("setup.restore.desc")}</p>
      {busy && <ProgressBar />}
      {ok ? (
        <MessageBar intent="success" icon={<ShieldCheckmark24Regular />}>
          <MessageBarBody>{t("setup.restore.done")}</MessageBarBody>
        </MessageBar>
      ) : (
        <Button appearance="primary" disabled={busy} onClick={() => void create()}>
          {busy ? t("setup.restore.creating") : t("setup.restore.create")}
        </Button>
      )}
      {error && (
        <MessageBar intent="error">
          <MessageBarBody>
            <b>{t("setup.restore.failed")}</b>
            <div className="selectable" style={{ fontSize: 12, marginTop: 4 }}>{error}</div>
          </MessageBarBody>
        </MessageBar>
      )}
    </>
  );
}
