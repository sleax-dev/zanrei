import { Button, Spinner } from "@fluentui/react-components";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { DiskCleanup } from "../components/DiskCleanup";
import { SkeletonRows } from "../components/Skeleton";
import { TweakRow } from "../components/TweakRow";
import type { Category, TweakInfo } from "../lib/api";
import { type Page, TWEAK_PAGES } from "../nav";
import { useApp } from "../state";
import { PageHead } from "../components/PageHead";
import { SearchBox } from "../components/SearchBox";

const pendingState = (x: TweakInfo) => x.state === "NotApplied" || x.state === "Partial";

/** One group of optimizations. What suits this PC comes first, so most people never scroll. */
export function CategoryPage({ page }: { page: Page }) {
  const { t } = useTranslation();
  const { tweaks, settings, setTweak, busy } = useApp();
  const cats: Category[] = TWEAK_PAGES[page] ?? [];
  const [query, setQuery] = useState("");
  const [bulk, setBulk] = useState(false);

  const { suggested, others } = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = (tweaks ?? [])
      .filter((x) => cats.includes(x.category))
      .filter((x) => !q || `${t(`tweaks.${x.id}.name`)} ${t(`tweaks.${x.id}.desc`)}`.toLowerCase().includes(q));
    const isSuggested = (x: TweakInfo) => x.recommended && x.risk !== "Advanced" && pendingState(x) && !settings.user_disabled.includes(x.id);
    return {
      suggested: list.filter(isSuggested),
      others: list.filter((x) => !isSuggested(x)).sort((a, b) => cats.indexOf(a.category) - cats.indexOf(b.category)),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- cats is derived from page
  }, [tweaks, page, query, settings.user_disabled, t]);

  const applyAll = async () => {
    setBulk(true);
    for (const x of suggested) await setTweak(x.id, true);
    setBulk(false);
  };

  const sections = cats.length > 1 ? cats.map((c) => [c, others.filter((x) => x.category === c)] as const).filter(([, l]) => l.length) : [[null, others] as const];
  const empty = tweaks !== null && !suggested.length && !others.length;

  return (
    <div className="page">
      <PageHead title={t(`nav.${page}`)} desc={t(`pageDesc.${page}`)}>
        <SearchBox value={query} onChange={setQuery} />
      </PageHead>

      {page === "cleanup" && !query && <DiskCleanup />}
      {tweaks === null && <SkeletonRows count={6} status={t("common.loading")} />}
      {empty && <p className="muted">{t("optimize.empty")}</p>}

      {suggested.length > 0 && (
        <section className="stack">
          <div className="sect-head">
            <h2>{t("optimize.forThisPc")}</h2>
            <Button appearance="primary" size="small" disabled={bulk || suggested.some((x) => busy.has(x.id))} onClick={() => void applyAll()}>
              {bulk ? <Spinner size="tiny" /> : t("optimize.applyAll", { count: suggested.length })}
            </Button>
          </div>
          <div className="rows">{suggested.map((x) => <TweakRow key={x.id} tweak={x} />)}</div>
        </section>
      )}

      {sections.map(([c, list]) => (
        <section key={c ?? "all"} className="stack">
          {(c || suggested.length > 0 || page === "cleanup") && (
            <div className="sect-head"><h2>{c ? t(`optimize.category.${c}`) : page === "cleanup" ? t("disk.software") : t("optimize.more")}</h2></div>
          )}
          <div className="rows">{list.map((x) => <TweakRow key={x.id} tweak={x} />)}</div>
        </section>
      ))}
    </div>
  );
}
