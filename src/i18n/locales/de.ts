import type { DeepPartial, Locale } from "./en";

// Translated: the interface core. Anything missing here (newer screens, tweak descriptions) falls back to English.
export default {
  "common": {
    "next": "Weiter",
    "back": "Zurück",
    "finish": "Fertig",
    "retry": "Erneut versuchen",
    "cancel": "Abbrechen",
    "confirm": "Bestätigen",
    "close": "Schließen",
    "loading": "Wird geladen…",
    "search": "Suchen"
  },
  "setup": {
    "scan": {
      "working": "Wird gescannt…"
    },
    "mode": {
      "title": "Wie viel soll Zanrei übernehmen?",
      "desc": "Du kannst das jederzeit ändern.",
      "manual": {
        "name": "Manuell",
        "desc": "Nichts passiert, solange du es nicht auswählst."
      },
      "recommended": {
        "name": "Empfohlen",
        "desc": "Zanrei schlägt sichere Verbesserungen vor, du bestätigst jede einzeln."
      },
      "auto": {
        "name": "Automatisch",
        "desc": "Zanrei wendet sichere Verbesserungen selbst an, immer nach dem Erstellen eines Wiederherstellungspunkts."
      }
    },
    "done": {
      "title": "Alles bereit",
      "start": "Zanrei öffnen"
    }
  },
  "nav": {
    "overview": "Übersicht",
    "restore": "Wiederherstellen",
    "settings": "Einstellungen"
  },
  "titlebar": {
    "background": "In den Hintergrund"
  },
  "overview": {
    "title": "Dein PC",
    "cpu": "Prozessor",
    "ram": "Arbeitsspeicher",
    "gpu": "Grafik",
    "storage": "Speicher",
    "os": "System",
    "noGpu": "Keine Grafikkarte erkannt",
    "cores": "{{physical}} Kerne / {{logical}} Threads",
    "tier": {
      "Legacy": "Älterer PC",
      "Mainstream": "Mittelklasse-PC",
      "High": "Hochleistungs-PC"
    }
  },
  "restore": {
    "empty": "Noch keine Wiederherstellungspunkte.",
    "create": "Wiederherstellungspunkt erstellen",
    "creating": "Wird erstellt…",
    "rollback": "Rückgängig",
    "rolledBack": "Rückgängig gemacht",
    "openSystem": "Windows-Systemwiederherstellung öffnen",
    "confirmTitle": "Diesen Wiederherstellungspunkt rückgängig machen?",
    "confirmBody": "Alle in diesem Punkt gespeicherten Änderungen werden zurückgesetzt.",
    "failed": "Etwas ist schiefgelaufen"
  },
  "settings": {
    "language": "Sprache"
  }
} satisfies DeepPartial<Locale>;
