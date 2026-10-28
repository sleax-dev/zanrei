import { listen } from "@tauri-apps/api/event";
import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  api, BOOST_EVENT, type BoostStatus, errorText, type Prefs, type Restart, type Settings, type SystemInfo, type TweakInfo,
  UPDATE_EVENT, type UpdateStatus,
} from "./lib/api";

export type ToastKind = "info" | "success" | "error";
export interface Toast {
  id: number;
  kind: ToastKind;
  text: string;
}

interface AppCtx {
  settings: Settings;
  savePrefs: (patch: Partial<Prefs>) => Promise<void>;
  mica: boolean;
  system: SystemInfo | null;
  tweaks: TweakInfo[] | null;
  busy: ReadonlySet<string>;
  reloadTweaks: () => Promise<void>;
  setTweak: (id: string, enabled: boolean) => Promise<void>;
  applyRecommended: (includeModerate: boolean) => Promise<void>;
  applying: boolean;
  pending: Restart;
  refreshPending: () => Promise<void>;
  boost: BoostStatus;
  update: UpdateStatus | null;
  checkForUpdate: () => Promise<void>;
  installUpdate: () => Promise<void>;
  toasts: Toast[];
  toast: (text: string, kind?: ToastKind) => void;
  dismissToast: (id: number) => void;
}

const Ctx = createContext<AppCtx | null>(null);

export function useApp(): AppCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp outside AppProvider");
  return v;
}

export function AppProvider({ initial, children }: { initial: Settings; children: ReactNode }) {
  const { t } = useTranslation();
  const [settings, setSettings] = useState(initial);
  const [mica, setMica] = useState(false);
  const [system, setSystem] = useState<SystemInfo | null>(null);
  const [tweaks, setTweaks] = useState<TweakInfo[] | null>(null);
  const [busy, setBusy] = useState<ReadonlySet<string>>(new Set());
  const [applying, setApplying] = useState(false);
  const [pending, setPending] = useState<Restart>("None");
  const [boost, setBoost] = useState<BoostStatus>({ active: false, game: null });
  const [update, setUpdate] = useState<UpdateStatus | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(1);

  const dismissToast = useCallback((id: number) => setToasts((l) => l.filter((x) => x.id !== id)), []);
  const toast = useCallback(
    (text: string, kind: ToastKind = "info") => {
      const id = nextId.current++;
      setToasts((l) => [...l.slice(-3), { id, kind, text }]);
      setTimeout(() => dismissToast(id), kind === "error" ? 9000 : 4500);
    },
    [dismissToast],
  );

  const savePrefs = useCallback(
    async (patch: Partial<Prefs>) => {
      const next = { ...settings, ...patch };
      setSettings(next);
      try {
        await api.savePreferences({
          language: next.language,
          setup_done: next.setup_done,
          mode: next.mode,
          run_in_background: next.run_in_background,
          game_boost: next.game_boost,
          auto_update: next.auto_update,
        });
      } catch (e) {
        toast(errorText(e), "error");
      }
    },
    [settings, toast],
  );

  const refreshPending = useCallback(async () => setPending(await api.pendingRestart().catch(() => "None" as Restart)), []);
  const reloadTweaks = useCallback(async () => setTweaks(await api.listTweaks().catch(() => [])), []);

  const setTweak = useCallback(
    async (id: string, enabled: boolean) => {
      setBusy((b) => new Set(b).add(id));
      try {
        const info = await api.setTweak(id, enabled);
        setTweaks((l) => l?.map((x) => (x.id === id ? info : x)) ?? l);
        await refreshPending();
      } catch (e) {
        toast(errorText(e), "error");
        await reloadTweaks();
      } finally {
        setBusy((b) => {
          const n = new Set(b);
          n.delete(id);
          return n;
        });
      }
    },
    [refreshPending, reloadTweaks, toast],
  );

  const applyRecommended = useCallback(
    async (includeModerate: boolean) => {
      setApplying(true);
      try {
        const r = await api.applyRecommended(includeModerate);
        if (r.failed.length) toast(`${r.failed.length} × ${r.failed[0].id}: ${r.failed[0].error}`, "error");
        if (r.applied.length) toast(t("toast.applied", { count: r.applied.length }), "success");
        else if (!r.failed.length) toast(t("toast.nothingToApply"), "info");
        await Promise.all([reloadTweaks(), refreshPending()]);
      } catch (e) {
        toast(errorText(e), "error");
      } finally {
        setApplying(false);
      }
    },
    [reloadTweaks, refreshPending, t, toast],
  );

  const checkForUpdate = useCallback(async () => {
    try {
      const u = await api.checkUpdate();
      setUpdate(u);
      if (u.error) toast(`${t("settings.updateFailed")} ${u.error}`, "error");
      else toast(u.available ? t("settings.updateAvailable", { version: u.available.version }) : t("settings.upToDate"), "info");
    } catch (e) {
      toast(`${t("settings.updateFailed")} ${errorText(e)}`, "error");
    }
  }, [t, toast]);

  const installUpdate = useCallback(async () => {
    try {
      await api.installUpdate();
    } catch (e) {
      toast(`${t("settings.updateFailed")} ${errorText(e)}`, "error");
    }
  }, [t, toast]);

  useEffect(() => {
    api.micaEnabled().then(setMica, () => {});
    api.updateStatus().then(setUpdate, () => {});
    api.detectSystem().then(setSystem, () => {});
    api.boostStatus().then(setBoost, () => {});
    refreshPending();
    reloadTweaks();
    const unlisten = listen<BoostStatus>(BOOST_EVENT, (e) => setBoost(e.payload));
    const unlistenUpdate = listen<UpdateStatus>(UPDATE_EVENT, (e) => setUpdate(e.payload));
    return () => {
      void unlisten.then((f) => f());
      void unlistenUpdate.then((f) => f());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once at startup
  }, []);

  const value = useMemo<AppCtx>(
    () => ({
      settings, savePrefs, mica, system, tweaks, busy, reloadTweaks, setTweak, applyRecommended, applying,
      pending, refreshPending, boost, update, checkForUpdate, installUpdate, toasts, toast, dismissToast,
    }),
    [settings, savePrefs, mica, system, tweaks, busy, reloadTweaks, setTweak, applyRecommended, applying,
      pending, refreshPending, boost, update, checkForUpdate, installUpdate, toasts, toast, dismissToast],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
