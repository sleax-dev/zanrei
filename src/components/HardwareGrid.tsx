import { DeveloperBoard24Regular, Desktop24Regular, HardDrive24Regular, Memory16Regular } from "@fluentui/react-icons";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { gb, type SystemInfo } from "../lib/api";

function Card({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="hw-card">
      <div className="hw-head">{icon}<span>{label}</span></div>
      <div className="hw-body selectable">{children}</div>
    </div>
  );
}

/** What is inside the PC, one card per part. Disks show how full they are, because a nearly full system drive is a real cause of slowness. */
export function HardwareGrid({ info }: { info: SystemInfo }) {
  const { t } = useTranslation();
  return (
    <div className="hw-grid">
      <Card icon={<DeveloperBoard24Regular />} label={t("overview.cpu")}>
        <b>{info.cpu_name}</b>
        <span className="muted small">{t("overview.cores", { physical: info.physical_cores, logical: info.logical_cores })}</span>
      </Card>
      <Card icon={<Memory16Regular style={{ width: 24, height: 24 }} />} label={t("overview.ram")}>
        <b>{gb(info.ram_bytes)}</b>
      </Card>
      <Card icon={<Desktop24Regular />} label={t("overview.gpu")}>
        {info.gpus.length ? info.gpus.map((g) => <b key={g.name}>{g.name}</b>) : <span className="muted">{t("overview.noGpu")}</span>}
      </Card>
      <Card icon={<HardDrive24Regular />} label={t("overview.storage")}>
        {info.disks.map((d) => {
          const used = d.total_bytes ? Math.round(((d.total_bytes - d.free_bytes) / d.total_bytes) * 100) : 0;
          return (
            <div className="disk" key={d.mount}>
              <div className="disk-line">
                <b>{d.mount} <span className="chip">{d.kind}</span></b>
                <span className="muted small">{t("overview.freeOf", { free: gb(d.free_bytes), total: gb(d.total_bytes) })}</span>
              </div>
              <span className={`meter${used >= 90 ? " full" : ""}`} aria-hidden><i style={{ width: `${used}%` }} /></span>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
