import type { Locale, Translation } from "./en";

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
    "remove": "Entfernen",
    "search": "Suchen",
    "delete": "Löschen"
  },
  "boost": {
    "label": "Spiele-Boost",
    "on": "An",
    "off": "Aus"
  },
  "splash": {
    "tagline": "Windows, optimiert. Jede Änderung lässt sich rückgängig machen.",
    "loading": "Zanrei wird gestartet…"
  },
  "setup": {
    "progress": "Schritt {{current}} von {{total}}",
    "steps": {
      "welcome": "Willkommen",
      "recommend": "Empfehlung",
      "done": "Fertig"
    },
    "welcome": {
      "title": "Willkommen bei Zanrei",
      "body": "Zanrei stimmt Windows auf genau deinen PC ab, und jede Änderung lässt sich rückgängig machen.",
      "p1": "Vor der ersten Änderung wird ein Windows-Wiederherstellungspunkt erstellt.",
      "p2": "Du siehst, was jede Einstellung bewirkt, bevor sie eingeschaltet wird.",
      "p3": "Es wird nichts gesendet. Es gibt kein Konto.",
      "language": "Sprache",
      "start": "Los geht's"
    },
    "scan": {
      "working": "Wird gescannt…"
    },
    "recommend": {
      "title": "Empfohlen für deinen PC",
      "found_one": "{{count}} Einstellung passt zu ihm.",
      "found_other": "{{count}} Einstellungen passen zu ihm.",
      "alreadyOn": "{{count}} weitere waren bereits eingerichtet.",
      "pc": "Dein PC",
      "safety": "Zuerst wird ein Wiederherstellungspunkt erstellt. Auf der Seite Wiederherstellen kannst du alles rückgängig machen.",
      "failed": "Zanrei konnte eine Änderung nicht vornehmen und hat deshalb angehalten. Sonst wurde nichts angefasst.",
      "skip": "Überspringen, ich wähle selbst",
      "applying": "Wird angewendet: {{done}} von {{total}}…",
      "apply_one": "{{count}} Einstellung anwenden",
      "apply_other": "{{count}} Einstellungen anwenden"
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
      "applied_one": "{{count}} Einstellung wurde angewendet.",
      "applied_other": "{{count}} Einstellungen wurden angewendet.",
      "nothing": "Es wurden keine Änderungen vorgenommen.",
      "autoNote": "Ab jetzt wendet Zanrei neue sichere Empfehlungen selbst an. Was du ausschaltest, bleibt aus. Das kannst du in den Einstellungen ändern.",
      "manualNote": "Zanrei schlägt Verbesserungen vor und wartet auf deine Zustimmung. Das kannst du in den Einstellungen ändern.",
      "start": "Zanrei öffnen"
    }
  },
  "nav": {
    "label": "Hauptmenü",
    "countLabel": "{{on}} von {{total}} aktiv",
    "newErrors_one": "{{count}} neuer Fehler",
    "newErrors_other": "{{count}} neue Fehler",
    "overview": "Übersicht",
    "privacy": "Datenschutz",
    "performance": "Leistung",
    "startup": "Autostart",
    "gaming": "Gaming",
    "windows": "Windows",
    "cleanup": "Bereinigung",
    "library": "Bibliothek",
    "graphics": "Grafik",
    "guide": "Ratgeber",
    "restore": "Wiederherstellen",
    "logs": "Protokoll",
    "settings": "Einstellungen",
    "group": {
      "optimize": "Optimieren",
      "games": "Spiele",
      "tools": "Werkzeuge"
    }
  },
  "pageDesc": {
    "privacy": "Verhindert, dass Windows mehr sammelt und teilt als nötig.",
    "performance": "Lässt einen älteren oder ausgelasteten PC schneller wirken.",
    "startup": "Wähle, welche Programme mit Windows starten. Weniger beim Start bedeutet schnelleres Hochfahren und mehr freien Arbeitsspeicher.",
    "gaming": "Weniger Unterbrechungen und weniger Last beim Spielen.",
    "windows": "Kleine Änderungen daran, wie Windows aussieht und sich verhält.",
    "cleanup": "Gibt Speicherplatz frei und entfernt Software, um die du nicht gebeten hast. Gelöschte Dateien und entfernte Programme lassen sich nicht wiederherstellen.",
    "library": "Zanrei findet deine installierten Spiele und stimmt Windows auf jedes einzelne ab.",
    "graphics": "Deine Grafikkarte und ihr Treiber.",
    "restore": "Jede Änderung von Zanrei wird hier gespeichert und kann rückgängig gemacht werden. Nicht mehr benötigte Wiederherstellungspunkte lassen sich löschen.",
    "guide": "Was nur du tun kannst, etwa BIOS-Einstellungen, Hardware- und Treiberschritte, und wie du mit einem sauberen Windows neu anfängst.",
    "logs": "Was Zanrei getan hat und was schiefgelaufen ist. Teile es, wenn du um Hilfe bittest.",
    "settings": "Wie Zanrei startet, sich aktualisiert und verhält."
  },
  "titlebar": {
    "minimize": "Minimieren",
    "close": "Schließen",
    "closeToTray": "Schließen (läuft im Hintergrund weiter)"
  },
  "toast": {
    "applied_one": "{{count}} Einstellung angewendet",
    "applied_other": "{{count}} Einstellungen angewendet",
    "nothingToApply": "Nichts mehr anzuwenden",
    "viewLog": "Protokoll anzeigen"
  },
  "restart": {
    "Explorer": "Der Datei-Explorer muss neu gestartet werden, um die Änderungen abzuschließen.",
    "SignOut": "Melde dich ab und wieder an, um die Änderungen abzuschließen.",
    "Reboot": "Starte Windows neu, um die Änderungen abzuschließen.",
    "because": "Wegen: {{names}}",
    "explorerButton": "Explorer neu starten",
    "rebootButton": "Jetzt neu starten",
    "signOutButton": "Jetzt abmelden",
    "signOutTitle": "Von Windows abmelden?",
    "signOutBody": "Du wirst sofort abgemeldet. Speichere vorher deine Arbeit.",
    "confirmTitle": "Windows neu starten?",
    "confirmBody": "Windows startet in {{seconds}} Sekunden neu. Speichere vorher deine Arbeit. Bis dahin kannst du abbrechen.",
    "countdown": "Neustart in {{seconds}} s…"
  },
  "overview": {
    "title": "Dein PC",
    "loading": "Dein PC wird geprüft…",
    "tier": {
      "Legacy": "Älterer PC",
      "Mainstream": "Mittelklasse-PC",
      "High": "Hochleistungs-PC"
    },
    "build": "Build {{build}}",
    "os": "System",
    "cpu": "Prozessor",
    "ram": "Arbeitsspeicher",
    "gpu": "Grafik",
    "storage": "Speicher",
    "noGpu": "Keine Grafikkarte erkannt",
    "cores": "{{physical}} Kerne / {{logical}} Threads",
    "freeOf": "{{free}} von {{total}} frei",
    "summaryTodo_one": "{{count}} empfohlene Einstellung ist bereit.",
    "summaryTodo_other": "{{count}} empfohlene Einstellungen sind bereit.",
    "summaryDone": "Alles Empfohlene ist bereits aktiv.",
    "apply": "{{count}} anwenden",
    "safetyNote": "Zuerst wird ein Wiederherstellungspunkt erstellt, und jede Änderung lässt sich rückgängig machen."
  },
  "live": {
    "title": "Gerade jetzt",
    "desc": "Diese Werte ändern sich, wenn Optimierungen wirken. Vergleiche sie nach einem Neustart.",
    "cpu": "Prozessor",
    "ram": "Belegter Arbeitsspeicher",
    "ramTotal": "/ {{total}}",
    "processes": "Laufende Prozesse",
    "startup": "Autostart-Programme"
  },
  "bloat": {
    "pick": "Nur die Apps, die du anhakst, werden entfernt. Apps, die viele bewusst nutzen, sind nicht angehakt.",
    "mayUse": "nutzt du vielleicht",
    "none": "Keine der entfernbaren Apps ist installiert.",
    "remove_one": "{{count}} App entfernen",
    "remove_other": "{{count}} Apps entfernen"
  },
  "optimize": {
    "forThisPc": "Empfohlen für diesen PC",
    "more": "Weitere Optionen",
    "applyAll": "Alle {{count}} anwenden",
    "empty": "Keine Treffer.",
    "apply": "Anwenden",
    "irreversible": "Nicht umkehrbar",
    "acknowledge": "Mir ist klar, dass das nicht rückgängig gemacht werden kann",
    "partial": "Teilweise angewendet",
    "unavailable": "Auf diesem PC nicht verfügbar",
    "category": {
      "Privacy": "Datenschutz",
      "Performance": "Leistung",
      "Gaming": "Gaming",
      "Interface": "Oberfläche",
      "System": "System",
      "Cleanup": "Bereinigung"
    },
    "risk": {
      "Safe": "Sicher",
      "Moderate": "Mittel",
      "Advanced": "Fortgeschritten"
    },
    "needs": {
      "Explorer": "Startet den Explorer neu",
      "SignOut": "Abmeldung nötig",
      "Reboot": "Neustart nötig"
    },
    "confirm": {
      "Safe": "Das ist eine Änderung mit geringem Risiko.",
      "Moderate": "Das ändert, wie Windows sich verhält. Es lässt sich wieder ausschalten, und zuerst wird ein Wiederherstellungspunkt erstellt.",
      "Advanced": "Das ist eine fortgeschrittene Änderung. Lies die Beschreibung genau. Zuerst wird ein Wiederherstellungspunkt erstellt.",
      "irreversible": "Das lässt sich nicht rückgängig machen. Zanrei kann es nicht zurückholen, und auf einen Wiederherstellungspunkt ist dabei kein Verlass."
    }
  },
  "games": {
    "rescan": "Erneut suchen",
    "add": "Spiel hinzufügen",
    "scanning": "Suche nach Spielen…",
    "empty": "Noch keine Spiele gefunden. Füge eins von Hand hinzu oder installiere ein Spiel über Steam, Epic, GOG, Xbox, Ubisoft, EA, Battle.net oder Riot.",
    "yourGames": "Deine Spiele",
    "optionsOn_one": "{{count}} Option aktiv",
    "optionsOn_other": "{{count}} Optionen aktiv",
    "found_one": "{{count}} Spiel gefunden: {{launchers}}",
    "found_other": "{{count}} Spiele gefunden: {{launchers}}",
    "removeFromList": "Aus der Liste entfernen",
    "boostTitle": "Game Boost",
    "boostDesc": "Solange ein Spiel läuft, schaltet Zanrei Windows auf den Energiesparplan Höchstleistung und danach wieder zurück.",
    "boostActive": "Aktiv: {{game}} läuft.",
    "boostWaiting": "Wartet auf den Start eines Spiels.",
    "boostOff": "Ausgeschaltet.",
    "driver": "Treiber",
    "driverCheck": "Nach Updates suchen",
    "opt": {
      "gpu": {
        "name": "Leistungsstarke GPU verwenden",
        "desc": "Weist Windows an, dieses Spiel auf deiner schnellsten Grafikkarte auszuführen."
      },
      "fso": {
        "name": "Vollbildoptimierungen deaktivieren",
        "desc": "Kann Ruckler oder Eingabeverzögerung in manchen älteren Spielen verringern."
      },
      "priority": {
        "name": "Mit hoher CPU-Priorität starten",
        "desc": "Gibt dem Spiel mehr Prozessorzeit als Hintergrundprogrammen."
      }
    }
  },
  "graphics": {
    "oldTitle": "Dieser Treiber ist älter als zwei Jahre",
    "oldBody": "Neuere Treiber beheben Abstürze und unterstützen neue Spiele. Lade den neuesten vom Hersteller herunter.",
    "maker": "Hersteller",
    "driverDate": "Treiberdatum",
    "memory": "Grafikspeicher",
    "tuneTitle": "Windows fürs Spielen abstimmen",
    "tuneBody": "GPU-Planung, Optimierungen für Spiele im Fenstermodus und variable Bildwiederholrate findest du auf der Seite Gaming.",
    "openGaming": "Gaming öffnen"
  },
  "restore": {
    "entryTitle_one": "{{count}} Einstellung geändert",
    "entryTitle_other": "{{count}} Einstellungen geändert",
    "manual": "Manueller Wiederherstellungspunkt",
    "empty": "Noch keine Wiederherstellungspunkte.",
    "create": "Wiederherstellungspunkt erstellen",
    "creating": "Wird erstellt…",
    "rollback": "Rückgängig",
    "rolledBack": "Rückgängig gemacht",
    "openSystem": "Windows-Systemwiederherstellung öffnen",
    "confirmTitle": "Diesen Wiederherstellungspunkt rückgängig machen?",
    "confirmBody": "Alle in diesem Punkt gespeicherten Änderungen werden zurückgesetzt.",
    "failed": "Etwas ist schiefgelaufen",
    "deleteTitle": "Diesen Wiederherstellungspunkt löschen?",
    "deleteBody": "Was er geändert hat, bleibt bestehen, aber Zanrei kann es nicht mehr rückgängig machen. Der zugehörige Windows-Wiederherstellungspunkt wird ebenfalls gelöscht.",
    "deleteAll": "Alle löschen",
    "deleteAllTitle": "Alle Wiederherstellungspunkte löschen?",
    "deleteAllBody": "An den Änderungen selbst wird nichts angefasst, aber keine davon lässt sich mehr mit Zanrei rückgängig machen. Die zugehörigen Windows-Wiederherstellungspunkte werden ebenfalls gelöscht.",
    "deleted_one": "{{count}} Wiederherstellungspunkt gelöscht",
    "deleted_other": "{{count}} Wiederherstellungspunkte gelöscht",
    "windowsKept_one": "{{count}} Windows-Wiederherstellungspunkt konnte nicht entfernt werden. Entferne ihn unter Computerschutz, wenn er weg soll.",
    "windowsKept_other": "{{count}} Windows-Wiederherstellungspunkte konnten nicht entfernt werden. Entferne sie unter Computerschutz, wenn sie weg sollen."
  },
  "startup": {
    "count": "{{on}} von {{total}} starten mit Windows",
    "empty": "Keine Autostart-Programme gefunden.",
    "system": "Windows-Komponente",
    "scope": {
      "User": "Dein Konto",
      "AllUsers": "Alle Benutzer"
    },
    "note": "Ein Programm auszuschalten verhindert nur, dass es mit Windows startet. Es bleibt installiert, und du kannst es wieder einschalten. Schalte nur aus, was du kennst."
  },
  "disk": {
    "title": "Datenträgerbereinigung",
    "desc": "Gelöschte Dateien landen nicht im Papierkorb und lassen sich nicht zurückholen. Zanrei misst zuerst und entfernt nur, was du ankreuzt.",
    "software": "Software entfernen",
    "nothing": "Gerade gibt es nichts zu bereinigen.",
    "measure": "Neu messen",
    "selected": "{{size}} ausgewählt",
    "run": "Ausgewählte löschen",
    "confirmTitle": "Diese Dateien endgültig löschen?",
    "confirmBody": "Das lässt sich nicht rückgängig machen. Dateien, die gerade verwendet werden, werden übersprungen.",
    "done": "{{size}} freigegeben",
    "item": {
      "temp": {
        "name": "Temporäre Dateien",
        "desc": "Arbeitsdateien, die Programme in deinem Temp-Ordner hinterlassen haben."
      },
      "windows_temp": {
        "name": "Temporäre Windows-Dateien",
        "desc": "Arbeitsdateien im Temp-Ordner des Systems."
      },
      "crash_dumps": {
        "name": "Absturzabbilder und Fehlerberichte",
        "desc": "Speicherabbilder und Berichte, die Windows nach Abstürzen gespeichert hat."
      },
      "update_cache": {
        "name": "Heruntergeladene Windows-Updates",
        "desc": "Updatedateien, die Windows bereits installiert hat. Bei Bedarf lädt Windows sie erneut herunter."
      },
      "delivery_cache": {
        "name": "Cache der Übermittlungsoptimierung",
        "desc": "Update-Teile, die zum Teilen mit anderen PCs aufbewahrt werden."
      },
      "browser_cache": {
        "name": "Browser-Caches",
        "desc": "Seiten-Caches von Edge, Chrome, Brave und Firefox. Schließe vorher den Browser. Seiten laden einmalig etwas langsamer, bis sich der Cache wieder füllt."
      },
      "recycle_bin": {
        "name": "Papierkorb",
        "desc": "Alles im Papierkorb, auf allen Laufwerken."
      }
    }
  },
  "logs": {
    "copy": "Kopieren",
    "copied": "In die Zwischenablage kopiert",
    "openFolder": "Ordner öffnen",
    "clear": "Leeren",
    "filter": "Nach Stufe filtern",
    "empty": "Noch nichts protokolliert.",
    "level": {
      "all": "Alle",
      "Info": "Info",
      "Warn": "Warnungen",
      "Error": "Fehler"
    }
  },
  "settings": {
    "general": "Allgemein",
    "language": "Sprache",
    "automation": "Wie viel Zanrei selbst erledigt",
    "background": "Hintergrund",
    "runInBackground": "Im Hintergrund weiterlaufen",
    "runInBackgroundDesc": "Beim Schließen des Fensters verschwindet Zanrei in den Infobereich, statt sich zu beenden.",
    "startWithWindows": "Mit Windows starten",
    "startWithWindowsDesc": "Startet bei der Anmeldung unauffällig im Infobereich.",
    "updates": "Updates",
    "version": "Version {{version}}",
    "lastChecked": "Zuletzt geprüft {{when}}",
    "checkNow": "Jetzt prüfen",
    "checking": "Wird geprüft…",
    "autoUpdate": "Updates automatisch installieren",
    "autoUpdateDesc": "Zanrei lädt neue Versionen selbst herunter und installiert sie, nie während ein Spiel läuft. Schalte es aus, um vorher gefragt zu werden.",
    "updateAvailable": "Version {{version}} ist verfügbar",
    "updateTo": "Auf {{version}} aktualisieren",
    "upToDate": "Du bist auf dem neuesten Stand.",
    "updateFailed": "Suche nach Updates fehlgeschlagen.",
    "install": "Installieren und neu starten",
    "installing": "Wird installiert…",
    "tools": "Werkzeuge",
    "quit": "Zanrei beenden",
    "quitDesc": "Schließt die App vollständig, einschließlich der Überwachung im Hintergrund."
  },
  "os": {
    "flavor": {
      "title": "{{name}} {{version}} erkannt",
      "badgeHint": "{{name}} ist ein modifiziertes Windows",
      "body": "Auf diesem PC läuft ein modifiziertes Windows. Viele Einstellungen von Zanrei sind vielleicht schon aktiv, weil {{name}} sie gesetzt hat, und jeder Schalter zeigt, wie Windows gerade eingestellt ist.",
      "keep": "Zanrei ändert nur, was {{name}} unberührt gelassen hat, und jede Änderung lässt sich weiterhin unter Wiederherstellen rückgängig machen.",
      "restore": "Wiederherstellungspunkte brauchen den Computerschutz. Ist er aus, schaltet Zanrei ihn für das Systemlaufwerk ein, bevor es etwas ändert.",
      "own": "Ändere die Einstellungen, die {{name}} verwaltet, in den eigenen Werkzeugen von {{name}}, nicht hier, damit sich die beiden nicht gegenseitig rückgängig machen.",
      "docs": "Dokumentation von {{name}}"
    },
    "win10": {
      "title": "Windows 10 bekommt keine kostenlosen Sicherheitsupdates mehr",
      "body": "Microsoft hat den regulären Support für Windows 10 am 14. Oktober 2025 beendet. Der PC funktioniert weiter, aber neu entdeckte Sicherheitslücken werden nicht mehr kostenlos behoben. Wenn er Windows 11 ausführen kann, ist der Umstieg die sicherere Wahl.",
      "guide": "Ratgeber lesen",
      "microsoft": "Ankündigung von Microsoft"
    }
  },
  "guide": {
    "tab": {
      "yourself": "Selbst erledigen",
      "fresh": "Neu anfangen"
    },
    "link": {
      "nvidia": "NVIDIA-Treiber",
      "amd": "AMD-Treiber",
      "intel": "Intel-Treiber",
      "atlasDrivers": "Treiberanleitung",
      "crystaldiskinfo": "CrystalDiskInfo",
      "hwinfo": "HWiNFO",
      "atlasXmp": "Schritt-für-Schritt-Anleitung",
      "atlasRebar": "Schritt-für-Schritt-Anleitung",
      "site": "Website",
      "docs": "Installationsanleitung",
      "github": "GitHub",
      "youtube": "Videos auf YouTube",
      "win10Ended": "Support für Windows 10 beendet",
      "requirements": "Voraussetzungen für Windows 11",
      "mediaHelp": "Anleitung von Microsoft",
      "win11": "Windows 11 herunterladen",
      "win10": "Windows 10 herunterladen",
      "rufus": "Rufus"
    },
    "goto": {
      "graphics": "Grafik öffnen",
      "startup": "Autostart öffnen",
      "library": "Bibliothek öffnen"
    },
    "impact": {
      "big": "Große Wirkung",
      "medium": "Mittlere Wirkung",
      "small": "Kleine Wirkung"
    },
    "effort": {
      "easy": "Einfach",
      "medium": "Etwas Sorgfalt nötig",
      "careful": "Vorsicht"
    },
    "yourself": {
      "intro": "Zanrei kann ändern, was Windows tut, aber einige der größten Verbesserungen liegen außerhalb von Windows: im BIOS, in der Hardware, in den Treibern und in deinen Spielen. Diese Schritte erledigst du selbst. Fang oben an, die ersten Gruppen sind die einfachsten.",
      "honest": "Wie viel jeder Schritt bringt, hängt von deinem PC ab. Wir haben sie nicht gemessen, die Angaben zur Wirkung sind also unsere Einschätzung, keine Messung."
    },
    "group": {
      "games": {
        "title": "In deinen Spielen",
        "desc": "Meist der schnellste Weg zu mehr Bildern pro Sekunde."
      },
      "windows": {
        "title": "In Windows",
        "desc": "Einstellungen, die Zanrei nicht für dich ändern kann oder sollte."
      },
      "drivers": {
        "title": "Treiber",
        "desc": "Die Software, mit der Windows deine Hardware richtig nutzt."
      },
      "hardware": {
        "title": "Hardware",
        "desc": "Braucht einen Schraubenzieher, einen Kauf oder beides."
      },
      "bios": {
        "title": "Im BIOS",
        "desc": "Einstellungen in der Firmware des PCs, noch bevor Windows startet. Ändere nur die hier genannten."
      }
    },
    "items": {
      "game_settings": {
        "title": "Senke die Einstellungen, die am meisten Bilder kosten",
        "why": "Der schnellste Weg zu mehr FPS liegt fast immer im Spiel, nicht in Windows.",
        "s1": "Stelle das Spiel auf Vollbild (bei neueren Spielen Rahmenlos) in der nativen Auflösung deines Bildschirms.",
        "s2": "Wenn das Spiel einen Upscaler bietet (DLSS, FSR oder XeSS), schalte ihn ein und setze die Renderskalierung auf etwa 75 bis 85 Prozent.",
        "s3": "Senke zuerst Schatten, Nebel- bzw. Volumeneffekte, Spiegelungen und Sichtweite. Sie kosten am meisten bei kaum sichtbarem Unterschied. Danach kommt die Kantenglättung.",
        "s4": "Setze eine Bildratenbegrenzung (zum Beispiel auf die Bildwiederholrate deines Bildschirms), damit der PC nicht ohne Nutzen voll ausgelastet läuft. Schalte V-Sync aus, wenn sich das Spiel träge anfühlt.",
        "s5": "Ändere immer nur eine Sache und beobachte einen FPS-Zähler (Steam: Einstellungen, Im Spiel, FPS-Anzeige im Spiel), um zu sehen, was wirklich geholfen hat."
      },
      "laptop_power": {
        "title": "Laptops: Netzteil anschließen und den richtigen Energiemodus wählen",
        "why": "Im Akkubetrieb bremst ein Laptop Prozessor und Grafikkarte stark aus. Ohne Netzteil zu spielen kann einen großen Teil der Leistung kosten.",
        "s1": "Schließe das Netzteil an, das mit dem Laptop geliefert wurde.",
        "s2": "Windows 11: Öffne Einstellungen, System, Netzbetrieb und Akku und setze den Energiemodus auf Beste Leistung. Windows 10: Klicke auf das Akkusymbol in der Taskleiste und schiebe den Regler auf Beste Leistung.",
        "s3": "Der Game Boost von Zanrei wechselt den Energiesparplan ebenfalls, solange ein Spiel läuft, und stellt ihn danach zurück."
      },
      "refresh_rate": {
        "title": "Stelle deinen Monitor auf die höchste Bildwiederholrate",
        "why": "Viele Bildschirme, die mit 120, 144 oder 240 Hz verkauft werden, laufen mit 60 Hz, bis du es änderst. Spiele und Desktop fühlen sich mit der echten Rate flüssiger an, und es kostet nichts.",
        "s1": "Öffne Einstellungen, System, Bildschirm, Erweiterte Anzeige.",
        "s2": "Wähle deinen Monitor und öffne dann Bildwiederholfrequenz auswählen.",
        "s3": "Wähle den höchsten Wert und klicke auf Änderungen beibehalten.",
        "s4": "Fehlt der höchste Wert, probiere ein anderes Kabel (DisplayPort oder ein neueres HDMI-Kabel) und installiere den Grafiktreiber."
      },
      "oem_software": {
        "title": "Entferne die Testsoftware und Zusatzhelfer des Herstellers",
        "why": "Neue PCs kommen oft mit Test-Antivirus (McAfee, Norton), \"PC-Booster\"-Tools und Hilfsprogrammen, die ständig laufen. Die Bereinigungsseite von Zanrei entfernt die mitgelieferten Apps von Windows, aber nicht diese.",
        "s1": "Öffne Einstellungen, Apps, Installierte Apps.",
        "s2": "Suche nach Test-Antivirus, \"Booster\"- oder \"Optimizer\"-Tools und Hilfsprogrammen des Herstellers, die du nie benutzt.",
        "s3": "Deinstalliere sie. Die eingebaute, kostenlose Windows-Sicherheit reicht für die meisten Menschen aus.",
        "s4": "Prüfe danach die Autostart-Seite von Zanrei auf Überreste.",
        "caution": "Behalte die Treiber- und Firmware-Updater des Herstellers, wenn du nicht weißt, was sie tun, und entferne nicht dein einziges Antivirenprogramm."
      },
      "browser": {
        "title": "Mach den Browser schlanker",
        "why": "Auf einem PC mit wenig Arbeitsspeicher ist der Browser meist der größte Speicherverbraucher.",
        "s1": "Öffne die Einstellungen des Browsers, suche nach Speicher sparen (Chrome) oder Ruhende Tabs (Edge) und schalte es ein.",
        "s2": "Öffne die Liste der Erweiterungen und entferne die, die du nicht benutzt. Jede läuft in jedem Tab.",
        "s3": "Schließe Tabs, die du nicht liest. Lege stattdessen Lesezeichen an.",
        "s4": "Lass beim Spielen keinen Browser mit vielen Tabs offen."
      },
      "overlays": {
        "title": "Schalte Overlays aus, die du nicht nutzt",
        "why": "Die Overlays von Discord, Steam, NVIDIA und Xbox klinken sich in jedes Spiel ein. Jedes kostet ein wenig und verursacht manchmal Ruckler oder Abstürze.",
        "s1": "Discord: Benutzereinstellungen, Spiel-Overlay, ausschalten.",
        "s2": "Steam: Einstellungen, Im Spiel, Steam-Overlay im Spiel aktivieren ausschalten (für einzelne Spiele kannst du es weiterhin einschalten).",
        "s3": "NVIDIA App oder GeForce Experience: Einstellungen, das In-Game-Overlay ausschalten. Die Aufnahme der Xbox Game Bar wird auf der Gaming-Seite von Zanrei behandelt."
      },
      "gpu_driver": {
        "title": "Installiere den richtigen Grafiktreiber",
        "why": "Neue Treiber beheben Fehler in Spielen und machen vieles schneller. Ein sehr alter Treiber oder der einfache \"Microsoft Basic Display Adapter\" lässt viel Leistung ungenutzt.",
        "s1": "Öffne in Zanrei die Seite Grafik. Sie zeigt deine Karte, wie alt ihr Treiber ist, und einen Link zur Downloadseite des Herstellers.",
        "s2": "Lade den Treiber für dein genaues Modell bei NVIDIA, AMD oder Intel herunter, nicht über ein \"Treiber-Updater\"-Tool.",
        "s3": "Starte das Installationsprogramm. Bei NVIDIA wählst du Benutzerdefiniert und kreuzt Neuinstallation durchführen an. AMD hat eine ähnliche Option zum Zurücksetzen auf Werkseinstellungen.",
        "s4": "Starte den PC neu, wenn das Installationsprogramm darum bittet.",
        "caution": "Bei Laptops ist der Treiber des Laptop-Herstellers die sichere Wahl. Der allgemeine Treiber des Chipherstellers lässt sich manchmal nicht installieren oder schaltet Funktionen ab."
      },
      "chipset": {
        "title": "Installiere den Chipsatztreiber",
        "why": "Windows nutzt für die Hauptplatine zunächst allgemeine Treiber. Der Chipsatztreiber des Herstellers sorgt für das richtige Energie- und Leistungsverhalten deines Prozessors.",
        "s1": "Finde dein Mainboard- oder Laptopmodell: Drücke Win + R, gib msinfo32 ein und lies Produkt der Hauptplatine (oder Systemmodell).",
        "s2": "Öffne die Supportseite des Mainboard- oder Laptopherstellers bzw. von AMD oder Intel für den Chipsatztreiber.",
        "s3": "Lade den Chipsatztreiber herunter, installiere ihn und starte neu."
      },
      "disk_health": {
        "title": "Prüfe, ob das Laufwerk gesund ist",
        "why": "Ein sterbendes Laufwerk lässt den ganzen PC hängen und einfrieren, und früher oder später verliert es Daten.",
        "s1": "Installiere CrystalDiskInfo (kostenlos) und öffne es.",
        "s2": "Gut ist in Ordnung. Vorsicht oder Schlecht heißt: jetzt sichern und das Laufwerk ersetzen.",
        "s3": "Führe auf einem Laufwerk mit Vorsicht oder Schlecht keine Reparatur- oder Optimierungstools aus, bevor deine Daten sicher sind."
      },
      "cooling": {
        "title": "Entferne den Staub und prüfe die Temperaturen",
        "why": "Ein heißer Prozessor oder eine heiße Grafikkarte bremst sich zum Schutz selbst aus (Thermal Throttling), was genau wie ein langsamer PC wirkt. Ältere Laptops trifft es am häufigsten.",
        "s1": "Installiere HWiNFO (kostenlos), öffne es im Modus Nur Sensoren und spiele oder arbeite dann zehn Minuten, während du die CPU- und GPU-Temperaturen beobachtest.",
        "s2": "Temperaturen, die bei 90 °C oder höher bleiben, oder Taktraten, die unter Last fallen, bedeuten Throttling.",
        "s3": "Schalte den PC aus, zieh den Stecker und blase den Staub mit kurzen Stößen Druckluft aus Lüftern und Lüftungsschlitzen. Halte jeden Lüfter mit einem Zahnstocher fest, damit er sich nicht zu schnell dreht.",
        "s4": "Stelle einen Laptop auf eine harte, ebene Fläche oder einen Ständer, nie aufs Bett oder auf den Schoß. Neue Wärmeleitpaste hilft bei älteren PCs, aber nur, wenn du dir das Öffnen des Kühlers zutraust.",
        "caution": "Das Öffnen eines Laptops kann die Garantie erlöschen lassen."
      },
      "dual_channel": {
        "title": "Nutze zwei Speicherriegel im Dual-Channel",
        "why": "Zwei gleiche Riegel geben dem Prozessor die doppelte Speicherbandbreite eines einzelnen. Mit der integrierten Grafik des Prozessors, die diesen Speicher mitbenutzt, ist das oft das beste Upgrade fürs Geld.",
        "s1": "Öffne den Task-Manager, Leistung, Arbeitsspeicher. Verwendete Steckplätze: 1 von 2 oder 1 von 4 bedeutet ein einzelner Riegel.",
        "s2": "Kaufe einen zweiten Riegel mit gleicher Größe und Geschwindigkeit wie der erste (wenn möglich dasselbe Modell).",
        "s3": "Setze sie in die Steckplätze, die das Handbuch deines Mainboards für Dual-Channel nennt, oft Steckplatz 2 und 4, vom Prozessor aus gezählt.",
        "s4": "Prüfe den Task-Manager erneut und schalte dann XMP oder EXPO ein (siehe Im BIOS).",
        "caution": "Schalte den PC aus und zieh den Stecker, bevor du ihn öffnest. Viele Laptops haben fest verlöteten Speicher, schlag also zuerst dein Modell nach."
      },
      "ram_upgrade": {
        "title": "Rüste Arbeitsspeicher nach, wenn er fast immer voll ist",
        "why": "Wenn der Arbeitsspeicher ausgeht, lagert Windows auf die Festplatte aus und alles ruckelt. Keine Einstellung ersetzt echten Arbeitsspeicher.",
        "s1": "Beobachte die Speicheranzeige in der Übersicht von Zanrei, während du arbeitest oder spielst. Meist über etwa 85 Prozent heißt: Es ist zu wenig.",
        "s2": "Finde den Typ und das Maximum für deinen PC heraus: Suche nach deinem Modell und \"RAM-Upgrade\" oder nutze die Kompatibilitätsseite des Herstellers.",
        "s3": "8 GB sind heute das praktische Minimum. 16 GB sind für Spiele angenehm.",
        "caution": "Viele dünne Laptops lassen sich nicht aufrüsten."
      },
      "ssd": {
        "title": "Bringe Windows auf eine SSD",
        "why": "Startet Windows von einer Festplatte (HDD), kommt nichts anderes auch nur annähernd an diesen Schritt heran. Hochfahren, Programme öffnen und Spiele laden werden alle viel schneller.",
        "s1": "Öffne den Task-Manager, Leistung, Datenträger. Dort steht der Typ, und die Übersicht von Zanrei zeigt ihn ebenfalls.",
        "s2": "Wähle eine SATA- oder NVMe-SSD, die dein PC unterstützt (siehe Handbuch deines Modells). 256 GB reichen für Windows und ein paar Programme.",
        "s3": "Am saubersten ist es, zu sichern, die SSD einzubauen und neu zu installieren (siehe Neu anfangen). Das Klonen der alten Platte geht auch, nimmt aber ihren Ballast mit.",
        "s4": "Behalte die alte Platte als zusätzlichen Speicher oder baue sie aus.",
        "caution": "Sichere zuerst. Eine Neuinstallation löscht das Laufwerk, auf dem sie installiert wird."
      },
      "xmp": {
        "title": "Schalte XMP oder EXPO ein, damit dein Speicher mit seiner Nenngeschwindigkeit läuft",
        "why": "Arbeitsspeicher wird oft mit einer Geschwindigkeit verkauft, läuft aber langsamer, bis im BIOS ein Profil eingeschaltet wird. Am meisten zählt das bei PCs mit der integrierten Grafik des Prozessors, die diesen Speicher mitbenutzt, und bei AMD Ryzen.",
        "s1": "Öffne den Task-Manager, Leistung, Arbeitsspeicher und notiere die Geschwindigkeit. Vergleiche sie mit der auf den Riegeln aufgedruckten (zum Beispiel 3200 oder 6000).",
        "s2": "Starte den PC neu und drücke beim Start die BIOS-Taste, meist Entf oder F2. Der Logo-Bildschirm zeigt oft, welche.",
        "s3": "Suche die Einstellung XMP (Intel), EXPO oder DOCP (AMD) oder AI Overclock Tuner. Sie steht meist auf der ersten Übertaktungs- oder Tweaker-Seite.",
        "s4": "Wähle Profil 1, speichere und beende (meist F10).",
        "s5": "Prüfe zurück in Windows erneut den Task-Manager. Die Geschwindigkeit sollte jetzt zu den Riegeln passen.",
        "caution": "Die meisten PCs starten problemlos. Wenn deiner nicht startet, schalte ihn aus, halte den Ein-/Ausschalter zehn Sekunden gedrückt und versuche es erneut. Die meisten Mainboards fallen nach einem fehlgeschlagenen Start auf sichere Werte zurück. Laptops und viele Büro-PCs haben diese Einstellung gar nicht, und das ist normal."
      },
      "rebar": {
        "title": "Schalte Resizable BAR ein",
        "why": "Damit kann der Prozessor auf den gesamten Grafikspeicher auf einmal zugreifen. Der Gewinn ist klein und je nach Spiel verschieden, aber kostenlos, wo es unterstützt wird (etwa Grafikkarten ab 2020 mit passendem Prozessor).",
        "s1": "Prüfe die Unterstützung: Das kostenlose Tool GPU-Z zeigt ein Feld Resizable BAR, oder sieh auf der Seite des Grafikkartenherstellers nach.",
        "s2": "Schalte im BIOS zuerst Above 4G Decoding ein, dann Re-Size BAR Support. Die Namen unterscheiden sich je nach Hersteller etwas.",
        "s3": "Speichern, neu starten und in GPU-Z erneut prüfen.",
        "s4": "Dafür muss Windows im UEFI-Modus installiert sein (nicht Legacy oder CSM).",
        "caution": "Aktualisiere zuerst den Grafiktreiber. BIOS-Einstellungen zu ändern, die du nicht verstehst, kann dazu führen, dass der PC nicht mehr startet, also ändere nur die hier genannten."
      }
    },
    "fresh": {
      "title": "Warum neu anfangen",
      "intro": "Bei einem Neuanfang wird das Systemlaufwerk gelöscht und ein neues Windows darauf installiert. Danach lässt sich nichts rückgängig machen, aber ein sauberes Windows ist der beste Ausgangspunkt überhaupt und kann Dinge, die keine App auf einem laufenden Windows schafft.",
      "gain": {
        "clean": "Keine Altlasten: Jahre an installierten und halb entfernten Programmen, alte Treiber, Hintergrunddienste und eventuelle Schadsoftware sind weg.",
        "bloat": "Kein Hersteller-Ballast: Du installierst Windows aus Microsofts eigenem Abbild, nicht aus dem vom Hersteller angepassten.",
        "components": "Teile, die sich aus einem laufenden Windows nicht entfernen lassen. Projekte wie AtlasOS wenden ihre Änderungen direkt nach der Installation an, bevor etwas von diesen Teilen abhängt.",
        "layout": "Eine korrekte Laufwerksaufteilung: modernes UEFI, das System auf dem schnellsten Laufwerk, nichts übrig von einer alten MBR-Einrichtung.",
        "known": "Ein bekannter Zustand. Es ist leichter zu erkennen, was die Leistung wirklich verändert hat, wenn alles vom selben Punkt ausgeht."
      },
      "warning": "Ein Neuanfang ist freiwillig. Zanrei arbeitet mit deinem aktuellen Windows, und alles, was es tut, lässt sich rückgängig machen. Eine Neuinstallation nicht."
    },
    "atlas": {
      "title": "AtlasOS",
      "badge": "Für Enthusiasten",
      "intro": "Ein Open-Source-Projekt (etwa 22.000 Sterne auf GitHub), das ein frisches Windows 11 auf geringere Latenz, weniger Hintergrundprozesse und weniger Telemetrie abstimmt. Es wird nach einer sauberen Windows-Installation mit einem kleinen Installer namens AME Wizard angewendet, und das angewendete Playbook ist Open Source und für jeden lesbar. Es wird von anderen Leuten entwickelt, und Zanrei steht in keiner Verbindung dazu. Die neueste Version zum Zeitpunkt des Schreibens ist v0.5.0.",
      "fact": {
        "w11": "Es braucht Windows 11 (zum Zeitpunkt des Schreibens 24H2 oder 25H2). Windows 10 unterstützt Atlas nicht mehr.",
        "pro": "Verwende Windows Pro oder Enterprise. Windows Home wird nicht unterstützt.",
        "revert": "Atlas zu entfernen heißt, Windows neu zu installieren.",
        "security": "Bei Atlas wählst du, wie viel Sicherheit erhalten bleibt, zum Beispiel Defender und Windows Update. Lies vor der Entscheidung die Sicherheitsseite von Atlas.",
        "unofficial": "Zanrei hat Atlas nicht gemessen. Die Ergebnisse unterscheiden sich von PC zu PC."
      },
      "videos": "Viele Leute haben Vorher-nachher-Tests aufgenommen, eine Suche nach AtlasOS auf YouTube zeigt also, wie es sich auf PCs wie deinem verhält. Sei mit einzelnen Videos vorsichtig.",
      "others": "Es gibt ähnliche Projekte, zum Beispiel"
    },
    "win10": {
      "title": "Windows 10 oder 11?",
      "body": "Microsoft hat die kostenlosen Sicherheitsupdates für Windows 10 am 14. Oktober 2025 eingestellt. Erfüllt dein PC die Voraussetzungen für Windows 11, installiere Windows 11. Wenn nicht, läuft ein frisches Windows 10 weiterhin, aber halte den Browser aktuell, meide riskante Downloads und plane den Austausch des PCs. Die Seite von Microsoft nennt mögliche kostenpflichtige erweiterte Updates."
    },
    "install": {
      "title": "So installierst du Windows neu (10 oder 11)",
      "intro": "Die Schritte sind für beide gleich. Plane ein bis zwei Stunden ein und schalte den PC während der Installation nicht aus.",
      "atlasNote": "Wenn du AtlasOS willst, hör nach dem ersten Start auf und folge ab da der eigenen Installationsanleitung von Atlas. Ihre Schritte ändern sich zwischen Versionen, nimm also die aktuellen.",
      "step": {
        "backup": {
          "title": "Sichere, was wichtig ist",
          "body": "Kopiere Dokumente, Fotos, Spielstände und Browser-Lesezeichen auf ein externes Laufwerk oder in einen Cloudspeicher. Notiere Lizenzschlüssel für gekaufte Programme. Alles auf dem Systemlaufwerk wird gelöscht."
        },
        "activation": {
          "title": "Prüfe, ob Windows aktiviert ist",
          "body": "Öffne Einstellungen, System, Aktivierung. \"Mit einer digitalen Lizenz aktiviert\" bedeutet, dass sich Windows nach der Neuinstallation selbst aktiviert. Eventuell musst du dich mit demselben Microsoft-Konto anmelden."
        },
        "drivers": {
          "title": "Lade zuerst die Treiber herunter",
          "body": "Lade auf einem anderen Gerät den Netzwerktreiber (WLAN oder Ethernet) für dein Mainboard oder deinen Laptop herunter und speichere ihn auf einem USB-Stick. Ohne ihn hat das neue Windows vielleicht kein Internet. Lade auch den Grafiktreiber herunter."
        },
        "media": {
          "title": "Hol dir Windows von Microsoft",
          "body": "Nutze das Media Creation Tool von Microsoft und wähle Installationsmedien erstellen mit einem USB-Stick ab 8 GB (er wird gelöscht). Oder lade die ISO-Datei herunter und schreibe sie mit Rufus auf den Stick."
        },
        "boot": {
          "title": "Vom USB-Stick starten",
          "body": "Starte neu und drücke beim Start die Taste für das Bootmenü, oft F12, F11, F8, Esc oder Entf. Der Logo-Bildschirm des Herstellers zeigt sie meist an. Wähle den USB-Stick, am besten den Eintrag, der mit UEFI beginnt."
        },
        "setup": {
          "title": "Installationsprogramm ausführen",
          "body": "Wähle die Sprache, dann Jetzt installieren. \"Ich habe keinen Product Key\" ist in Ordnung, wenn Windows vorher aktiviert war. Wähle dieselbe Edition wie zuvor (Pro oder Home), akzeptiere die Lizenzbedingungen und wähle Benutzerdefiniert: nur Windows installieren."
        },
        "drive": {
          "title": "Laufwerk wählen",
          "body": "Wähle das Laufwerk, auf das Windows soll. Um es komplett zu leeren, lösche seine Partitionen, wähle den nicht zugewiesenen Speicherplatz und klicke auf Weiter. Fass keine Laufwerke an, auf denen deine Dateien liegen. Ihre Größen helfen, sie zu unterscheiden."
        },
        "firstrun": {
          "title": "Erster Start",
          "body": "Windows startet einige Male neu. Wähle Region und Tastatur und verbinde dich mit dem Netzwerk, bei Bedarf mit dem Treiber vom USB-Stick. Windows 11 fordert dich auf, dich mit einem Microsoft-Konto anzumelden."
        },
        "update": {
          "title": "Aktualisieren und Treiber installieren",
          "body": "Führe Windows Update aus, bis nichts mehr übrig ist, installiere dann Chipsatz- und Grafiktreiber und starte neu."
        },
        "zanrei": {
          "title": "Dann Zanrei installieren",
          "body": "Starte die Einrichtung von Zanrei. Sie erstellt einen Wiederherstellungspunkt, wendet die passenden Einstellungen für deinen PC an und zeigt, was noch zu tun ist."
        }
      }
    }
  },
  "tweaks": {
    "telemetry": {
      "name": "Diagnosedaten reduzieren",
      "desc": "Bittet Windows, nur die minimal erforderlichen Diagnosedaten zu senden, und stoppt Feedback-Abfragen."
    },
    "advertising_id": {
      "name": "Werbe-ID ausschalten",
      "desc": "Verhindert, dass Apps eine benutzerbezogene ID für personalisierte Werbung verwenden."
    },
    "tailored_experiences": {
      "name": "Maßgeschneiderte Erfahrungen ausschalten",
      "desc": "Verhindert, dass Windows deine Diagnosedaten für Tipps und Werbung nutzt."
    },
    "activity_history": {
      "name": "Aktivitätsverlauf ausschalten",
      "desc": "Verhindert, dass Windows die geöffneten Apps und Dateien sammelt und hochlädt."
    },
    "suggestions": {
      "name": "Vorschläge und Werbung entfernen",
      "desc": "Blendet beworbene Apps und Tipps in Start, Einstellungen und auf dem Sperrbildschirm aus und blockiert stille App-Installationen."
    },
    "web_search": {
      "name": "Nur auf diesem PC suchen",
      "desc": "Entfernt Webergebnisse aus der Suche im Startmenü, damit sie schneller und privater ist."
    },
    "consumer_features": {
      "name": "Installation beworbener Apps blockieren",
      "desc": "Verhindert, dass Windows nach der Einrichtung oder Updates gesponserte Apps wie Spiele installiert."
    },
    "delivery_optimization": {
      "name": "Updates nicht an andere PCs hochladen",
      "desc": "Windows lädt Updates nur noch von Microsoft, statt sie über deine Verbindung zu teilen."
    },
    "telemetry_tasks": {
      "name": "Geplante Telemetrie-Aufgaben deaktivieren",
      "desc": "Schaltet die Hintergrundaufgaben ab, die Kompatibilitäts- und Nutzungsdaten sammeln."
    },
    "diagnostic_services": {
      "name": "Telemetriedienste deaktivieren",
      "desc": "Stoppt die Dienste Benutzererfahrung und Telemetrie im verbundenen Modus sowie den Push-Nachrichtendienst. Wirkt nach einem Neustart."
    },
    "location": {
      "name": "Ortungsdienste ausschalten",
      "desc": "Sperrt den Standortzugriff für alle Apps. Karten und Mein Gerät suchen funktionieren dann nicht."
    },
    "background_apps": {
      "name": "Store-Apps nicht im Hintergrund laufen lassen",
      "desc": "Spart Arbeitsspeicher und Akku auf älteren PCs. Geschlossene Store-Apps aktualisieren dann keine Kacheln oder Benachrichtigungen."
    },
    "error_reporting": {
      "name": "Windows-Fehlerberichterstattung ausschalten",
      "desc": "Verhindert, dass Absturzberichte gesammelt und gesendet werden. Die eingebaute Absturzdiagnose geht dabei verloren."
    },
    "windows_ai": {
      "name": "Copilot und Recall ausschalten",
      "desc": "Deaktiviert die Copilot-Schaltfläche und die KI-Datenanalyse, die Schnappschüsse deines Bildschirms macht."
    },
    "animations": {
      "name": "Animationen reduzieren",
      "desc": "Schaltet die meisten Fensteranimationen und Menüverzögerungen ab, damit ältere PCs schneller wirken. Zum Übernehmen abmelden."
    },
    "transparency": {
      "name": "Transparenzeffekte ausschalten",
      "desc": "Entfernt die durchscheinende Unschärfe von Fenstern und Taskleiste, was bei älteren Karten Grafikleistung spart."
    },
    "startup_delay": {
      "name": "Startverzögerung entfernen",
      "desc": "Windows wartet, bevor es Autostart-Programme startet. So starten sie direkt nach der Anmeldung."
    },
    "edge_background": {
      "name": "Edge nicht im Hintergrund laufen lassen",
      "desc": "Verhindert, dass Edge vorlädt und nach dem Schließen im Speicher bleibt. Edge zeigt eventuell den Hinweis \"Von Ihrer Organisation verwaltet\"."
    },
    "sysmain": {
      "name": "SysMain (Superfetch) ausschalten",
      "desc": "Stoppt das Vorladen von Apps in den Arbeitsspeicher. Hilft auf manchen Systemen, wird aber nur für SSDs empfohlen; bei Festplatten anlassen."
    },
    "search_indexing": {
      "name": "Suchindizierung ausschalten",
      "desc": "Stoppt den Indexer im Hintergrund. Spart Plattenaktivität auf alten Festplatten, aber die Dateisuche wird langsamer."
    },
    "hibernation": {
      "name": "Ruhezustand ausschalten",
      "desc": "Löscht die Ruhezustandsdatei und gibt mehrere Gigabyte frei. Schaltet auch den Schnellstart aus."
    },
    "high_performance_plan": {
      "name": "Energiesparplan Höchstleistung verwenden",
      "desc": "Hält den Prozessor bei voller Geschwindigkeit bereit. Verbraucht mehr Strom; nicht ideal für Laptops im Akkubetrieb."
    },
    "svchost_split": {
      "name": "Windows-Dienste in weniger Prozessen bündeln",
      "desc": "Ab 3,5 GB RAM führt Windows jeden Dienst in einem eigenen Prozess aus. Sie wieder zu bündeln spart Arbeitsspeicher und Dutzende Hintergrundprozesse auf PCs mit 4 bis 8 GB. Neustart nötig."
    },
    "power_throttling": {
      "name": "Energiedrosselung ausschalten",
      "desc": "Verhindert, dass Windows Hintergrundprogramme zum Stromsparen verlangsamt. Kann älteren Desktop-PCs helfen; verbraucht auf Laptops mehr Akku. Neustart nötig."
    },
    "multimedia_scheduler": {
      "name": "Spielen Vorrang vor Medien im Hintergrund geben",
      "desc": "Senkt den Anteil der Prozessorzeit, den Windows für Multimedia im Hintergrund reserviert, von 20 % auf 10 %, sodass mehr davon ans Spiel geht."
    },
    "foreground_priority": {
      "name": "Das verwendete Programm bevorzugen",
      "desc": "Gibt dem vorderen Fenster kürzere Zeitscheiben und den größten Prioritätsschub, damit es auf einem ausgelasteten älteren PC flüssiger reagiert."
    },
    "vbs_off": {
      "name": "Speicher-Integrität (VBS) ausschalten",
      "desc": "Windows kann Teile von sich aus Sicherheitsgründen in einer virtuellen Maschine ausführen. Auf manchen PCs kostet das Bilder in Spielen. Es entfernt auch eine Schutzschicht gegen Schadsoftware: nur für einen PC, den du vor allem zum Spielen nutzt. Neustart nötig."
    },
    "game_mode": {
      "name": "Spielmodus einschalten",
      "desc": "Lässt Windows das laufende Spiel gegenüber Hintergrundaufgaben bevorzugen."
    },
    "game_dvr": {
      "name": "Spielaufnahme im Hintergrund ausschalten",
      "desc": "Verhindert, dass die Xbox Game Bar im Hintergrund aufnimmt, was Bilder kostet."
    },
    "windowed_optimizations": {
      "name": "Optimierungen für Spiele im Fenstermodus",
      "desc": "Verbessert die Latenz und ermöglicht Funktionen wie Auto HDR in rahmenlosen und Fensterspielen (Windows 11 22H2+)."
    },
    "vrr": {
      "name": "Variable Bildwiederholrate für Spiele im Fenster",
      "desc": "Lässt G-SYNC- und FreeSync-Monitore in Fensterspielen synchronisieren (Windows 11 22H2+). Benötigt einen unterstützten Monitor."
    },
    "hags": {
      "name": "Hardwarebeschleunigte GPU-Planung",
      "desc": "Lässt die Grafikkarte ihren eigenen Speicher verwalten. Hilft manchen Spielen, schadet anderen. Braucht einen aktuellen GPU-Treiber und einen Neustart."
    },
    "fullscreen_optimizations": {
      "name": "Vollbildoptimierungen überall deaktivieren",
      "desc": "Führt Spiele in echtem exklusivem Vollbild aus. Manche Spiele reagieren schneller, andere schlechter. Du kannst das auch pro Spiel festlegen."
    },
    "mouse_precision": {
      "name": "Zeigerbeschleunigung ausschalten",
      "desc": "Lässt den Mauszeiger deiner Hand 1:1 folgen, wie es die meisten Shooter erwarten. Zum Übernehmen abmelden."
    },
    "sticky_keys": {
      "name": "Tastenkombinationen für Einrastfunktion deaktivieren",
      "desc": "Verhindert das Fenster, das erscheint, wenn du fünfmal Umschalt drückst oder sie gedrückt hältst, was ein Spiel unterbrechen kann."
    },
    "file_extensions": {
      "name": "Dateinamenerweiterungen anzeigen",
      "desc": "Zeigt .exe, .png und so weiter an, sodass getarnte Dateien leichter zu erkennen sind."
    },
    "hidden_files": {
      "name": "Versteckte Dateien anzeigen",
      "desc": "Zeigt versteckte Dateien und Ordner im Datei-Explorer an."
    },
    "end_task": {
      "name": "\"Task beenden\" zum Taskleistenmenü hinzufügen",
      "desc": "Klicke mit der rechten Maustaste auf eine App in der Taskleiste, um sie zu schließen, selbst wenn sie hängt (Windows 11 22H2+)."
    },
    "widgets": {
      "name": "Widgets und Neuigkeiten ausschalten",
      "desc": "Entfernt das Widgets-Panel und den Newsfeed, die Hintergrundprozesse ausführen."
    },
    "long_paths": {
      "name": "Sehr lange Dateipfade erlauben",
      "desc": "Hebt die Pfadgrenze von 260 Zeichen für Apps auf, die das unterstützen."
    },
    "no_auto_reboot": {
      "name": "Keine automatischen Neustarts während der Anmeldung",
      "desc": "Windows Update startet deinen PC nicht neu, solange du angemeldet bist."
    },
    "onedrive_policy": {
      "name": "OneDrive-Dateisynchronisierung stoppen",
      "desc": "Schaltet die Dateisynchronisierung von OneDrive per Richtlinie ab, ohne es zu deinstallieren."
    },
    "edge_debloat": {
      "name": "Hinweise und Werbung in Edge entfernen",
      "desc": "Blendet den Erststart-Bildschirm, den Einkaufsassistenten, Empfehlungen und Rewards von Edge aus. Edge zeigt eventuell den Hinweis \"Von Ihrer Organisation verwaltet\"."
    },
    "remove_edge": {
      "name": "Microsoft Edge entfernen",
      "desc": "Deinstalliert den Browser Edge und verhindert, dass Windows ihn erneut installiert. Die WebView2-Laufzeit, die Apps wie Zanrei brauchen, bleibt erhalten. Das lässt sich in Zanrei nicht rückgängig machen. Stelle zuerst sicher, dass du einen anderen Browser hast."
    },
    "bloat_apps": {
      "name": "Vorinstallierte Apps entfernen",
      "desc": "Deinstalliert die Werbe-Apps aus dem Store, die du in einer Liste ankreuzt (Nachrichten, Wetter, Solitaire, Candy Crush und Ähnliches). Apps, die viele nutzen, etwa Spotify oder Smartphone-Link, sind zunächst nicht angekreuzt. Xbox, Store, Fotos und Rechner stehen nie in der Liste. Das lässt sich in Zanrei nicht rückgängig machen; installiere fehlende Apps erneut aus dem Microsoft Store."
    }
  }
} satisfies Translation<Locale>;
