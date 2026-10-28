import { Badge, Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, MessageBar, MessageBarBody, ProgressBar } from "@fluentui/react-components";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api, errorText, type Snapshot } from "../lib/api";
import { useApp } from "../state";

export function Restore() {
  const { t, i18n } = useTranslation();
  const { reloadTweaks } = useApp();
  const [list, setList] = useState<Snapshot[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => api.listSnapshots().then(setList, (e) => setError(errorText(e))), []);
  useEffect(() => void reload(), [reload]);

  const run = async (job: () => Promise<unknown>, refreshTweaks = false) => {
    setBusy(true);
    setError(null);
    try {
      await job();
    } catch (e) {
      setError(errorText(e));
    } finally {
      setBusy(false);
      await reload();
      if (refreshTweaks) await reloadTweaks();
    }
  };

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>{t("restore.title")}</h1>
          <p>{t("restore.desc")}</p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Button appearance="primary" disabled={busy} onClick={() => run(() => api.createSnapshot("Zanrei – manual"))}>
            {busy ? t("restore.creating") : t("restore.create")}
          </Button>
          <Button onClick={() => run(api.openSystemRestore)}>{t("restore.openSystem")}</Button>
        </div>
      </div>
      {busy && <ProgressBar />}
      {error && (
        <MessageBar intent="error">
          <MessageBarBody><b>{t("restore.failed")}.</b> <span className="selectable">{error}</span></MessageBarBody>
        </MessageBar>
      )}
      {!list.length && <p style={{ color: "var(--muted)" }}>{t("restore.empty")}</p>}
      <AnimatePresence initial={false}>
        {list.map((snap) => (
          <motion.div key={snap.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }} className="card">
            <div className="row" style={{ padding: 0, border: 0 }}>
              <div className="info">
                <div className="name">{snap.label}</div>
                <div className="desc">
                  {new Date(snap.created_unix * 1000).toLocaleString(i18n.language)} · {t("restore.changes", { count: snap.entries.length })}
                </div>
              </div>
              <div className="ctl">
                {snap.rolled_back ? (
                  <Badge appearance="tint">{t("restore.rolledBack")}</Badge>
                ) : (
                  <Dialog>
                    <DialogTrigger disableButtonEnhancement>
                      <Button disabled={busy}>{t("restore.rollback")}</Button>
                    </DialogTrigger>
                    <DialogSurface>
                      <DialogBody>
                        <DialogTitle>{t("restore.confirmTitle")}</DialogTitle>
                        <DialogContent>{t("restore.confirmBody")}</DialogContent>
                        <DialogActions>
                          <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary">{t("common.cancel")}</Button>
                          </DialogTrigger>
                          <DialogTrigger disableButtonEnhancement>
                            <Button appearance="primary" onClick={() => run(() => api.rollbackSnapshot(snap.id), true)}>{t("common.confirm")}</Button>
                          </DialogTrigger>
                        </DialogActions>
                      </DialogBody>
                    </DialogSurface>
                  </Dialog>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
