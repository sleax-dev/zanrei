import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import type { Mode } from "../lib/api";

const MODES: { value: Mode; key: "manual" | "recommended" | "auto" }[] = [
  { value: "Manual", key: "manual" },
  { value: "Recommended", key: "recommended" },
  { value: "Auto", key: "auto" },
];

export function ModeCards({ value, onChange }: { value: Mode; onChange: (m: Mode) => void }) {
  const { t } = useTranslation();
  return (
    <div className="stack" role="radiogroup">
      {MODES.map((m) => (
        <motion.div key={m.value} whileTap={{ scale: 0.985 }} transition={{ type: "spring", stiffness: 500, damping: 30 }}>
          <div
            role="radio"
            aria-checked={value === m.value}
            tabIndex={0}
            className={`card interactive${value === m.value ? " selected" : ""}`}
            onClick={() => onChange(m.value)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onChange(m.value)}
          >
            <b>{t(`setup.mode.${m.key}.name`)}</b>
            <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 2 }}>{t(`setup.mode.${m.key}.desc`)}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
