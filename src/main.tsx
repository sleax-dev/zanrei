import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { initI18n } from "./i18n";
import { api, DEFAULT_SETTINGS } from "./lib/api";
import "@fontsource-variable/inter";
import "./styles.css";

// Settings first, so the very first paint is already in the right language.
const settings = await api.getSettings().catch(() => DEFAULT_SETTINGS);
await initI18n(settings.language);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App initial={settings} />
  </StrictMode>,
);
