import { useTranslation } from "react-i18next";
import { gb, type SystemInfo } from "../lib/api";

/** What is inside the PC as one list. Disks show how full they are, because a nearly full system drive is a real cause of slowness. */
export function HardwareList({ info }: { info: SystemInfo }) {
  const { t } = useTranslation();
  return (
    <dl className="dl panel selectable">
      <div className="dl-row">
        <dt>{t("overview.cpu")}</dt>
        <dd>{info.cpu_name}<span className="muted small"> · {t("overview.cores", { physical: info.physical_cores, logical: info.logical_cores })}</span></dd>
      </div>
      <div className="dl-row">
        <dt>{t("overview.ram")}</dt>
        <dd>{gb(info.ram_bytes)}</dd>
      </div>
      <div className="dl-row">
        <dt>{t("overview.gpu")}</dt>
        <dd>{info.gpus.length ? info.gpus.map((g) => g.name).join(", ") : <span className="muted">{t("overview.noGpu")}</span>}</dd>
      </div>
      <div className="dl-row">
        <dt>{t("overview.storage")}</dt>
        <dd className="disks">
          {info.disks.map((d) => {
            const used = d.total_bytes ? (d.total_bytes - d.free_bytes) / d.total_bytes : 0;
            return (
              <div className="disk" key={d.mount}>
                <span className="disk-name">{d.mount} <span className="chip">{d.kind}</span></span>
                <span className={`meter${used >= 0.9 ? " full" : ""}`} aria-hidden><i style={{ transform: `scaleX(${used})` }} /></span>
                <span className="muted small disk-free">{t("overview.freeOf", { free: gb(d.free_bytes), total: gb(d.total_bytes) })}</span>
              </div>
            );
          })}
        </dd>
      </div>
    </dl>
  );
}
