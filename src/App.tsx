import { FluentProvider } from "@fluentui/react-components";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Shell } from "./components/Shell";
import { Splash } from "./components/Splash";
import { TitleBar } from "./components/TitleBar";
import { isRtl } from "./i18n";
import type { Settings } from "./lib/api";
import { Setup } from "./pages/Setup";
import { AppProvider, useApp } from "./state";
import { theme } from "./theme";

function Root() {
  const { settings, mica } = useApp();
  // The opening plays once, on the very first run, before the first step of the setup.
  const [intro, setIntro] = useState(!settings.setup_done);
  return (
    <div className={mica ? "app-bg mica" : "app-bg"}>
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

export function App({ initial }: { initial: Settings }) {
  const { i18n } = useTranslation();
  return (
    <FluentProvider theme={theme} dir={isRtl(i18n.language) ? "rtl" : "ltr"} style={{ background: "transparent", height: "100%" }}>
      <AppProvider initial={initial}>
        <Root />
      </AppProvider>
    </FluentProvider>
  );
}
