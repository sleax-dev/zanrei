import { Search20Regular } from "@fluentui/react-icons";
import { useTranslation } from "react-i18next";

export function SearchBox({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const { t } = useTranslation();
  return (
    <label className="search">
      <Search20Regular />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={t("common.search")} aria-label={t("common.search")} />
    </label>
  );
}
