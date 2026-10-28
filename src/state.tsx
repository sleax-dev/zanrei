import { listen } from "@tauri-apps/api/event";
import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  api, BOOST_EVENT, type BoostStatus, errorText, LOG_EVENT, type LogEntry, type Prefs, type Restart, type Settings, type Snapshot,
  type SystemInfo, type TweakInfo, UPDATE_EVENT, type UpdateStatus,
} from "./lib/api";
import type { Page } from "./nav";

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
  page: Page;
  setPage: (p: Page) => void;
  system: SystemInfo | null;
  tweaks: TweakInfo[] | null;
  busy: ReadonlySet<string>;
  reloadTweaks: () => Promise<void>;
  /** `null` on success, the error text otherwise (the error is also toasted). */
  setTweak: (id: string, enabled: boolean) => Promise<string | null>;
  applyRecommended: (includeModerate: boolean) => Promise<void>;
  applying: boolean;
  pending: Restart;
  /** Which switches caused the pending restart, so the bar can say why. */
  restartCauses: string[];
  refreshPending: () => Promise<void>;
  snapshots: Snapshot[];
  reloadSnapshots: () => Promise<void>;
  boost: BoostStatus;
  update: UpdateStatus | null;
  checkForUpdate: () => Promise<void>;
  installUpdate: () => Promise<void>;
  logs: LogEntry[];
  unseenErrors: number;
  clearLogs: () => Promise<void>;
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

const MAX_LOGS = 1000;

export function AppProvider({ initial, children }: { initial: Settings; children: ReactNode }) {
  const { t } = useTranslation();
  const [settings, setSettings] = useState(initial);
  const [mica, setMica] = useState(false);
  const [page, setPage] = useState<Page>("overview");
  const [system, setSystem] = useState<SystemInfo | null>(null);
  const [tweaks, setTweaks] = useState<TweakInfo[] | null>(null);
  const [busy, setBusy] = useState<ReadonlySet<string>>(new Set());
  const [applying, setApplying] = useState(false);
  const [pending, setPending] = useState<Restart>("None");
  const [restartCauses, setRestartCauses] = useState<string[]>([]);
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [boost, setBoost] = useState<BoostStatus>({ active: false, game: null });
  const [update, setUpdate] = useState<UpdateStatus | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [seenAt, setSeenAt] = useState(0);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextId = useRef(1);

  const dismissToast = useCallback((id: number) => setToasts((l) => l.filter((x) => x.id !== id)), []);
  const toast = useCallback(
    (text: string, kind: ToastKind = "info") => {
      const id = nextId.current++;
      setToasts((l) => [...l.slice(-3), { id, kind, text }]);
      // Errors stay until dismissed: a problem that vanishes after nine seconds is a problem nobody can report.
      if (kind !== "error") setTimeout(() => dismissToast(id), 4500);
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

  const refreshPending = useCallback(async () => {
    const p = await api.pendingRestart().catch(() => "None" as Restart);
    setPending(p);
    if (p === "None") setRestartCauses([]);
  }, []);
  const reloadTweaks = useCallback(async () => setTweaks(await api.listTweaks().catch(() => [])), []);
  const reloadSnapshots = useCallback(async () => setSnapshots(await api.listSnapshots().catch(() => [])), []);

  const setTweak = useCallback(
    async (id: string, enabled: boolean) => {
      setBusy((b) => new Set(b).add(id));
      try {
        const info = await api.setTweak(id, enabled);
        setTweaks((l) => l?.map((x) => (x.id === id ? info : x)) ?? l);
        if (info.restart !== "None") setRestartCauses((c) => (c.includes(id) ? c : [...c, id]));
        await Promise.all([refreshPending(), reloadSnapshots()]);
        return null;
      } catch (e) {
        toast(`${t(`tweaks.${id}.name`)}: ${errorText(e)}`, "error");
        await reloadTweaks();
        return errorText(e);
      } finally {
        setBusy((b) => {
          const n = new Set(b);
          n.delete(id);
          return n;
        });
      }
    },
    [refreshPending, reloadSnapshots, reloadTweaks, t, toast],
  );

  const applyRecommended = useCallback(
    async (includeModerate: boolean) => {
      setApplying(true);
      try {
        const r = await api.applyRecommended(includeModerate);
        for (const f of r.failed) toast(`${t(`tweaks.${f.id}.name`)}: ${f.error}`, "error");
        if (r.applied.length) toast(t("toast.applied", { count: r.applied.length }), "success");
        else if (!r.failed.length) toast(t("toast.nothingToApply"), "info");
        await Promise.all([reloadTweaks(), refreshPending(), reloadSnapshots()]);
      } catch (e) {
        toast(errorText(e), "error");
      } finally {
        setApplying(false);
      }
    },
    [reloadTweaks, refreshPending, reloadSnapshots, t, toast],
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

  const clearLogs = useCallback(async () => {
    await api.clearLogs().catch(() => {});
    setLogs([]);
  }, []);

  useEffect(() => {
    api.micaEnabled().then(setMica, () => {});
    api.updateStatus().then(setUpdate, () => {});
    api.detectSystem().then(setSystem, () => {});
    api.boostStatus().then(setBoost, () => {});
    api.getLogs().then(setLogs, () => {});
    refreshPending();
    reloadTweaks();
    reloadSnapshots();
    const off = [
      listen<BoostStatus>(BOOST_EVENT, (e) => setBoost(e.payload)),
      listen<UpdateStatus>(UPDATE_EVENT, (e) => setUpdate(e.payload)),
      listen<LogEntry>(LOG_EVENT, (e) => setLogs((l) => [...l.slice(-(MAX_LOGS - 1)), e.payload])),
    ];
    // Something else may have changed Windows settings while Zanrei was in the background: look again when it comes back.
    const refresh = () => {
      if (document.visibilityState === "hidden") return;
      void reloadTweaks();
      void refreshPending();
    };
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);
    return () => {
      off.forEach((p) => void p.then((f) => f()));
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once at startup
  }, []);

  useEffect(() => {
    if (page === "logs") setSeenAt(Date.now());
  }, [page, logs.length]);

  const unseenErrors = useMemo(() => logs.filter((l) => l.level === "Error" && l.ts > seenAt).length, [logs, seenAt]);

  const value = useMemo<AppCtx>(
    () => ({
      settings, savePrefs, mica, page, setPage, system, tweaks, busy, reloadTweaks, setTweak, applyRecommended, applying,
      pending, restartCauses, refreshPending, snapshots, reloadSnapshots, boost, update, checkForUpdate, installUpdate,
      logs, unseenErrors, clearLogs, toasts, toast, dismissToast,
    }),
    [settings, savePrefs, mica, page, system, tweaks, busy, reloadTweaks, setTweak, applyRecommended, applying, pending,
      restartCauses, refreshPending, snapshots, reloadSnapshots, boost, update, checkForUpdate, installUpdate, logs,
      unseenErrors, clearLogs, toasts, toast, dismissToast],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
