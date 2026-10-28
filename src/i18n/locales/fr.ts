import type { DeepPartial, Locale } from "./en";

// Translated: the interface core. Anything missing here (newer screens, tweak descriptions) falls back to English.
export default {
  "common": {
    "next": "Suivant",
    "back": "Retour",
    "finish": "Terminer",
    "retry": "Réessayer",
    "cancel": "Annuler",
    "confirm": "Confirmer",
    "close": "Fermer",
    "loading": "Chargement…",
    "search": "Rechercher"
  },
  "setup": {
    "scan": {
      "working": "Analyse en cours…"
    },
    "mode": {
      "title": "Que doit faire Zanrei ?",
      "desc": "Tu peux changer cela à tout moment.",
      "manual": {
        "name": "Manuel",
        "desc": "Rien ne se passe sans ton choix."
      },
      "recommended": {
        "name": "Recommandé",
        "desc": "Zanrei propose des améliorations sûres et tu confirmes chacune."
      },
      "auto": {
        "name": "Automatique",
        "desc": "Zanrei applique lui-même les améliorations sûres, toujours après avoir créé un point de restauration."
      }
    },
    "done": {
      "title": "Tout est prêt",
      "start": "Ouvrir Zanrei"
    }
  },
  "nav": {
    "overview": "Aperçu",
    "restore": "Restaurer",
    "settings": "Paramètres"
  },
  "titlebar": {
    "background": "Envoyer en arrière-plan"
  },
  "overview": {
    "title": "Ton PC",
    "cpu": "Processeur",
    "ram": "Mémoire",
    "gpu": "Graphismes",
    "storage": "Stockage",
    "os": "Système",
    "noGpu": "Aucune carte graphique détectée",
    "cores": "{{physical}} cœurs / {{logical}} threads",
    "tier": {
      "Legacy": "PC ancien",
      "Mainstream": "PC milieu de gamme",
      "High": "PC haute performance"
    }
  },
  "restore": {
    "empty": "Aucun point de restauration pour l'instant.",
    "create": "Créer un point de restauration",
    "creating": "Création…",
    "rollback": "Annuler",
    "rolledBack": "Annulé",
    "openSystem": "Ouvrir la Restauration du système Windows",
    "confirmTitle": "Annuler ce point de restauration ?",
    "confirmBody": "Toutes les modifications enregistrées dans ce point seront annulées.",
    "failed": "Une erreur s'est produite"
  },
  "settings": {
    "language": "Langue"
  }
} satisfies DeepPartial<Locale>;
