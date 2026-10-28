import { Button, Spinner } from "@fluentui/react-components";
import { Search20Regular } from "@fluentui/react-icons";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { TweakRow } from "../components/TweakRow";
import { CATEGORIES, type Category, type Risk, type TweakInfo } from "../lib/api";
import { useApp } from "../state";

const RISKS: (Risk | "all")[] = ["all", "Safe", "Moderate", "Advanced"];

export function Optimize({ category, onCategory }: { category: Category | "all"; onCategory: (c: Category | "all") => void }) {
  const { t } = useTranslation();
  const { tweaks } = useApp();
  const [risk, setRisk] = useState<Risk | "all">("all");
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (tweaks ?? []).filter(
      (x) =>
        (category === "all" || x.category === category) &&
        (risk === "all" || x.risk === risk) &&
        (!q || `${t(`tweaks.${x.id}.name`)} ${t(`tweaks.${x.id}.desc`)}`.toLowerCase().includes(q)),
    );
  }, [tweaks, category, risk, query, t]);

  const count = (c: Category | "all") => (tweaks ?? []).filter((x) => c === "all" || x.category === c).length;
  const groups = CATEGORIES.map((c) => [c, shown.filter((x) => x.category === c)] as [Category, TweakInfo[]]).filter(([, l]) => l.length);

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>{t("optimize.title")}</h1>
          <p>{t("optimize.desc")}</p>
        </div>
        <label className="search">
          <Search20Regular />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("common.search")} aria-label={t("common.search")} />
        </label>
      </div>

      <div className="tabs">
        {(["all", ...CATEGORIES] as const).map((c) => (
          <button key={c} className={`tab${category === c ? " active" : ""}`} onClick={() => onCategory(c)}>
            {c === "all" ? t("optimize.all") : t(`optimize.category.${c}`)}
            <span className="n">{count(c)}</span>
          </button>
        ))}
      </div>
      <div className="tabs">
        {RISKS.map((r) => (
          <button key={r} className={`tab${risk === r ? " active" : ""}`} onClick={() => setRisk(r)}>
            {r === "all" ? t("optimize.allRisks") : t(`optimize.risk.${r}`)}
          </button>
        ))}
      </div>

      {tweaks === null && <Spinner label={t("common.loading")} />}
      {tweaks !== null && !shown.length && <p style={{ color: "var(--muted)" }}>{t("optimize.empty")}</p>}
      {groups.map(([c, list]) => (
        <section key={c} className="stack">
          {category === "all" && <h2 style={{ margin: "6px 0 0", fontSize: 15 }}>{t(`optimize.category.${c}`)}</h2>}
          <div className="rows">{list.map((x) => <TweakRow key={x.id} tweak={x} />)}</div>
        </section>
      ))}
      {tweaks !== null && <Button appearance="subtle" onClick={() => { setQuery(""); setRisk("all"); onCategory("all"); }}>{t("optimize.reset")}</Button>}
    </div>
  );
}
