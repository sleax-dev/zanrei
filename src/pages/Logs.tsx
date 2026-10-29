import { Button } from "@fluentui/react-components";
import { Copy20Regular, Delete20Regular, ErrorCircle16Filled, FolderOpen20Regular, Info16Regular, Warning16Filled } from "@fluentui/react-icons";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { api, errorText, type LogLevel } from "../lib/api";
import { fmtClock, fmtDay } from "../lib/format";
import { useApp } from "../state";
import { PageHead } from "../components/PageHead";
import { SearchBox } from "../components/SearchBox";

type Filter = "all" | "Warn" | "Error";

const ICON = {
  Info: <Info16Regular />,
  Warn: <Warning16Filled />,
  Error: <ErrorCircle16Filled />,
} as const;

export function Logs() {
  const { t, i18n } = useTranslation();
  const { logs, clearLogs, toast } = useApp();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const rank: Record<LogLevel, number> = { Info: 0, Warn: 1, Error: 2 };
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const min = filter === "all" ? 0 : filter === "Warn" ? 1 : 2;
    return logs
      .filter((l) => rank[l.level] >= min && (!q || `${l.source} ${l.message}`.toLowerCase().includes(q)))
      .slice()
      .reverse(); // newest first
    // eslint-disable-next-line react-hooks/exhaustive-deps -- rank is a constant
  }, [logs, filter, query]);

  const count = (f: Filter) => (f === "all" ? logs.length : logs.filter((l) => rank[l.level] >= (f === "Warn" ? 1 : 2)).length);

  const copy = async () => {
    const text = shown.map((l) => `${new Date(l.ts).toISOString()} ${l.level.toUpperCase()} [${l.source}] ${l.message}`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      toast(t("logs.copied"), "success");
    } catch (e) {
      toast(errorText(e), "error");
    }
  };

  return (
    <div className="page">
      <PageHead title={t("nav.logs")} desc={t("pageDesc.logs")}>
        <div className="btn-row">
          <Button icon={<Copy20Regular />} disabled={!shown.length} onClick={() => void copy()}>{t("logs.copy")}</Button>
          <Button icon={<FolderOpen20Regular />} onClick={() => void api.openLogFolder().catch((e) => toast(errorText(e), "error"))}>{t("logs.openFolder")}</Button>
          <Button appearance="subtle" icon={<Delete20Regular />} disabled={!logs.length} onClick={() => void clearLogs()}>{t("logs.clear")}</Button>
        </div>
      </PageHead>

      <div className="logbar">
        <div className="seg" role="radiogroup" aria-label={t("logs.filter")}>
          {(["all", "Warn", "Error"] as const).map((f) => (
            <button key={f} role="radio" aria-checked={filter === f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>
              {t(`logs.level.${f}`)} <span className="n">{count(f)}</span>
            </button>
          ))}
        </div>
        <SearchBox value={query} onChange={setQuery} />
      </div>

      {!shown.length && <p className="muted">{logs.length ? t("optimize.empty") : t("logs.empty")}</p>}
      <ol className="loglist" aria-label={t("nav.logs")}>
        {shown.map((l, i) => (
          <li key={`${l.ts}-${i}`} className={`log ${l.level}`}>
            <span className="lv">{ICON[l.level]}<span className="sr">{t(`logs.level.${l.level}`)}</span></span>
            <time className="when" dateTime={new Date(l.ts).toISOString()} title={fmtDay(l.ts, i18n.language)}>{fmtClock(l.ts, i18n.language)}</time>
            <span className="src">{l.source}</span>
            <span className="msg selectable">{l.message}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
