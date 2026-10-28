import { Card, makeStyles, ProgressBar, Title2, tokens } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Hardware } from "../components/Hardware";
import { api, type SystemInfo } from "../lib/api";

const useStyles = makeStyles({ root: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalL } });

export function Overview() {
  const s = useStyles();
  const { t } = useTranslation();
  const [info, setInfo] = useState<SystemInfo | null>(null);
  useEffect(() => void api.detectSystem().then(setInfo, () => {}), []);
  return (
    <div className={s.root}>
      <Title2>{t("overview.title")}</Title2>
      <Card>{info ? <Hardware info={info} /> : <ProgressBar />}</Card>
    </div>
  );
}
