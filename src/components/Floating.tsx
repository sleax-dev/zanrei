import { Button } from "@fluentui/react-components";
import { Dismiss16Regular } from "@fluentui/react-icons";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api, errorText, type Restart } from "../lib/api";
import { useApp } from "../state";
import { Confirm } from "./Confirm";

const COUNTDOWN = 30;
const pop = { initial: { opacity: 0, y: 16, scale: 0.97 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: 8, scale: 0.97 } };

/** Toasts and the "a restart is needed" bar, floating over every page. */
export function Floating() {
  const { toasts, dismissToast } = useApp();
  return (
    <div className="floating">
      <AnimatePresence>
        {toasts.map((x) => (
          <motion.div key={x.id} className={`toast ${x.kind}`} {...pop} transition={{ type: "spring", stiffness: 420, damping: 32 }}>
            <span className="selectable">{x.text}</span>
            <Button appearance="transparent" size="small" icon={<Dismiss16Regular />} onClick={() => dismissToast(x.id)} />
          </motion.div>
        ))}
      </AnimatePresence>
      <RestartBar />
    </div>
  );
}

function RestartBar() {
  const { t } = useTranslation();
  const { pending, refreshPending, toast } = useApp();
  const [dismissed, setDismissed] = useState<Restart | null>(null);
  const [confirm, setConfirm] = useState(false);
  const [left, setLeft] = useState<number | null>(null); // seconds until Windows restarts, once started

  useEffect(() => {
    if (left === null) return;
    if (left <= 0) return setLeft(null);
    const timer = setTimeout(() => setLeft(left - 1), 1000);
    return () => clearTimeout(timer);
  }, [left]);

  const run = async (job: () => Promise<unknown>) => {
    try {
      await job();
    } catch (e) {
      toast(errorText(e), "error");
    }
  };

  const visible = left !== null || (pending !== "None" && dismissed !== pending);
  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div className="restartbar" {...pop} transition={{ type: "spring", stiffness: 420, damping: 32 }}>
            {left !== null ? (
              <>
                <span>{t("restart.countdown", { seconds: left })}</span>
                <Button
                  size="small"
                  onClick={() =>
                    void run(async () => {
                      await api.cancelRestart();
                      setLeft(null);
                    })
                  }
                >
                  {t("common.cancel")}
                </Button>
              </>
            ) : (
              <>
                <span>{t(`restart.${pending}`)}</span>
                {pending === "Explorer" && (
                  <Button appearance="primary" size="small" onClick={() => void run(async () => { await api.restartExplorer(); await refreshPending(); })}>
                    {t("restart.explorerButton")}
                  </Button>
                )}
                {pending === "Reboot" && (
                  <Button appearance="primary" size="small" onClick={() => setConfirm(true)}>
                    {t("restart.rebootButton")}
                  </Button>
                )}
                <Button appearance="transparent" size="small" icon={<Dismiss16Regular />} onClick={() => setDismissed(pending)} aria-label={t("common.close")} />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <Confirm
        open={confirm}
        title={t("restart.confirmTitle")}
        confirmLabel={t("restart.rebootButton")}
        onClose={() => setConfirm(false)}
        onConfirm={() =>
          void run(async () => {
            await api.restartNow(COUNTDOWN);
            setLeft(COUNTDOWN);
          })
        }
      >
        {t("restart.confirmBody", { seconds: COUNTDOWN })}
      </Confirm>
    </>
  );
}
