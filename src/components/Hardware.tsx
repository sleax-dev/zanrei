import { Desktop24Regular, DeveloperBoard24Regular, HardDrive24Regular, Window24Regular } from "@fluentui/react-icons";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { gb, type SystemInfo } from "../lib/api";

function Tile({ icon, label, value, sub }: { icon: ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="card tile">
      <span className="ico">{icon}</span>
      <div>
        <div className="label">{label}</div>
        <div className="value selectable">{value}</div>
        {sub && <div className="sub selectable">{sub}</div>}
      </div>
    </div>
  );
}

export function HardwareTiles({ info }: { info: SystemInfo }) {
  const { t } = useTranslation();
  return (
    <div className="cols">
      <Tile icon={<Window24Regular />} label={t("overview.os")} value={`${info.os_name} ${info.os_version}`} sub={`Build ${info.os_build}`} />
      <Tile
        icon={<DeveloperBoard24Regular />}
        label={t("overview.cpu")}
        value={info.cpu_name}
        sub={t("overview.cores", { physical: info.physical_cores, logical: info.logical_cores })}
      />
      <Tile icon={<DeveloperBoard24Regular />} label={t("overview.ram")} value={gb(info.ram_bytes)} />
      <Tile
        icon={<Desktop24Regular />}
        label={t("overview.gpu")}
        value={info.gpus.length ? info.gpus.map((g) => g.name).join(", ") : t("overview.noGpu")}
      />
      <Tile
        icon={<HardDrive24Regular />}
        label={t("overview.storage")}
        value={info.disks.map((d) => `${d.mount} ${d.kind}`).join(" · ")}
        sub={info.disks.map((d) => `${gb(d.free_bytes)} / ${gb(d.total_bytes)}`).join(" · ")}
      />
    </div>
  );
}
