import { FluentProvider } from "@fluentui/react-components";
import { AnimatePresence } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Shell } from "./components/Shell";
import { Splash } from "./components/Splash";
import { TitleBar } from "./components/TitleBar";
import { isRtl } from "./i18n";
import type { Settings } from "./lib/api";
import { Setup } from "./pages/Setup";
import { AppProvider, useApp } from "./state";
import { applyCss, fluentTheme, resolveAccent } from "./look";

function Root() {
  const { settings, mica, picture } = useApp();
  // The opening plays once, on the very first run, before the first step of the setup.
  const [intro, setIntro] = useState(!settings.setup_done);
  return (
    <div className={mica && !picture ? "app-bg mica" : "app-bg"}>
      {settings.setup_done ? (
        <Shell />
      ) : (
        <>
          <TitleBar />
          <AnimatePresence mode="wait">{intro ? <Splash key="splash" onDone={() => setIntro(false)} /> : <Setup key="setup" />}</AnimatePresence>
        </>
      )}
    </div>
  );
}

/** The Fluent theme and the CSS follow the accent and the picture the user picked. */
function Themed() {
  const { i18n } = useTranslation();
  const { settings, picture } = useApp();
  const [accent, setAccent] = useState(settings.accent);
  useEffect(() => {
    let alive = true;
    void resolveAccent(settings.accent, picture, settings.accent_from_bg).then((a) => {
      if (!alive) return;
      setAccent(a);
      applyCss(a, picture, settings.bg_blur, settings.bg_dim);
    });
    return () => {
      alive = false;
    };
  }, [settings.accent, settings.accent_from_bg, settings.bg_blur, settings.bg_dim, picture]);
  const theme = useMemo(() => fluentTheme(accent), [accent]);
  return (
    <FluentProvider theme={theme} dir={isRtl(i18n.language) ? "rtl" : "ltr"} style={{ background: "transparent", height: "100%" }}>
      <Root />
    </FluentProvider>
  );
}

export function App({ initial }: { initial: Settings }) {
  return (
    <AppProvider initial={initial}>
      <Themed />
    </AppProvider>
  );
}
