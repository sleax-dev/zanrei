import { Badge, makeStyles, Text, tokens } from "@fluentui/react-components";
import { DeveloperBoard24Regular, Desktop24Regular, HardDrive24Regular, Window24Regular } from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";
import { gb, type SystemInfo } from "../lib/api";

const useStyles = makeStyles({
  list: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalM },
  row: { display: "flex", alignItems: "center", gap: tokens.spacingHorizontalM },
  icon: { color: tokens.colorNeutralForeground3, flexShrink: 0 },
  text: { display: "flex", flexDirection: "column", minWidth: 0 },
});

export function Hardware({ info }: { info: SystemInfo }) {
  const s = useStyles();
  const { t } = useTranslation();
  const rows = [
    { icon: <Window24Regular />, label: t("overview.os"), value: `${info.os_name} ${info.os_version} (${info.os_build})` },
    {
      icon: <DeveloperBoard24Regular />,
      label: t("overview.cpu"),
      value: `${info.cpu_name} · ${t("overview.cores", { physical: info.physical_cores, logical: info.logical_cores })}`,
    },
    { icon: <DeveloperBoard24Regular />, label: t("overview.ram"), value: gb(info.ram_bytes) },
    {
      icon: <Desktop24Regular />,
      label: t("overview.gpu"),
      value: info.gpus.length ? info.gpus.map((g) => g.name).join(", ") : t("overview.noGpu"),
    },
    {
      icon: <HardDrive24Regular />,
      label: t("overview.storage"),
      value: info.disks.map((d) => `${d.mount} ${d.kind} ${gb(d.free_bytes)} / ${gb(d.total_bytes)}`).join(" · "),
    },
  ];
  return (
    <div className={s.list}>
      {rows.map((r) => (
        <div key={r.label} className={s.row}>
          <span className={s.icon}>{r.icon}</span>
          <div className={s.text}>
            <Text size={200} className="selectable">{r.label}</Text>
            <Text weight="semibold" className="selectable">{r.value}</Text>
          </div>
        </div>
      ))}
      <div className={s.row}>
        <Text size={200}>{t("overview.tierLabel")}</Text>
        <Badge appearance="tint" color={info.tier === "High" ? "success" : info.tier === "Legacy" ? "warning" : "informative"}>
          {t(`overview.tier.${info.tier}`)}
        </Badge>
      </div>
    </div>
  );
}
