import { Card, makeStyles, mergeClasses, Text, tokens } from "@fluentui/react-components";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import type { Mode } from "../lib/api";

const MODES: { value: Mode; key: "manual" | "recommended" | "auto" }[] = [
  { value: "Manual", key: "manual" },
  { value: "Recommended", key: "recommended" },
  { value: "Auto", key: "auto" },
];

const useStyles = makeStyles({
  list: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalS },
  card: { cursor: "pointer", border: `${tokens.strokeWidthThick} solid transparent` },
  selected: { border: `${tokens.strokeWidthThick} solid ${tokens.colorCompoundBrandStroke}` },
});

export function ModeCards({ value, onChange }: { value: Mode; onChange: (m: Mode) => void }) {
  const s = useStyles();
  const { t } = useTranslation();
  return (
    <div className={s.list} role="radiogroup">
      {MODES.map((m) => (
        <motion.div key={m.value} whileTap={{ scale: 0.985 }} transition={{ type: "spring", stiffness: 500, damping: 30 }}>
          <Card
            role="radio"
            aria-checked={value === m.value}
            tabIndex={0}
            className={mergeClasses(s.card, value === m.value && s.selected)}
            onClick={() => onChange(m.value)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onChange(m.value)}
          >
            <Text weight="semibold">{t(`setup.mode.${m.key}.name`)}</Text>
            <Text size={200}>{t(`setup.mode.${m.key}.desc`)}</Text>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
