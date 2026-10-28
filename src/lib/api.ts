import { invoke } from "@tauri-apps/api/core";

export type Mode = "Manual" | "Recommended" | "Auto";
export type Tier = "Legacy" | "Mainstream" | "High";

export interface Settings {
  language: string | null;
  setup_done: boolean;
  mode: Mode;
}

export interface Gpu {
  name: string;
  vendor: "Nvidia" | "Amd" | "Intel" | "Other";
  driver_version: string;
  vram_bytes: number | null;
}

export interface DiskInfo {
  mount: string;
  kind: string;
  total_bytes: number;
  free_bytes: number;
}

export interface SystemInfo {
  os_name: string;
  os_version: string;
  os_build: string;
  is_windows_11: boolean;
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
}

export const api = {
  detectSystem: () => invoke<SystemInfo>("detect_system"),
  listSnapshots: () => invoke<Snapshot[]>("list_snapshots"),
  createSnapshot: (label: string) => invoke<Snapshot>("create_snapshot", { label }),
  rollbackSnapshot: (id: string) => invoke<void>("rollback_snapshot", { id }),
  openSystemRestore: () => invoke<void>("open_system_restore"),
  getSettings: () => invoke<Settings>("get_settings"),
  saveSettings: (settings: Settings) => invoke<void>("save_settings", { settings }),
  micaEnabled: () => invoke<boolean>("mica_enabled"),
};

export const DEFAULT_SETTINGS: Settings = { language: null, setup_done: false, mode: "Recommended" };

export const gb = (bytes: number) => `${(bytes / 2 ** 30).toFixed(bytes < 10 * 2 ** 30 ? 1 : 0)} GB`;
