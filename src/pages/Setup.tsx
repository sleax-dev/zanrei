import { Button, Checkbox, MessageBar, MessageBarBody, ProgressBar, Spinner } from "@fluentui/react-components";
import { Checkmark12Regular, CheckmarkCircle20Regular, ShieldCheckmark20Regular, Warning16Regular } from "@fluentui/react-icons";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguagePicker } from "../components/LanguagePicker";
import { Logo } from "../components/Logo";
import { SkeletonRows } from "../components/Skeleton";
import { PcSummary } from "../components/PcSummary";
import { isRtl, pickLang } from "../i18n";
import { useApp } from "../state";

type Step = "welcome" | "recommend" | "done";
const STEPS: Step[] = ["welcome", "recommend", "done"];

/** Three steps: hello, here is what suits your PC (ticked, one button), done. The mandatory restore point is made by the first change. */
export function Setup() {
  const { t, i18n } = useTranslation();
  const { savePrefs } = useApp();
  const [step, setStep] = useState<Step>("welcome");
  const [applied, setApplied] = useState(0);
  const lang = pickLang(i18n.language);
  const i = STEPS.indexOf(step);

  const finish = () => void savePrefs({ language: lang, setup_done: true, mode: applied > 0 ? "Auto" : "Recommended" });

  return (
    <motion.div className="setup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
      <motion.div className="setup-card" initial={{ opacity: 0, y: 14, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}>
        <ol className="stepper" aria-label={t("setup.progress", { current: i + 1, total: STEPS.length })}>
          {STEPS.map((x, n) => (
            <li key={x} className={n < i ? "done" : n === i ? "now" : ""} aria-current={n === i ? "step" : undefined}>
              <span className="dot">{n < i ? <Checkmark12Regular /> : n + 1}</span>
              <span className="lbl">{t(`setup.steps.${x}`)}</span>
            </li>
          ))}
        </ol>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 * (isRtl(lang) ? -1 : 1) }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 * (isRtl(lang) ? -1 : 1) }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            className="stack"
            style={{ gap: 16, flex: 1 }}
          >
            {step === "welcome" && <Welcome onNext={() => setStep("recommend")} />}
            {step === "recommend" && <Recommend onBack={() => setStep("welcome")} onDone={(n) => { setApplied(n); setStep("done"); }} />}
            {step === "done" && <Done applied={applied} onFinish={finish} />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function Welcome({ onNext }: { onNext: () => void }) {
  const { t } = useTranslation();
  return (
    <>
      <Logo width={84} />
      <h2>{t("setup.welcome.title")}</h2>
      <p>{t("setup.welcome.body")}</p>
      <ul className="promises">
        <li><ShieldCheckmark20Regular />{t("setup.welcome.p1")}</li>
        <li><ShieldCheckmark20Regular />{t("setup.welcome.p2")}</li>
        <li><ShieldCheckmark20Regular />{t("setup.welcome.p3")}</li>
      </ul>
      <div className="lang-line">
        <span className="muted small">{t("setup.welcome.language")}</span>
        <LanguagePicker />
      </div>
      <div className="setup-foot"><span /><Button appearance="primary" size="large" onClick={onNext}>{t("setup.welcome.start")}</Button></div>
    </>
  );
}

function Recommend({ onBack, onDone }: { onBack: () => void; onDone: (applied: number) => void }) {
  const { t } = useTranslation();
  const { system, tweaks, settings, setTweak, reloadTweaks } = useApp();
  const [checked, setChecked] = useState<Set<string> | null>(null);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [failure, setFailure] = useState<string | null>(null);
  const seeded = useRef(false);

  const candidates = useMemo(
    () => (tweaks ?? []).filter((x) => x.recommended && x.risk !== "Advanced" && (x.state === "NotApplied" || x.state === "Partial") && !settings.user_disabled.includes(x.id)),
    [tweaks, settings.user_disabled],
  );
  const alreadyOn = (tweaks ?? []).filter((x) => x.recommended && x.state === "Applied").length;

  // Safe ones start ticked; moderate ones are offered but never pre-selected.
  useEffect(() => {
    if (tweaks && !seeded.current) {
      seeded.current = true;
      setChecked(new Set(candidates.filter((x) => x.risk === "Safe").map((x) => x.id)));
    }
  }, [tweaks, candidates]);

  const toggle = (id: string, on: boolean) =>
    setChecked((c) => {
      const n = new Set(c);
      if (on) n.add(id);
      else n.delete(id);
      return n;
    });

  const apply = async () => {
    const ids = candidates.filter((x) => checked?.has(x.id)).map((x) => x.id);
    if (!ids.length) return onDone(0);
    setFailure(null);
    let ok = 0;
    for (const [n, id] of ids.entries()) {
      setProgress({ done: n, total: ids.length });
      const error = await setTweak(id, true);
      if (error !== null) {
        // The first change creates the restore point; if that cannot be made, nothing may change.
        setFailure(error);
        setProgress(null);
        await reloadTweaks();
        return;
      }
      ok++;
    }
    setProgress(null);
    onDone(ok);
  };

  const loading = tweaks === null || system === null || checked === null;
  const count = checked?.size ?? 0;
  return (
    <>
      <h2>{t("setup.recommend.title")}</h2>
      {loading ? (
        <div className="scan">
          <p className="muted">{t("setup.scan.working")}</p>
          <SkeletonRows count={5} status={t("setup.scan.working")} switches={false} />
        </div>
      ) : (
        <>
          <p>
            {t(`overview.tier.${system.tier}`)} · {t("setup.recommend.found", { count: candidates.length })}
            {alreadyOn > 0 && ` ${t("setup.recommend.alreadyOn", { count: alreadyOn })}`}
          </p>
          {candidates.length === 0 ? (
            <p className="ok-line"><CheckmarkCircle20Regular />{t("overview.summaryDone")}</p>
          ) : (
            <ul className="pick-list">
              {candidates.map((x) => (
                <li key={x.id}>
                  <Checkbox checked={checked.has(x.id)} disabled={progress !== null} onChange={(_, d) => toggle(x.id, !!d.checked)} label={t(`tweaks.${x.id}.name`)} />
                  <span className="desc">{t(`tweaks.${x.id}.desc`)}</span>
                  {x.risk === "Moderate" && <span className="flag warn"><Warning16Regular />{t("optimize.risk.Moderate")}</span>}
                </li>
              ))}
            </ul>
          )}
          <details className="pc-details">
            <summary>{t("setup.recommend.pc")}</summary>
            <PcSummary info={system} />
          </details>
          <p className="muted small note"><ShieldCheckmark20Regular />{t("setup.recommend.safety")}</p>
          {failure !== null && (
            <MessageBar intent="error">
              <MessageBarBody>
                <b>{t("setup.recommend.failed")}</b>
                <div className="selectable small">{failure}</div>
              </MessageBarBody>
            </MessageBar>
          )}
          {progress && <ProgressBar value={progress.done / progress.total} />}
        </>
      )}
      <div className="setup-foot">
        <Button appearance="subtle" disabled={progress !== null} onClick={onBack}>{t("common.back")}</Button>
        <div className="btn-row">
          {!loading && candidates.length > 0 && <Button appearance="subtle" disabled={progress !== null} onClick={() => onDone(0)}>{t("setup.recommend.skip")}</Button>}
          <Button appearance="primary" size="large" disabled={loading || progress !== null} icon={progress ? <Spinner size="tiny" /> : undefined} onClick={() => void apply()}>
            {progress
              ? t("setup.recommend.applying", { done: progress.done + 1, total: progress.total })
              : failure !== null
                ? t("common.retry")
                : candidates.length === 0
                  ? t("common.next")
                  : t("setup.recommend.apply", { count })}
          </Button>
        </div>
      </div>
    </>
  );
}

function Done({ applied, onFinish }: { applied: number; onFinish: () => void }) {
  const { t } = useTranslation();
  return (
    <>
      <CheckmarkCircle20Regular style={{ width: 40, height: 40, color: "var(--ok)" }} />
      <h2>{t("setup.done.title")}</h2>
      <p>{applied > 0 ? t("setup.done.applied", { count: applied }) : t("setup.done.nothing")}</p>
      <p className="muted">{applied > 0 ? t("setup.done.autoNote") : t("setup.done.manualNote")}</p>
      <div className="setup-foot"><span /><Button appearance="primary" size="large" onClick={onFinish}>{t("setup.done.start")}</Button></div>
    </>
  );
}
