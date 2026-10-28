import { Button } from "@fluentui/react-components";
import { Dismiss16Regular } from "@fluentui/react-icons";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { useApp } from "../state";

/** Toasts. A polite live region, so a screen reader announces them. Errors stay until dismissed and link to the log. */
export function Floating() {
  const { t } = useTranslation();
  const { toasts, dismissToast, setPage } = useApp();
  return (
    <div className="floating" role="status" aria-live="polite">
      <AnimatePresence>
        {toasts.map((x) => (
          <motion.div
            key={x.id}
            className={`toast ${x.kind}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <span className="selectable">{x.text}</span>
            {x.kind === "error" && (
              <Button
                size="small"
                onClick={() => {
                  setPage("logs");
                  dismissToast(x.id);
                }}
              >
                {t("toast.viewLog")}
              </Button>
            )}
            <Button appearance="transparent" size="small" icon={<Dismiss16Regular />} aria-label={t("common.close")} onClick={() => dismissToast(x.id)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
