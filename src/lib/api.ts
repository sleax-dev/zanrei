import { invoke } from "@tauri-apps/api/core";

export type Mode = "Manual" | "Recommended" | "Auto";
type Tier = "Legacy" | "Mainstream" | "High";
export type Category = "Privacy" | "Performance" | "Gaming" | "Interface" | "System" | "Cleanup";
type Risk = "Safe" | "Moderate" | "Advanced";
export type Restart = "None" | "Explorer" | "SignOut" | "Reboot";
type TweakState = "Applied" | "NotApplied" | "Partial" | "Unavailable";
export type GameOption = "HighGpu" | "NoFso" | "HighPriority";

interface CustomGame {
  name: string;
  exe: string;
}

export interface Settings {
  language: string | null;
  setup_done: boolean;
  mode: Mode;
  run_in_background: boolean;
  game_boost: boolean;
  auto_update: boolean;
  custom_games: CustomGame[];
  user_disabled: string[];
  boost_restore_scheme: string | null;
}

/** What the UI is allowed to change; the backend owns the rest of Settings. */
export type Prefs = Pick<Settings, "language" | "setup_done" | "mode" | "run_in_background" | "game_boost" | "auto_update">;

export interface Gpu {
  name: string;
  vendor: "Nvidia" | "Amd" | "Intel" | "Other";
  driver_version: string;
  driver_date_unix: number | null;
  vram_bytes: number | null;
}

interface DiskInfo {
  mount: string;
  kind: string;
  total_bytes: number;
  free_bytes: number;
}

interface Flavor {
  id: "atlas" | "revios";
  name: string;
  version: string | null;
}

export interface SystemInfo {
  os_name: string;
  os_version: string;
  os_build: string;
  is_windows_11: boolean;
  /** "Pro", "Home", ... */
  edition: string;
  /** Feature update such as "24H2". */
  display_version: string;
  /** A modified Windows that names itself in the OEM information (AtlasOS, ReviOS). */
  flavor: Flavor | null;
  cpu_name: string;
  physical_cores: number;
  logical_cores: number;
  ram_bytes: number;
  gpus: Gpu[];
  disks: DiskInfo[];
  tier: Tier;
}

export interface Snapshot {
  id: string;
  created_unix: number;
  label: string;
  entries: unknown[];
  rolled_back: boolean;
  /** What was changed: tweak ids, "game:<option>:<exe>" or "startup:<source>:<name>". */
  notes: string[];
  restore_point: number | null;
}

export interface StartupItem {
  id: string;
  name: string;
  command: string;
  scope: "User" | "AllUsers";
  enabled: boolean;
  system: boolean;
}

export interface CleanupItem {
  id: string;
  bytes: number;
}

export interface LiveStats {
  cpu_percent: number;
  ram_used: number;
  ram_total: number;
  processes: number;
}

export interface DeleteReport {
  deleted: number;
  windows_points_kept: number;
}

export interface TweakInfo {
  id: string;
  category: Category;
  risk: Risk;
  restart: Restart;
  reversible: boolean;
  recommended: boolean;
  state: TweakState;
}

export interface BloatApp {
  /** Store package name */
  name: string;
  /** ticked by default; false for apps people often use on purpose (Spotify, Phone Link…) */
  suggested: boolean;
}

export interface GameOptions {
  high_gpu: boolean;
  no_fso: boolean;
  high_priority: boolean;
}

interface Game {
  id: string;
  name: string;
  launcher: string;
  dir: string;
  exe: string;
  exes: string[];
}

export type GameInfo = Game & { options: GameOptions };

export interface BoostStatus {
  active: boolean;
  game: string | null;
}

export interface ApplyReport {
  applied: string[];
  failed: { id: string; error: string }[];
}

export interface UpdateStatus {
  current: string;
  available: { version: string; notes: string | null; date: string | null } | null;
  checking: boolean;
  installing: boolean;
  downloaded: number;
  total: number | null;
  error: string | null;
  last_checked_unix: number | null;
}

export const BOOST_EVENT = "zanrei://boost";
export const UPDATE_EVENT = "zanrei://update";
export const LOG_EVENT = "zanrei://log";

export type LogLevel = "Info" | "Warn" | "Error";
export interface LogEntry {
  ts: number;
  level: LogLevel;
  source: string;
  message: string;
}

export const api = {
  detectSystem: () => invoke<SystemInfo>("detect_system"),
  listSnapshots: () => invoke<Snapshot[]>("list_snapshots"),
  createSnapshot: (label: string) => invoke<Snapshot>("create_snapshot", { label }),
  rollbackSnapshot: (id: string) => invoke<void>("rollback_snapshot", { id }),
  deleteSnapshots: (ids: string[]) => invoke<DeleteReport>("delete_snapshots", { ids }),
  openSystemRestore: () => invoke<void>("open_system_restore"),
  getSettings: () => invoke<Settings>("get_settings"),
  savePreferences: (prefs: Prefs) => invoke<void>("save_preferences", { prefs }),
  micaEnabled: () => invoke<boolean>("mica_enabled"),
  minimizeWindow: () => invoke<void>("minimize_window"),
  closeWindow: () => invoke<void>("close_window"),
  quitApp: () => invoke<void>("quit_app"),
  getAutostart: () => invoke<boolean>("get_autostart"),
  setAutostart: (enabled: boolean) => invoke<void>("set_autostart", { enabled }),
  listTweaks: () => invoke<TweakInfo[]>("list_tweaks"),
  /** `acknowledged` is only for changes that cannot be undone, and only from their confirmation dialog. */
  setTweak: (id: string, enabled: boolean, acknowledged = false) => invoke<TweakInfo>("set_tweak", { id, enabled, acknowledged }),
  listBloatApps: () => invoke<BloatApp[]>("list_bloat_apps"),
  removeBloatApps: (apps: string[]) => invoke<TweakInfo>("remove_bloat_apps", { apps }),
  applyRecommended: (includeModerate: boolean) => invoke<ApplyReport>("apply_recommended", { includeModerate }),
  pendingRestart: () => invoke<Restart>("pending_restart"),
  restartNow: (seconds: number) => invoke<void>("restart_now", { seconds }),
  cancelRestart: () => invoke<void>("cancel_restart"),
  restartExplorer: () => invoke<void>("restart_explorer"),
  signOut: () => invoke<void>("sign_out"),
  scanCleanup: () => invoke<CleanupItem[]>("scan_cleanup"),
  runCleanup: (ids: string[]) => invoke<number>("run_cleanup", { ids }),
  listStartup: () => invoke<StartupItem[]>("list_startup"),
  setStartup: (id: string, enabled: boolean) => invoke<StartupItem[]>("set_startup", { id, enabled }),
  liveStats: () => invoke<LiveStats>("live_stats"),
  listGames: () => invoke<GameInfo[]>("list_games"),
  setGameOption: (exe: string, option: GameOption, enabled: boolean) =>
    invoke<GameOptions>("set_game_option", { exe, option, enabled }),
  addCustomGame: (name: string, exe: string) => invoke<void>("add_custom_game", { name, exe }),
  removeCustomGame: (exe: string) => invoke<void>("remove_custom_game", { exe }),
  boostStatus: () => invoke<BoostStatus>("boost_status"),
  getLogs: () => invoke<LogEntry[]>("get_logs"),
  clearLogs: () => invoke<void>("clear_logs"),
  openLogFolder: () => invoke<void>("open_log_folder"),
  updateStatus: () => invoke<UpdateStatus>("update_status"),
  checkUpdate: () => invoke<UpdateStatus>("check_update"),
  installUpdate: () => invoke<void>("install_update"),
};

export const DEFAULT_SETTINGS: Settings = {
  language: null,
  setup_done: false,
  mode: "Recommended",
  run_in_background: true,
  game_boost: true,
  auto_update: true,
  custom_games: [],
  user_disabled: [],
  boost_restore_scheme: null,
};

export function errorText(e: unknown): string {
  return typeof e === "string" ? e : e instanceof Error ? e.message : JSON.stringify(e);
}
