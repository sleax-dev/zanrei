import { Button } from "@fluentui/react-components";
import { ArrowSync20Regular } from "@fluentui/react-icons";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api, errorText } from "../lib/api";
import { useApp } from "../state";
import { Confirm } from "./Confirm";

const COUNTDOWN = 30;

/** A strip docked under the page (never over it) that says what is waiting and why. */
export function RestartDock() {
  const { t } = useTranslation();
  const { pending, restartCauses, refreshPending, toast } = useApp();
  const [confirm, setConfirm] = useState<"Reboot" | "SignOut" | null>(null);
  const [left, setLeft] = useState<number | null>(null);

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

  const names = restartCauses.map((id) => t(`tweaks.${id}.name`));
  const because = names.length ? t("restart.because", { names: names.slice(0, 2).join(", ") + (names.length > 2 ? ` +${names.length - 2}` : "") }) : "";
  const visible = left !== null || pending !== "None";

  return (
    <>
      <AnimatePresence initial={false}>
        {visible && (
          <motion.div
            className="dock"
            role="status"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <div className="dock-inner">
              <ArrowSync20Regular />
              {left !== null ? (
                <>
                  <span className="grow">{t("restart.countdown", { seconds: left })}</span>
                  <Button size="small" onClick={() => void run(async () => { await api.cancelRestart(); setLeft(null); })}>{t("common.cancel")}</Button>
                </>
              ) : (
                <>
                  <span className="grow">
                    {t(`restart.${pending}`)} <span className="muted selectable">{because}</span>
                  </span>
                  {pending === "Explorer" && (
                    <Button appearance="primary" size="small" onClick={() => void run(async () => { await api.restartExplorer(); await refreshPending(); })}>
                      {t("restart.explorerButton")}
                    </Button>
                  )}
                  {pending === "SignOut" && <Button appearance="primary" size="small" onClick={() => setConfirm("SignOut")}>{t("restart.signOutButton")}</Button>}
                  {pending === "Reboot" && <Button appearance="primary" size="small" onClick={() => setConfirm("Reboot")}>{t("restart.rebootButton")}</Button>}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Confirm
        open={confirm !== null}
        title={confirm === "SignOut" ? t("restart.signOutTitle") : t("restart.confirmTitle")}
        confirmLabel={confirm === "SignOut" ? t("restart.signOutButton") : t("restart.rebootButton")}
        onClose={() => setConfirm(null)}
        onConfirm={() =>
          void run(async () => {
            if (confirm === "SignOut") {
              await api.signOut();
            } else {
              await api.restartNow(COUNTDOWN);
              setLeft(COUNTDOWN);
            }
          })
        }
      >
        {confirm === "SignOut" ? t("restart.signOutBody") : t("restart.confirmBody", { seconds: COUNTDOWN })}
      </Confirm>
    </>
  );
}
