import { Button, MessageBar, MessageBarBody, ProgressBar } from "@fluentui/react-components";
import { ArrowUndo20Regular, CheckmarkCircle16Regular, ChevronDown20Regular, Delete20Regular } from "@fluentui/react-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Collapse } from "../components/Collapse";
import { Confirm } from "../components/Confirm";
import { SkeletonRows } from "../components/Skeleton";
import { api, errorText, type Snapshot } from "../lib/api";
import { fmtDateTime } from "../lib/format";
import { useApp } from "../state";
import { PageHead } from "../components/PageHead";

const GAME_OPTION_TEXT: Record<string, string> = { HighGpu: "gpu", NoFso: "fso", HighPriority: "priority" };

export function Restore() {
  const { t, i18n } = useTranslation();
  const { snapshots: loaded, reloadSnapshots, reloadTweaks, refreshPending, toast } = useApp();
  const snapshots = loaded ?? [];
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [ask, setAsk] = useState<Snapshot | null>(null);
  const [del, setDel] = useState<Snapshot[] | null>(null);

  /** "telemetry" -> its name; "game:HighGpu:C:\\g\\a.exe" -> "Use the high-performance GPU: a.exe". */
  const noteText = (note: string) => {
    if (note.startsWith("startup:")) return `${t("nav.startup")}: ${note.slice(note.indexOf(":", 8) + 1)}`;
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

  const remove = async (list: Snapshot[]) => {
    setBusy(true);
    try {
      const r = await api.deleteSnapshots(list.map((x) => x.id));
      toast(t("restore.deleted", { count: r.deleted }), "success");
      if (r.windows_points_kept > 0) toast(t("restore.windowsKept", { count: r.windows_points_kept }), "info");
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy(false);
      await reloadSnapshots();
    }
  };

  const title = (s: Snapshot) => (s.notes.length ? t("restore.entryTitle", { count: s.notes.length }) : t("restore.manual"));

  return (
    <div className="page">
      <PageHead title={t("nav.restore")} desc={t("pageDesc.restore")}>
        <div className="btn-row">
          <Button disabled={busy} onClick={() => void run(() => api.createSnapshot("Zanrei"))}>{busy ? t("restore.creating") : t("restore.create")}</Button>
          <Button appearance="subtle" onClick={() => void run(api.openSystemRestore)}>{t("restore.openSystem")}</Button>
          {snapshots.length > 0 && <Button appearance="subtle" icon={<Delete20Regular />} disabled={busy} onClick={() => setDel(snapshots)}>{t("restore.deleteAll")}</Button>}
        </div>
      </PageHead>
      {busy && <ProgressBar />}
      {error && (
        <MessageBar intent="error">
          <MessageBarBody><b>{t("restore.failed")}.</b> <span className="selectable">{error}</span></MessageBarBody>
        </MessageBar>
      )}
      {loaded === null && <SkeletonRows count={3} status={t("common.loading")} switches={false} />}
      {loaded !== null && !snapshots.length && <p className="muted">{t("restore.empty")}</p>}
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
                  <Button appearance="subtle" icon={<Delete20Regular />} aria-label={t("restore.deleteTitle")} title={t("common.delete")} disabled={busy} onClick={() => setDel([snap])} />
                </div>
              </div>
              <Collapse open={isOpen}>
                <ul className="note-list">{snap.notes.map((n) => <li key={n}>{noteText(n)}</li>)}</ul>
              </Collapse>
            </div>
          );
        })}
      </div>

      <Confirm
        open={del !== null}
        title={del && del.length > 1 ? t("restore.deleteAllTitle") : t("restore.deleteTitle")}
        confirmLabel={t("common.delete")}
        onClose={() => setDel(null)}
        onConfirm={() => del && void remove(del)}
      >
        <p>{del && del.length > 1 ? t("restore.deleteAllBody") : t("restore.deleteBody")}</p>
      </Confirm>

      <Confirm open={ask !== null} title={t("restore.confirmTitle")} confirmLabel={t("restore.rollback")} onClose={() => setAsk(null)} onConfirm={() => ask && void run(() => api.rollbackSnapshot(ask.id))}>
        <p>{t("restore.confirmBody")}</p>
        {ask && ask.notes.length > 0 && <ul className="note-list plain">{ask.notes.map((n) => <li key={n}>{noteText(n)}</li>)}</ul>}
      </Confirm>
    </div>
  );
}
