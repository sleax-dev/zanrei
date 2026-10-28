import { Button, MessageBar, MessageBarBody, ProgressBar } from "@fluentui/react-components";
import { ArrowUndo20Regular, CheckmarkCircle16Regular, ChevronDown20Regular } from "@fluentui/react-icons";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Confirm } from "../components/Confirm";
import { api, errorText, type Snapshot } from "../lib/api";
import { fmtDateTime } from "../lib/format";
import { useApp } from "../state";

const GAME_OPTION_TEXT: Record<string, string> = { HighGpu: "gpu", NoFso: "fso", HighPriority: "priority" };

export function Restore() {
  const { t, i18n } = useTranslation();
  const { snapshots, reloadSnapshots, reloadTweaks, refreshPending } = useApp();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [ask, setAsk] = useState<Snapshot | null>(null);

  /** "telemetry" -> its name; "game:HighGpu:C:\\g\\a.exe" -> "Use the high-performance GPU: a.exe". */
  const noteText = (note: string) => {
    if (!note.startsWith("game:")) return t(`tweaks.${note}.name`);
    const [, option, ...rest] = note.split(":");
    const exe = rest.join(":").split(/[\\/]/).pop() ?? "";
    return `${t(`games.opt.${GAME_OPTION_TEXT[option] ?? "gpu"}.name`)}: ${exe}`;
  };

  const run = async (job: () => Promise<unknown>) => {
    setBusy(true);
    setError(null);
    try {
      await job();
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy(false);
      await Promise.all([reloadSnapshots(), reloadTweaks(), refreshPending()]);
    }
  };

  const title = (s: Snapshot) => (s.notes.length ? t("restore.entryTitle", { count: s.notes.length }) : t("restore.manual"));

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>{t("nav.restore")}</h1>
          <p>{t("pageDesc.restore")}</p>
        </div>
        <div className="btn-row">
          <Button disabled={busy} onClick={() => void run(() => api.createSnapshot("Zanrei"))}>{busy ? t("restore.creating") : t("restore.create")}</Button>
          <Button appearance="subtle" onClick={() => void run(api.openSystemRestore)}>{t("restore.openSystem")}</Button>
        </div>
      </div>
      {busy && <ProgressBar />}
      {error && (
        <MessageBar intent="error">
          <MessageBarBody><b>{t("restore.failed")}.</b> <span className="selectable">{error}</span></MessageBarBody>
        </MessageBar>
      )}
      {!snapshots.length && <p className="muted">{t("restore.empty")}</p>}
      <div className="rows">
        {snapshots.map((snap) => {
          const isOpen = open === snap.id;
          return (
            <div key={snap.id} className="game">
              <div className="row">
                <button className="game-head" aria-expanded={isOpen} disabled={!snap.notes.length} onClick={() => setOpen(isOpen ? null : snap.id)}>
                  <span className="info">
                    <span className="name">{title(snap)}</span>
                    <span className="desc">{fmtDateTime(snap.created_unix, i18n.language)}</span>
                  </span>
                  {snap.notes.length > 0 && <ChevronDown20Regular className={isOpen ? "chev open" : "chev"} />}
                </button>
                <div className="ctl">
                  {snap.rolled_back ? (
                    <span className="flag"><CheckmarkCircle16Regular />{t("restore.rolledBack")}</span>
                  ) : (
                    <Button icon={<ArrowUndo20Regular />} disabled={busy || snap.entries.length === 0} onClick={() => setAsk(snap)}>{t("restore.rollback")}</Button>
                  )}
                </div>
              </div>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }} className="note-list">
                    {snap.notes.map((n) => <li key={n}>{noteText(n)}</li>)}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <Confirm open={ask !== null} title={t("restore.confirmTitle")} confirmLabel={t("restore.rollback")} onClose={() => setAsk(null)} onConfirm={() => ask && void run(() => api.rollbackSnapshot(ask.id))}>
        <p>{t("restore.confirmBody")}</p>
        {ask && ask.notes.length > 0 && <ul className="note-list plain">{ask.notes.map((n) => <li key={n}>{noteText(n)}</li>)}</ul>}
      </Confirm>
    </div>
  );
}
