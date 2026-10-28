import { Dropdown, Option } from "@fluentui/react-components";
import { useTranslation } from "react-i18next";
import { LANGUAGES, type Lang, pickLang, setLanguage } from "../i18n";

export function LanguagePicker({ onChange }: { onChange?: (l: Lang) => void }) {
  const { i18n } = useTranslation();
  const lang = pickLang(i18n.language);
  return (
    <Dropdown
      value={LANGUAGES[lang]}
      selectedOptions={[lang]}
      onOptionSelect={async (_, d) => {
        if (!d.optionValue) return;
        await setLanguage(d.optionValue as Lang);
        onChange?.(d.optionValue as Lang);
      }}
    >
      {Object.entries(LANGUAGES).map(([k, name]) => (
        <Option key={k} value={k}>{name}</Option>
      ))}
    </Dropdown>
  );
}
