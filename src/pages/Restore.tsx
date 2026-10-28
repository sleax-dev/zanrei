import {
  Badge, Button, Card, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger,
  makeStyles, MessageBar, MessageBarBody, ProgressBar, Text, Title2, tokens,
} from "@fluentui/react-components";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api, type Snapshot } from "../lib/api";

const useStyles = makeStyles({
  root: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalM },
  bar: { display: "flex", gap: tokens.spacingHorizontalS, flexWrap: "wrap" },
  row: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: tokens.spacingHorizontalM },
  meta: { display: "flex", flexDirection: "column" },
});

export function Restore() {
  const s = useStyles();
  const { t, i18n } = useTranslation();
  const [list, setList] = useState<Snapshot[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reload = useCallback(() => api.listSnapshots().then(setList, (e) => setError(String(e))), []);
  useEffect(() => void reload(), [reload]);

  const run = async (job: () => Promise<unknown>) => {
    setBusy(true);
    setError(null);
    try {
      await job();
    } catch (e) {
      setError(String(e));
    } finally {
      setBusy(false);
      reload();
    }
  };

  return (
    <div className={s.root}>
      <Title2>{t("restore.title")}</Title2>
      <Text>{t("restore.desc")}</Text>
      <div className={s.bar}>
        <Button appearance="primary" disabled={busy} onClick={() => run(() => api.createSnapshot("Zanrei – manual"))}>
          {busy ? t("restore.creating") : t("restore.create")}
        </Button>
        <Button onClick={() => run(api.openSystemRestore)}>{t("restore.openSystem")}</Button>
      </div>
      {busy && <ProgressBar />}
      {error && (
        <MessageBar intent="error">
          <MessageBarBody><b>{t("restore.failed")}.</b> <span className="selectable">{error}</span></MessageBarBody>
        </MessageBar>
      )}
      {!list.length && <Text>{t("restore.empty")}</Text>}
      <AnimatePresence initial={false}>
        {list.map((snap) => (
          <motion.div key={snap.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
            <Card>
              <div className={s.row}>
                <div className={s.meta}>
                  <Text weight="semibold">{snap.label}</Text>
                  <Text size={200}>
                    {new Date(snap.created_unix * 1000).toLocaleString(i18n.language)} · {t("restore.changes", { count: snap.entries.length })}
                  </Text>
                </div>
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
                            <Button appearance="primary" onClick={() => run(() => api.rollbackSnapshot(snap.id))}>
                              {t("common.confirm")}
                            </Button>
                          </DialogTrigger>
                        </DialogActions>
                      </DialogBody>
                    </DialogSurface>
                  </Dialog>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
