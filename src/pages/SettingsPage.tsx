import { Dropdown, makeStyles, Option, Subtitle2, Title2, tokens } from "@fluentui/react-components";
import { useTranslation } from "react-i18next";
import { ModeCards } from "../components/ModeCards";
import { LANGUAGES, type Lang, pickLang, setLanguage } from "../i18n";
import type { Mode, Settings } from "../lib/api";

const useStyles = makeStyles({ root: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalM, maxWidth: "560px" } });

export function SettingsPage({ settings, onChange }: { settings: Settings; onChange: (s: Settings) => void }) {
  const s = useStyles();
  const { t, i18n } = useTranslation();
  const lang = pickLang(i18n.language);
  return (
    <div className={s.root}>
      <Title2>{t("settings.title")}</Title2>
      <Subtitle2>{t("settings.language")}</Subtitle2>
      <Dropdown
        value={LANGUAGES[lang]}
        selectedOptions={[lang]}
        onOptionSelect={async (_, d) => {
          if (!d.optionValue) return;
          await setLanguage(d.optionValue as Lang);
          onChange({ ...settings, language: d.optionValue });
        }}
      >
        {Object.entries(LANGUAGES).map(([k, name]) => (
          <Option key={k} value={k}>{name}</Option>
        ))}
      </Dropdown>
      <Subtitle2>{t("settings.mode")}</Subtitle2>
      <ModeCards value={settings.mode} onChange={(mode: Mode) => onChange({ ...settings, mode })} />
    </div>
  );
}
