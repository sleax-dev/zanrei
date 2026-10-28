const en = {
  common: { next: "Next", back: "Back", finish: "Finish", retry: "Try again", cancel: "Cancel", confirm: "Confirm" },
  setup: {
    language: { title: "Choose your language", desc: "You can change this later in Settings." },
    scan: {
      title: "Checking your PC",
      desc: "Zanrei looks at your hardware so it can suggest the right settings. Nothing is changed.",
      working: "Scanning…",
      failed: "The scan failed.",
    },
    restore: {
      title: "Create a safety net",
      desc: "Before Zanrei changes anything, it creates a Windows restore point. Every change can be undone from inside the app.",
      create: "Create restore point",
      creating: "Creating restore point…",
      done: "Restore point created.",
      failed: "Could not create a restore point. Zanrei will not change anything without one.",
    },
    mode: {
      title: "How much should Zanrei do?",
      desc: "You can change this any time.",
      manual: { name: "Manual", desc: "Nothing happens unless you choose it." },
      recommended: { name: "Recommended", desc: "Zanrei suggests safe improvements and you confirm each one." },
      auto: { name: "Automatic", desc: "Zanrei applies safe improvements by itself, always after creating a restore point." },
    },
    done: { title: "You're all set", desc: "Zanrei is ready.", start: "Open Zanrei" },
  },
  nav: { overview: "Overview", restore: "Restore", settings: "Settings" },
  overview: {
    title: "Your PC",
    cpu: "Processor",
    ram: "Memory",
    gpu: "Graphics",
    storage: "Storage",
    os: "System",
    noGpu: "No graphics card detected",
    cores: "{{physical}} cores / {{logical}} threads",
    tierLabel: "Performance class",
    tier: { Legacy: "Older PC", Mainstream: "Mainstream PC", High: "High-performance PC" },
  },
  restore: {
    title: "Restore",
    desc: "Every change Zanrei makes is saved here and can be undone.",
    empty: "No restore points yet.",
    create: "Create restore point",
    creating: "Creating…",
    rollback: "Undo",
    rolledBack: "Undone",
    changes: "Changes: {{count}}",
    openSystem: "Open Windows System Restore",
    confirmTitle: "Undo this restore point?",
    confirmBody: "All changes saved in this restore point will be reverted.",
    failed: "Something went wrong",
  },
  settings: { title: "Settings", language: "Language", mode: "Automation level" },
};

export default en;
export type Locale = typeof en;
