import { Spinner, Switch } from "@fluentui/react-components";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { TweakInfo } from "../lib/api";
import { useApp } from "../state";
import { Confirm } from "./Confirm";

export const RISK_PILL = { Safe: "ok", Moderate: "warn", Advanced: "bad" } as const;

export function TweakRow({ tweak }: { tweak: TweakInfo }) {
  const { t } = useTranslation();
  const { busy, setTweak } = useApp();
  const [ask, setAsk] = useState(false);
  const working = busy.has(tweak.id);
  const on = tweak.state === "Applied";
  const unavailable = tweak.state === "Unavailable";
  const locked = working || unavailable || (on && !tweak.reversible);

  const toggle = (enable: boolean) => {
    if (enable && tweak.risk !== "Safe") setAsk(true);
    else void setTweak(tweak.id, enable);
  };

  return (
    <div className="row">
      <div className="info">
        <div className="name">{t(`tweaks.${tweak.id}.name`)}</div>
        <div className="desc">{t(`tweaks.${tweak.id}.desc`)}</div>
        <div className="meta">
          <span className={`pill ${RISK_PILL[tweak.risk]}`}>{t(`optimize.risk.${tweak.risk}`)}</span>
          {tweak.recommended && <span className="pill accent">{t("optimize.recommended")}</span>}
          {tweak.restart !== "None" && <span className="pill">{t(`optimize.needs.${tweak.restart}`)}</span>}
          {!tweak.reversible && <span className="pill bad">{t("optimize.irreversible")}</span>}
          {tweak.state === "Partial" && <span className="pill warn">{t("optimize.partial")}</span>}
          {unavailable && <span className="pill">{t("optimize.unavailable")}</span>}
        </div>
      </div>
      <div className="ctl">
        {working && <Spinner size="tiny" />}
        <Switch checked={on} disabled={locked} aria-label={t(`tweaks.${tweak.id}.name`)} onChange={(_, d) => toggle(d.checked)} />
      </div>
      <Confirm open={ask} title={t(`tweaks.${tweak.id}.name`)} confirmLabel={t("optimize.apply")} onClose={() => setAsk(false)} onConfirm={() => void setTweak(tweak.id, true)}>
        <p>{t(`tweaks.${tweak.id}.desc`)}</p>
        <p>{t(`optimize.confirm.${tweak.risk}`)}</p>
        {!tweak.reversible && <p><b>{t("optimize.confirm.irreversible")}</b></p>}
      </Confirm>
    </div>
  );
}
