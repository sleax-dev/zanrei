import { Button, Spinner } from "@fluentui/react-components";
import { CheckmarkCircle20Regular, Warning16Regular } from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";
import { PcSummary } from "../components/PcSummary";
import { useApp } from "../state";

export function Overview() {
  const { t } = useTranslation();
  const { system, tweaks, settings, applyRecommended, applying } = useApp();

  const todo = (tweaks ?? []).filter(
    (x) => x.recommended && x.risk !== "Advanced" && (x.state === "NotApplied" || x.state === "Partial") && !settings.user_disabled.includes(x.id),
  );
  const loading = tweaks === null || system === null;

  return (
    <div className="page">
      <section className="lead">
        <h1>{loading ? t("overview.loading") : t(`overview.tier.${system.tier}`)}</h1>
        {!loading && (
          <p>
            {todo.length ? (
              t("overview.summaryTodo", { count: todo.length })
            ) : (
              <span className="ok-line"><CheckmarkCircle20Regular />{t("overview.summaryDone")}</span>
            )}
          </p>
        )}
      </section>

      {todo.length > 0 && (
        <section className="panel">
          <div className="sect-head">
            <h2>{t("optimize.forThisPc")}</h2>
            <Button appearance="primary" disabled={applying} icon={applying ? <Spinner size="tiny" /> : undefined} onClick={() => void applyRecommended(true)}>
              {t("overview.apply", { count: todo.length })}
            </Button>
          </div>
          <p className="muted small">{t("overview.safetyNote")}</p>
          <ul className="rec-list">
            {todo.map((x) => (
              <li key={x.id}>
                <span className="name">{t(`tweaks.${x.id}.name`)}</span>
                {x.risk === "Moderate" && <span className="flag warn"><Warning16Regular />{t("optimize.risk.Moderate")}</span>}
                <span className="desc">{t(`tweaks.${x.id}.desc`)}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {system && (
        <section className="panel">
          <div className="sect-head"><h2>{t("overview.title")}</h2></div>
          <PcSummary info={system} />
        </section>
      )}
    </div>
  );
}
