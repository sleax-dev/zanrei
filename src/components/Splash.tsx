import { motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import mark from "../assets/z-mark.png";

const LENGTH = 3.1; // seconds the intro runs before the first step appears

/** First-run opening: the mark is drawn in, catches a light sweep, then the name settles under it. Any key or click skips. */
export function Splash({ onDone }: { onDone: () => void }) {
  const { t } = useTranslation();
  const calm = useReducedMotion();
  const total = calm ? 0.9 : LENGTH;

  useEffect(() => {
    const timer = setTimeout(onDone, total * 1000);
    const skip = () => onDone();
    window.addEventListener("keydown", skip);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", skip);
    };
  }, [onDone, total]);

  const ease = [0.2, 0.8, 0.2, 1] as const;
  return (
    <motion.div className="splash" onClick={onDone} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <motion.div className="splash-glow" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: calm ? 0.3 : 1.6, ease }} />
      <div className="splash-stage">
        {/* the shadow lives on the wrapper: a clip-path on the element itself would cut it off */}
        <div className="splash-shadow">
        <motion.div
          className="splash-mark"
          initial={calm ? { opacity: 0 } : { opacity: 0, scale: 0.94, clipPath: "inset(0 100% 0 0)" }}
          animate={calm ? { opacity: 1 } : { opacity: 1, scale: 1, clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: calm ? 0.4 : 1.1, delay: 0.25, ease }}
        >
          <img src={mark} alt="" draggable={false} />
          {!calm && <span className="sheen" style={{ maskImage: `url(${mark})`, WebkitMaskImage: `url(${mark})` }} />}
        </motion.div>
        </div>
        <motion.h1
          className="splash-name"
          initial={{ opacity: 0, letterSpacing: calm ? "0.4em" : "0.9em" }}
          animate={{ opacity: 1, letterSpacing: "0.4em" }}
          transition={{ duration: calm ? 0.3 : 1.2, delay: calm ? 0.3 : 1.2, ease }}
        >
          ZANREI
        </motion.h1>
        <motion.p className="splash-tag" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: calm ? 0.4 : 1.9, ease }}>
          {t("splash.tagline")}
        </motion.p>
      </div>
      <div className="splash-bar" aria-hidden>
        <motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: total - 0.2, ease: "linear" }} />
      </div>
      <span className="sr" role="status">{t("splash.loading")}</span>
    </motion.div>
  );
}
