import { Spinner, Switch } from "@fluentui/react-components";
import { ArrowSync16Regular, ErrorCircle16Regular, Warning16Regular } from "@fluentui/react-icons";
import { type ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import type { TweakInfo } from "../lib/api";
import { useApp } from "../state";
import { BloatPicker } from "./BloatPicker";
import { Confirm } from "./Confirm";

type Flag = { tone: "" | "warn" | "bad"; icon: ReactNode; text: string };

/** Only what a person must weigh is shown: risk above Safe, a restart, an irreversible change. Safe is the default and says nothing. */
function flagsFor(x: TweakInfo, t: (k: string) => string): Flag[] {
  const flags: Flag[] = [];
  if (x.risk !== "Safe") flags.push({ tone: x.risk === "Advanced" ? "bad" : "warn", icon: <Warning16Regular />, text: t(`optimize.risk.${x.risk}`) });
  if (!x.reversible) flags.push({ tone: "bad", icon: <ErrorCircle16Regular />, text: t("optimize.irreversible") });
  if (x.restart !== "None") flags.push({ tone: "", icon: <ArrowSync16Regular />, text: t(`optimize.needs.${x.restart}`) });
  if (x.state === "Partial") flags.push({ tone: "warn", icon: <Warning16Regular />, text: t("optimize.partial") });
  if (x.state === "Unavailable") flags.push({ tone: "", icon: null, text: t("optimize.unavailable") });
  return flags;
}

export function TweakRow({ tweak }: { tweak: TweakInfo }) {
  const { t } = useTranslation();
  const { busy, setTweak } = useApp();
  const [ask, setAsk] = useState(false);
  const [pick, setPick] = useState(false);
  const working = busy.has(tweak.id);
  const on = tweak.state === "Applied";
  const unavailable = tweak.state === "Unavailable";
  const locked = working || unavailable || (on && !tweak.reversible);
  const flags = flagsFor(tweak, t);

  const toggle = (enable: boolean) => {
    if (enable && tweak.id === "bloat_apps") setPick(true);
    else if (enable && (tweak.risk !== "Safe" || !tweak.reversible)) setAsk(true);
    else void setTweak(tweak.id, enable);
  };

  return (
    <div className="row">
      <div className="info">
        <div className="name">{t(`tweaks.${tweak.id}.name`)}</div>
        <div className="desc">{t(`tweaks.${tweak.id}.desc`)}</div>
        {flags.length > 0 && (
          <div className="flags">
            {flags.map((f) => (
              <span key={f.text} className={`flag ${f.tone}`}>{f.icon}{f.text}</span>
            ))}
          </div>
        )}
      </div>
      <div className="ctl">
        {working && <Spinner size="tiny" />}
        <Switch checked={on} disabled={locked} aria-label={t(`tweaks.${tweak.id}.name`)} onChange={(_, d) => toggle(d.checked)} />
      </div>
      <Confirm
        open={ask}
        title={t(`tweaks.${tweak.id}.name`)}
        confirmLabel={t("optimize.apply")}
        acknowledge={tweak.reversible ? undefined : t("optimize.acknowledge")}
        onClose={() => setAsk(false)}
        onConfirm={() => void setTweak(tweak.id, true, !tweak.reversible)}
      >
        <p>{t(`tweaks.${tweak.id}.desc`)}</p>
        {tweak.reversible ? <p>{t(`optimize.confirm.${tweak.risk}`)}</p> : <p><b>{t("optimize.confirm.irreversible")}</b></p>}
      </Confirm>
      {tweak.id === "bloat_apps" && <BloatPicker open={pick} onClose={() => setPick(false)} />}
    </div>
  );
}
