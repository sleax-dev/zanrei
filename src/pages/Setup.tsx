import { Button, Dropdown, makeStyles, MessageBar, MessageBarBody, Option, ProgressBar, Subtitle1, Text, Title2, tokens } from "@fluentui/react-components";
import { ShieldCheckmark24Regular } from "@fluentui/react-icons";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Hardware } from "../components/Hardware";
import { ModeCards } from "../components/ModeCards";
import { api, type Mode, type Settings, type SystemInfo } from "../lib/api";
import { isRtl, LANGUAGES, type Lang, pickLang, setLanguage } from "../i18n";

const STEPS = ["language", "scan", "restore", "mode", "done"] as const;
type Step = (typeof STEPS)[number];

const useStyles = makeStyles({
  root: { height: "100%", display: "grid", placeItems: "center", padding: tokens.spacingHorizontalXXL },
  card: {
    width: "min(640px, 100%)",
    padding: tokens.spacingHorizontalXXL,
    borderRadius: tokens.borderRadiusXLarge,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow16,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    minHeight: "420px",
  },
  body: { flex: 1, display: "flex", flexDirection: "column", gap: tokens.spacingVerticalM },
  footer: { display: "flex", justifyContent: "space-between" },
  dots: { display: "flex", gap: tokens.spacingHorizontalXS },
});

export function Setup({ initial, onDone }: { initial: Settings; onDone: (s: Settings) => void }) {
  const s = useStyles();
  const { t, i18n } = useTranslation();
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [mode, setMode] = useState<Mode>(initial.mode);
  const [restoreOk, setRestoreOk] = useState(false);
  const step: Step = STEPS[i];

  const go = (d: number) => {
    setDir(d);
    setI((x) => x + d);
  };
  const lang = pickLang(i18n.language);
  const canNext = step !== "restore" || restoreOk; // restore point is mandatory

  return (
    <div className={s.root}>
      <div className={s.card}>
        <div className={s.dots} aria-hidden>
          {STEPS.map((x, n) => (
            <ProgressBar key={x} value={n <= i ? 1 : 0} thickness="medium" style={{ flex: 1 }} />
          ))}
        </div>
        <div className={s.body}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 * dir * (isRtl(lang) ? -1 : 1) }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{ display: "flex", flexDirection: "column", gap: tokens.spacingVerticalM }}
            >
              {step === "language" && <LanguageStep lang={lang} />}
              {step === "scan" && <ScanStep />}
              {step === "restore" && <RestoreStep ok={restoreOk} onOk={() => setRestoreOk(true)} />}
              {step === "mode" && (
                <>
                  <Title2>{t("setup.mode.title")}</Title2>
                  <Text>{t("setup.mode.desc")}</Text>
                  <ModeCards value={mode} onChange={setMode} />
                </>
              )}
              {step === "done" && (
                <>
                  <Title2>{t("setup.done.title")}</Title2>
                  <Text>{t("setup.done.desc")}</Text>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className={s.footer}>
          <Button appearance="subtle" disabled={i === 0 || step === "done"} onClick={() => go(-1)}>
            {t("common.back")}
          </Button>
          {step === "done" ? (
            <Button appearance="primary" onClick={() => onDone({ language: lang, setup_done: true, mode })}>
              {t("setup.done.start")}
            </Button>
          ) : (
            <Button appearance="primary" disabled={!canNext} onClick={() => go(1)}>
              {t("common.next")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function LanguageStep({ lang }: { lang: Lang }) {
  const { t } = useTranslation();
  return (
    <>
      <Title2>{t("setup.language.title")}</Title2>
      <Text>{t("setup.language.desc")}</Text>
      <Dropdown
        value={LANGUAGES[lang]}
        selectedOptions={[lang]}
        onOptionSelect={(_, d) => d.optionValue && setLanguage(d.optionValue as Lang)}
      >
        {Object.entries(LANGUAGES).map(([k, name]) => (
          <Option key={k} value={k}>{name}</Option>
        ))}
      </Dropdown>
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
    api.detectSystem().then(setInfo, (e) => setError(String(e)));
  }, [run]);

  return (
    <>
      <Title2>{t("setup.scan.title")}</Title2>
      <Text>{t("setup.scan.desc")}</Text>
      {error && (
        <MessageBar intent="error">
          <MessageBarBody>{t("setup.scan.failed")} {error}</MessageBarBody>
        </MessageBar>
      )}
      {error && <Button onClick={() => setRun((n) => n + 1)}>{t("common.retry")}</Button>}
      {!info && !error && (
        <>
          <ProgressBar />
          <Text size={200}>{t("setup.scan.working")}</Text>
        </>
      )}
      {info && <Hardware info={info} />}
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
      setError(String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Title2>{t("setup.restore.title")}</Title2>
      <Text>{t("setup.restore.desc")}</Text>
      {busy && <ProgressBar />}
      {ok ? (
        <MessageBar intent="success" icon={<ShieldCheckmark24Regular />}>
          <MessageBarBody>{t("setup.restore.done")}</MessageBarBody>
        </MessageBar>
      ) : (
        <Button appearance="primary" disabled={busy} onClick={create}>
          {busy ? t("setup.restore.creating") : t("setup.restore.create")}
        </Button>
      )}
      {error && (
        <MessageBar intent="error">
          <MessageBarBody>
            <Subtitle1 as="p" block>{t("setup.restore.failed")}</Subtitle1>
            <Text size={200} className="selectable">{error}</Text>
          </MessageBarBody>
        </MessageBar>
      )}
    </>
  );
}
