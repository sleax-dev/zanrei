import { Switch } from "@fluentui/react-components";
import { Warning16Regular } from "@fluentui/react-icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { SkeletonRows } from "../components/Skeleton";
import { api, errorText, type StartupItem } from "../lib/api";
import { useApp } from "../state";
import { PageHead } from "../components/PageHead";
import { SearchBox } from "../components/SearchBox";

/** Programs that start with Windows. Switching one off only stops it launching; nothing is uninstalled. */
export function Startup() {
  const { t } = useTranslation();
  const { toast, reloadSnapshots } = useApp();
  const [items, setItems] = useState<StartupItem[] | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    try {
      setItems(await api.listStartup());
    } catch (e) {
      toast(errorText(e), "error");
      setItems([]);
    }
  }, [toast]);
  useEffect(() => void load(), [load]);

  const toggle = async (item: StartupItem, enabled: boolean) => {
    setBusy(item.id);
    try {
      setItems(await api.setStartup(item.id, enabled));
      await reloadSnapshots();
    } catch (e) {
      toast(`${item.name}: ${errorText(e)}`, "error");
      await load();
    } finally {
      setBusy(null);
    }
  };

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (items ?? []).filter((i) => !q || `${i.name} ${i.command}`.toLowerCase().includes(q));
  }, [items, query]);
  const on = (items ?? []).filter((i) => i.enabled).length;

  return (
    <div className="page">
      <PageHead title={t("nav.startup")} desc={t("pageDesc.startup")}>
        <SearchBox value={query} onChange={setQuery} />
      </PageHead>

      {items === null ? (
        <SkeletonRows count={6} status={t("common.loading")} />
      ) : (
        <>
          <p className="muted small" style={{ margin: 0 }}>{items.length ? t("startup.count", { on, total: items.length }) : t("startup.empty")}</p>
          <div className="rows">
            {shown.map((i) => (
              <div className="row" key={i.id}>
                <div className="info">
                  <div className="name">{i.name}</div>
                  <div className="desc selectable path-line">{i.command}</div>
                  <div className="flags">
                    <span className="flag">{t(`startup.scope.${i.scope}`)}</span>
                    {i.system && <span className="flag warn"><Warning16Regular />{t("startup.system")}</span>}
                  </div>
                </div>
                <div className="ctl">
                  <Switch checked={i.enabled} disabled={busy !== null} aria-label={i.name} onChange={(_, d) => void toggle(i, d.checked)} />
                </div>
              </div>
            ))}
          </div>
          {items.length > 0 && <p className="muted small" style={{ margin: 0 }}>{t("startup.note")}</p>}
        </>
      )}
    </div>
  );
}
