import { FluentProvider } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Shell } from "./components/Shell";
import { isRtl } from "./i18n";
import { api, type Settings } from "./lib/api";
import { Setup } from "./pages/Setup";
import { theme } from "./theme";

export function App({ initial }: { initial: Settings }) {
  const { i18n } = useTranslation();
  const [settings, setSettings] = useState(initial);
  const [mica, setMica] = useState(false);
  useEffect(() => void api.micaEnabled().then(setMica, () => {}), []);

  const save = (s: Settings) => {
    setSettings(s);
    api.saveSettings(s).catch(() => {}); // ponytail: a failed save only means setup shows again next launch; surface it when settings get more than 3 fields
  };

  return (
    <FluentProvider theme={theme} dir={isRtl(i18n.language) ? "rtl" : "ltr"} style={{ background: "transparent", height: "100%" }}>
      <div className={mica ? "app-bg mica" : "app-bg"}>
        {settings.setup_done ? <Shell settings={settings} onChange={save} /> : <Setup initial={settings} onDone={save} />}
      </div>
    </FluentProvider>
  );
}
