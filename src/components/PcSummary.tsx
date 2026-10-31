import { useTranslation } from "react-i18next";
import { type SystemInfo } from "../lib/api";
import { gb } from "../lib/format";

/** One plain definition list. A spec sheet reads like one; it does not need a tile per fact. */
export function PcSummary({ info }: { info: SystemInfo }) {
  const { t } = useTranslation();
  const rows: [string, string[]][] = [
    [t("overview.os"), [`${info.os_name} ${info.os_version} · Build ${info.os_build}`]],
    [t("overview.cpu"), [`${info.cpu_name}`, t("overview.cores", { physical: info.physical_cores, logical: info.logical_cores })]],
    [t("overview.ram"), [gb(info.ram_bytes)]],
    [t("overview.gpu"), info.gpus.length ? info.gpus.map((g) => g.name) : [t("overview.noGpu")]],
    [
      t("overview.storage"),
      info.disks.map((d) => `${d.mount} ${d.kind} · ${t("overview.freeOf", { free: gb(d.free_bytes), total: gb(d.total_bytes) })}`),
    ],
  ];
  return (
    <dl className="dl">
      {rows.map(([label, values]) => (
        <div key={label} className="dl-row">
          <dt>{label}</dt>
          <dd className="selectable">{values.map((v) => <div key={v}>{v}</div>)}</dd>
        </div>
      ))}
    </dl>
  );
}
