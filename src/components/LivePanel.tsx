import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api, gb, type LiveStats } from "../lib/api";
import { useApp } from "../state";
import { Skeleton } from "./Skeleton";

/** A few live numbers so the effect of a change can be seen, not just trusted. Polls only while the window is visible. */
export function LivePanel() {
  const { t } = useTranslation();
  const [stats, setStats] = useState<LiveStats | null>(null);
  const [startup, setStartup] = useState<number | null>(null);
  const { snapshots } = useApp();

  useEffect(() => {
    let alive = true;
    const tick = () => {
      if (document.visibilityState === "hidden") return;
      api.liveStats().then((s) => alive && setStats(s), () => {});
    };
    tick();
    const timer = setInterval(tick, 2000);
    return () => {
      alive = false;
      clearInterval(timer);
    };
  }, []);

  // Re-read after a change in the startup list (the journal changes whenever one is switched).
  useEffect(() => {
    api.listStartup().then((l) => setStartup(l.filter((i) => i.enabled).length), () => {});
  }, [snapshots]);

  const ramPct = stats ? Math.round((stats.ram_used / stats.ram_total) * 100) : 0;
  const cells: [string, string | null, number | null][] = [
    [t("live.cpu"), stats && `${Math.round(stats.cpu_percent)} %`, stats ? stats.cpu_percent : null],
    [t("live.ram"), stats && t("live.ramOf", { used: gb(stats.ram_used), total: gb(stats.ram_total) }), stats ? ramPct : null],
    [t("live.processes"), stats && String(stats.processes), null],
    [t("live.startup"), startup === null ? null : String(startup), null],
  ];
  return (
    <section className="panel">
      <div className="sect-head"><h2>{t("live.title")}</h2></div>
      <p className="muted small">{t("live.desc")}</p>
      <div className="live-grid" aria-live="off">
        {cells.map(([label, value, pct]) => (
          <div className="live-cell" key={label}>
            <span className="muted small">{label}</span>
            {value === null ? <Skeleton w={90} h={20} /> : <b>{value}</b>}
            {pct !== null && <span className="meter" aria-hidden><i style={{ width: `${Math.min(100, Math.max(0, pct))}%` }} /></span>}
          </div>
        ))}
      </div>
    </section>
  );
}
