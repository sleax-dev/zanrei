import type { Locale, Translation } from "./en";

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
    "remove": "Retirer",
    "search": "Rechercher",
    "delete": "Supprimer"
  },
  "boost": {
    "label": "Boost de jeu",
    "on": "Activé",
    "off": "Désactivé"
  },
  "splash": {
    "tagline": "Windows, optimisé. Chaque changement est réversible.",
    "loading": "Démarrage de Zanrei…"
  },
  "setup": {
    "progress": "Étape {{current}} sur {{total}}",
    "steps": {
      "welcome": "Bienvenue",
      "recommend": "Recommandé",
      "done": "Terminé"
    },
    "welcome": {
      "title": "Bienvenue dans Zanrei",
      "body": "Zanrei règle Windows pour le PC que vous avez vraiment, et chaque modification peut être annulée.",
      "p1": "Un point de restauration Windows est créé avant la première modification.",
      "p2": "Vous voyez ce que fait chaque réglage avant qu'il soit activé.",
      "p3": "Rien n'est envoyé nulle part. Il n'y a pas de compte.",
      "language": "Langue",
      "start": "Commencer"
    },
    "scan": {
      "working": "Analyse en cours…"
    },
    "recommend": {
      "title": "Recommandé pour votre PC",
      "found_many": "{{count}} réglages lui conviennent.",
      "found_one": "{{count}} réglage lui convient.",
      "found_other": "{{count}} réglages lui conviennent.",
      "alreadyOn": "{{count}} autres étaient déjà en place.",
      "pc": "Votre PC",
      "safety": "Un point de restauration est créé d'abord. Vous pouvez tout annuler depuis la page Restauration.",
      "failed": "Zanrei n'a pas pu effectuer une modification, il s'est donc arrêté. Rien d'autre n'a été touché.",
      "skip": "Passer, je choisirai moi-même",
      "applying": "Application de {{done}} sur {{total}}…",
      "apply_many": "Appliquer {{count}} réglages",
      "apply_one": "Appliquer {{count}} réglage",
      "apply_other": "Appliquer {{count}} réglages"
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
      "applied_many": "{{count}} réglages ont été appliqués.",
      "applied_one": "{{count}} réglage a été appliqué.",
      "applied_other": "{{count}} réglages ont été appliqués.",
      "nothing": "Aucune modification n'a été faite.",
      "autoNote": "Désormais, Zanrei applique lui-même les nouvelles recommandations sûres. Ce que vous désactivez reste désactivé. Modifiable dans Paramètres.",
      "manualNote": "Zanrei proposera des améliorations et attendra votre accord. Modifiable dans Paramètres.",
      "start": "Ouvrir Zanrei"
    }
  },
  "nav": {
    "label": "Principal",
    "countLabel": "{{on}} sur {{total}} actifs",
    "newErrors_many": "{{count}} nouvelles erreurs",
    "newErrors_one": "{{count}} nouvelle erreur",
    "newErrors_other": "{{count}} nouvelles erreurs",
    "overview": "Aperçu",
    "privacy": "Confidentialité",
    "performance": "Performances",
    "startup": "Démarrage",
    "gaming": "Jeux",
    "windows": "Windows",
    "cleanup": "Nettoyage",
    "library": "Bibliothèque",
    "graphics": "Graphismes",
    "guide": "Guide",
    "restore": "Restaurer",
    "logs": "Journal",
    "settings": "Paramètres",
    "group": {
      "optimize": "Optimiser",
      "games": "Jeux",
      "tools": "Outils"
    }
  },
  "pageDesc": {
    "privacy": "Empêchez Windows de collecter et de partager plus que nécessaire.",
    "performance": "Rendez un PC ancien ou chargé plus réactif.",
    "startup": "Choisissez les programmes qui démarrent avec Windows. Moins au démarrage, c'est un démarrage plus rapide et plus de mémoire libre.",
    "gaming": "Moins d'interruptions et moins de charge pendant que vous jouez.",
    "windows": "De petits changements dans l'apparence et le comportement de Windows.",
    "cleanup": "Libérez de l'espace disque et retirez les logiciels que vous n'avez pas demandés. Les fichiers supprimés et les programmes retirés ne peuvent pas être récupérés.",
    "library": "Zanrei trouve vos jeux installés et règle Windows pour chacun d'eux.",
    "graphics": "Votre carte graphique et son pilote.",
    "restore": "Chaque modification de Zanrei est enregistrée ici et peut être annulée. Les points de restauration inutiles peuvent être supprimés.",
    "guide": "Ce que vous seul pouvez faire, comme les réglages du BIOS, le matériel et les pilotes, et comment repartir sur un Windows propre.",
    "logs": "Ce que Zanrei a fait et ce qui a mal tourné. Partagez-le quand vous demandez de l'aide.",
    "settings": "Comment Zanrei démarre, se met à jour et se comporte."
  },
  "titlebar": {
    "minimize": "Réduire",
    "close": "Fermer",
    "closeToTray": "Fermer (reste actif en arrière-plan)"
  },
  "toast": {
    "applied_many": "{{count}} réglages appliqués",
    "applied_one": "{{count}} réglage appliqué",
    "applied_other": "{{count}} réglages appliqués",
    "nothingToApply": "Plus rien à appliquer",
    "viewLog": "Voir le journal"
  },
  "restart": {
    "Explorer": "L'Explorateur de fichiers doit redémarrer pour terminer l'application des modifications.",
    "SignOut": "Déconnectez-vous puis reconnectez-vous pour terminer l'application des modifications.",
    "Reboot": "Redémarrez Windows pour terminer l'application des modifications.",
    "because": "En raison de : {{names}}",
    "explorerButton": "Redémarrer l'Explorateur",
    "rebootButton": "Redémarrer maintenant",
    "signOutButton": "Se déconnecter maintenant",
    "signOutTitle": "Se déconnecter de Windows ?",
    "signOutBody": "Vous serez déconnecté immédiatement. Enregistrez d'abord votre travail.",
    "confirmTitle": "Redémarrer Windows ?",
    "confirmBody": "Windows redémarrera dans {{seconds}} secondes. Enregistrez d'abord votre travail. Vous pouvez annuler d'ici là.",
    "countdown": "Redémarrage dans {{seconds}} s…"
  },
  "overview": {
    "title": "Ton PC",
    "loading": "Analyse de votre PC…",
    "tier": {
      "Legacy": "PC ancien",
      "Mainstream": "PC milieu de gamme",
      "High": "PC haute performance"
    },
    "build": "Build {{build}}",
    "os": "Système",
    "cpu": "Processeur",
    "ram": "Mémoire",
    "gpu": "Graphismes",
    "storage": "Stockage",
    "noGpu": "Aucune carte graphique détectée",
    "cores": "{{physical}} cœurs / {{logical}} threads",
    "freeOf": "{{free}} libres sur {{total}}",
    "summaryTodo_many": "{{count}} réglages recommandés sont prêts.",
    "summaryTodo_one": "{{count}} réglage recommandé est prêt.",
    "summaryTodo_other": "{{count}} réglages recommandés sont prêts.",
    "summaryDone": "Tout ce qui est recommandé est déjà activé.",
    "apply": "Appliquer {{count}}",
    "safetyNote": "Un point de restauration est créé d'abord, et chaque modification peut être annulée."
  },
  "live": {
    "title": "En ce moment",
    "desc": "Ces chiffres bougent quand les optimisations font effet. Comparez-les après un redémarrage.",
    "cpu": "Processeur",
    "ram": "Mémoire utilisée",
    "ramTotal": "/ {{total}}",
    "processes": "Processus en cours",
    "startup": "Programmes au démarrage"
  },
  "bloat": {
    "pick": "Seules les applis cochées sont supprimées. Celles que beaucoup utilisent restent décochées.",
    "mayUse": "vous l’utilisez peut-être",
    "none": "Aucune des applis supprimables n’est installée.",
    "remove_many": "Supprimer {{count}} applis",
    "remove_one": "Supprimer {{count}} appli",
    "remove_other": "Supprimer {{count}} applis"
  },
  "optimize": {
    "forThisPc": "Recommandé pour ce PC",
    "more": "Plus d'options",
    "applyAll": "Tout appliquer ({{count}})",
    "empty": "Aucun résultat.",
    "apply": "Appliquer",
    "irreversible": "Irréversible",
    "acknowledge": "Je comprends que cela ne peut pas être annulé",
    "partial": "Appliqué en partie",
    "unavailable": "Indisponible sur ce PC",
    "category": {
      "Privacy": "Confidentialité",
      "Performance": "Performances",
      "Gaming": "Jeux",
      "Interface": "Interface",
      "System": "Système",
      "Cleanup": "Nettoyage"
    },
    "risk": {
      "Safe": "Sûr",
      "Moderate": "Modéré",
      "Advanced": "Avancé"
    },
    "needs": {
      "Explorer": "Redémarre l'Explorateur",
      "SignOut": "Déconnexion requise",
      "Reboot": "Redémarrage requis"
    },
    "confirm": {
      "Safe": "C'est une modification à faible risque.",
      "Moderate": "Cela change le comportement de Windows. Vous pouvez le désactiver ensuite, et un point de restauration est créé d'abord.",
      "Advanced": "C'est une modification avancée. Lisez attentivement la description. Un point de restauration est créé d'abord.",
      "irreversible": "Cela ne peut pas être annulé. Zanrei ne peut pas revenir en arrière, et on ne peut pas compter sur un point de restauration pour le faire."
    }
  },
  "games": {
    "rescan": "Rechercher à nouveau",
    "add": "Ajouter un jeu",
    "scanning": "Recherche de jeux…",
    "empty": "Aucun jeu trouvé pour l'instant. Ajoutez-en un manuellement, ou installez un jeu depuis Steam, Epic, GOG, Xbox, Ubisoft, EA, Battle.net ou Riot.",
    "yourGames": "Vos jeux",
    "optionsOn_many": "{{count}} options activées",
    "optionsOn_one": "{{count}} option activée",
    "optionsOn_other": "{{count}} options activées",
    "found_many": "{{count}} jeux trouvés : {{launchers}}",
    "found_one": "{{count}} jeu trouvé : {{launchers}}",
    "found_other": "{{count}} jeux trouvés : {{launchers}}",
    "removeFromList": "Retirer de la liste",
    "boostTitle": "Game Boost",
    "boostDesc": "Pendant qu'un jeu tourne, Zanrei passe Windows en mode de gestion de l'alimentation Performances élevées, puis revient en arrière quand vous quittez.",
    "boostActive": "Actif : {{game}} est en cours.",
    "boostWaiting": "En attente du lancement d'un jeu.",
    "boostOff": "Désactivé.",
    "driver": "Pilote",
    "driverCheck": "Rechercher des mises à jour",
    "opt": {
      "gpu": {
        "name": "Utiliser le GPU hautes performances",
        "desc": "Indique à Windows d'exécuter ce jeu sur votre carte graphique la plus rapide."
      },
      "fso": {
        "name": "Désactiver les optimisations plein écran",
        "desc": "Peut réduire les saccades ou la latence d'entrée dans certains jeux anciens."
      },
      "priority": {
        "name": "Démarrer avec une priorité processeur élevée",
        "desc": "Donne au jeu plus de temps processeur qu'aux programmes en arrière-plan."
      }
    }
  },
  "graphics": {
    "oldTitle": "Ce pilote a plus de deux ans",
    "oldBody": "Les pilotes récents corrigent des plantages et prennent en charge les nouveaux jeux. Téléchargez le dernier chez le fabricant.",
    "maker": "Fabricant",
    "driverDate": "Date du pilote",
    "memory": "Mémoire vidéo",
    "tuneTitle": "Régler Windows pour le jeu",
    "tuneBody": "La planification GPU, les optimisations pour les jeux fenêtrés et la fréquence d'actualisation variable se trouvent sur la page Jeux.",
    "openGaming": "Ouvrir Jeux"
  },
  "restore": {
    "entryTitle_many": "{{count}} réglages modifiés",
    "entryTitle_one": "{{count}} réglage modifié",
    "entryTitle_other": "{{count}} réglages modifiés",
    "manual": "Point de restauration manuel",
    "empty": "Aucun point de restauration pour l'instant.",
    "create": "Créer un point de restauration",
    "creating": "Création…",
    "rollback": "Annuler",
    "rolledBack": "Annulé",
    "openSystem": "Ouvrir la Restauration du système Windows",
    "confirmTitle": "Annuler ce point de restauration ?",
    "confirmBody": "Toutes les modifications enregistrées dans ce point seront annulées.",
    "failed": "Une erreur s'est produite",
    "deleteTitle": "Supprimer ce point de restauration ?",
    "deleteBody": "Ce qu'il a modifié reste tel quel, mais Zanrei ne pourra plus l'annuler. Le point de restauration Windows correspondant est aussi supprimé.",
    "deleteAll": "Tout supprimer",
    "deleteAllTitle": "Supprimer tous les points de restauration ?",
    "deleteAllBody": "Rien de ce qui a été modifié n'est touché, mais plus rien ne pourra être annulé depuis Zanrei. Les points de restauration Windows correspondants sont aussi supprimés.",
    "deleted_many": "{{count}} points de restauration supprimés",
    "deleted_one": "{{count}} point de restauration supprimé",
    "deleted_other": "{{count}} points de restauration supprimés",
    "windowsKept_many": "{{count}} points de restauration Windows n'ont pas pu être retirés. Retirez-les dans Protection du système si vous voulez qu'ils disparaissent.",
    "windowsKept_one": "{{count}} point de restauration Windows n'a pas pu être retiré. Retirez-le dans Protection du système si vous voulez qu'il disparaisse.",
    "windowsKept_other": "{{count}} points de restauration Windows n'ont pas pu être retirés. Retirez-les dans Protection du système si vous voulez qu'ils disparaissent."
  },
  "startup": {
    "count": "{{on}} sur {{total}} démarrent avec Windows",
    "empty": "Aucun programme de démarrage trouvé.",
    "system": "Composant Windows",
    "scope": {
      "User": "Votre compte",
      "AllUsers": "Tous les utilisateurs"
    },
    "note": "Désactiver un programme l'empêche seulement de démarrer avec Windows. Il reste installé et vous pouvez le réactiver. Ne désactivez que ce que vous reconnaissez."
  },
  "disk": {
    "title": "Nettoyage de disque",
    "desc": "Les fichiers supprimés ne passent pas par la Corbeille et ne peuvent pas être récupérés. Zanrei mesure d'abord et ne retire que ce que vous cochez.",
    "software": "Retirer des logiciels",
    "nothing": "Rien à nettoyer pour le moment.",
    "measure": "Mesurer à nouveau",
    "selected": "{{size}} sélectionnés",
    "run": "Supprimer la sélection",
    "confirmTitle": "Supprimer définitivement ces fichiers ?",
    "confirmBody": "Cela ne peut pas être annulé. Les fichiers en cours d'utilisation sont ignorés.",
    "done": "{{size}} libérés",
    "item": {
      "temp": {
        "name": "Fichiers temporaires",
        "desc": "Fichiers de travail laissés par les programmes dans votre dossier temporaire."
      },
      "windows_temp": {
        "name": "Fichiers temporaires de Windows",
        "desc": "Fichiers de travail laissés dans le dossier temporaire du système."
      },
      "crash_dumps": {
        "name": "Vidages mémoire et rapports d'erreurs",
        "desc": "Vidages mémoire et rapports enregistrés par Windows après des plantages."
      },
      "update_cache": {
        "name": "Mises à jour Windows téléchargées",
        "desc": "Fichiers de mise à jour que Windows a déjà installés. Windows les retélécharge s'il en a besoin."
      },
      "delivery_cache": {
        "name": "Cache de l'Optimisation de la distribution",
        "desc": "Morceaux de mises à jour conservés pour être partagés avec d'autres PC."
      },
      "browser_cache": {
        "name": "Caches des navigateurs",
        "desc": "Caches de pages d'Edge, Chrome, Brave et Firefox. Fermez d'abord le navigateur. Les sites chargent un peu plus lentement une fois, le temps que le cache se remplisse."
      },
      "recycle_bin": {
        "name": "Corbeille",
        "desc": "Tout le contenu de la Corbeille, sur tous les lecteurs."
      }
    }
  },
  "logs": {
    "copy": "Copier",
    "copied": "Copié dans le presse-papiers",
    "openFolder": "Ouvrir le dossier",
    "clear": "Effacer",
    "filter": "Filtrer par niveau",
    "empty": "Rien n'a encore été journalisé.",
    "level": {
      "all": "Tout",
      "Info": "Infos",
      "Warn": "Avertissements",
      "Error": "Erreurs"
    }
  },
  "settings": {
    "general": "Général",
    "language": "Langue",
    "automation": "Ce que Zanrei fait de lui-même",
    "background": "Arrière-plan",
    "runInBackground": "Continuer en arrière-plan",
    "runInBackgroundDesc": "Fermer la fenêtre cache Zanrei dans la zone de notification au lieu de le quitter.",
    "startWithWindows": "Démarrer avec Windows",
    "startWithWindowsDesc": "Démarre discrètement dans la zone de notification quand vous vous connectez.",
    "updates": "Mises à jour",
    "version": "Version {{version}}",
    "lastChecked": "Dernière vérification : {{when}}",
    "checkNow": "Vérifier maintenant",
    "checking": "Vérification…",
    "autoUpdate": "Installer les mises à jour automatiquement",
    "autoUpdateDesc": "Zanrei télécharge et installe lui-même les nouvelles versions, jamais pendant qu'un jeu tourne. Désactivez pour être consulté d'abord.",
    "updateAvailable": "La version {{version}} est disponible",
    "updateTo": "Mettre à jour vers {{version}}",
    "upToDate": "Vous êtes à jour.",
    "updateFailed": "Impossible de rechercher des mises à jour.",
    "install": "Installer et redémarrer",
    "installing": "Installation…",
    "tools": "Outils",
    "quit": "Quitter Zanrei",
    "quitDesc": "Ferme complètement l'application, y compris la surveillance en arrière-plan."
  },
  "os": {
    "flavor": {
      "title": "{{name}} {{version}} détecté",
      "badgeHint": "{{name}} est un Windows modifié",
      "body": "Ce PC utilise un Windows modifié. Beaucoup de réglages de Zanrei sont peut-être déjà actifs parce que {{name}} les a appliqués, et chaque interrupteur montre l'état actuel de Windows.",
      "keep": "Zanrei ne modifie que ce que {{name}} a laissé intact, et chaque modification reste annulable depuis Restauration.",
      "restore": "Les points de restauration nécessitent la Protection du système. Si elle est désactivée, Zanrei l'active pour le lecteur système avant toute modification.",
      "own": "Modifiez les réglages gérés par {{name}} dans les outils de {{name}}, pas ici, pour que les deux ne s'annulent pas mutuellement.",
      "docs": "Documentation de {{name}}"
    },
    "win10": {
      "title": "Windows 10 ne reçoit plus de mises à jour de sécurité gratuites",
      "body": "Microsoft a mis fin au support standard de Windows 10 le 14 octobre 2025. Le PC continue de fonctionner, mais les nouvelles failles de sécurité ne sont plus corrigées gratuitement. S'il peut exécuter Windows 11, passer à celui-ci est le choix le plus sûr.",
      "guide": "Lire le guide",
      "microsoft": "Annonce de Microsoft"
    }
  },
  "guide": {
    "tab": {
      "yourself": "À faire soi-même",
      "fresh": "Repartir de zéro"
    },
    "link": {
      "nvidia": "Pilotes NVIDIA",
      "amd": "Pilotes AMD",
      "intel": "Pilotes Intel",
      "atlasDrivers": "Guide des pilotes",
      "crystaldiskinfo": "CrystalDiskInfo",
      "hwinfo": "HWiNFO",
      "atlasXmp": "Guide pas à pas",
      "atlasRebar": "Guide pas à pas",
      "site": "Site web",
      "docs": "Guide d'installation",
      "github": "GitHub",
      "youtube": "Vidéos sur YouTube",
      "win10Ended": "Fin du support de Windows 10",
      "requirements": "Configuration requise pour Windows 11",
      "mediaHelp": "Instructions de Microsoft",
      "win11": "Télécharger Windows 11",
      "win10": "Télécharger Windows 10",
      "rufus": "Rufus"
    },
    "goto": {
      "graphics": "Ouvrir Graphismes",
      "startup": "Ouvrir Démarrage",
      "library": "Ouvrir Bibliothèque"
    },
    "impact": {
      "big": "Effet important",
      "medium": "Effet moyen",
      "small": "Petit effet"
    },
    "effort": {
      "easy": "Facile",
      "medium": "Demande de l'attention",
      "careful": "Prudence"
    },
    "yourself": {
      "intro": "Zanrei peut modifier ce que fait Windows, mais certains des plus grands gains se trouvent hors de Windows : dans le BIOS, dans le matériel, dans les pilotes et dans vos jeux. Ces étapes sont à faire vous-même. Commencez par le haut ; les premiers groupes sont les plus faciles.",
      "honest": "L'apport de chaque étape dépend de votre PC. Nous ne les avons pas mesurées, les indications d'effet sont donc notre jugement, pas une mesure."
    },
    "group": {
      "games": {
        "title": "Dans vos jeux",
        "desc": "Généralement le moyen le plus rapide d'obtenir plus d'images par seconde."
      },
      "windows": {
        "title": "Dans Windows",
        "desc": "Des réglages que Zanrei ne peut pas ou ne doit pas modifier à votre place."
      },
      "drivers": {
        "title": "Pilotes",
        "desc": "Les logiciels qui permettent à Windows d'utiliser correctement votre matériel."
      },
      "hardware": {
        "title": "Matériel",
        "desc": "Demande un tournevis, un achat ou les deux."
      },
      "bios": {
        "title": "Dans le BIOS",
        "desc": "Des réglages du micrologiciel du PC, avant le démarrage de Windows. Ne modifiez que ceux cités ici."
      }
    },
    "items": {
      "game_settings": {
        "title": "Baissez les réglages qui coûtent le plus d'images",
        "why": "Le moyen le plus rapide d'avoir plus de FPS se trouve presque toujours dans le jeu, pas dans Windows.",
        "s1": "Mettez le jeu en Plein écran (ou Sans bordure dans les jeux récents) à la résolution native de votre écran.",
        "s2": "Si le jeu propose un upscaler (DLSS, FSR ou XeSS), activez-le et réglez l'échelle de rendu vers 75 à 85 pour cent.",
        "s3": "Baissez d'abord les Ombres, le Brouillard ou les effets volumétriques, les Reflets et la Distance d'affichage. Ce sont eux qui coûtent le plus pour la plus petite différence visible. L'anticrénelage vient ensuite.",
        "s4": "Fixez une limite d'images (par exemple la fréquence de votre écran) pour que le PC ne tourne pas à fond sans gain. Désactivez la V-Sync si le jeu semble lent à réagir.",
        "s5": "Changez une seule chose à la fois et regardez un compteur de FPS (Steam : Paramètres, En jeu, Compteur d'IPS en jeu) pour voir ce qui aide vraiment."
      },
      "laptop_power": {
        "title": "Portables : branchez-le et choisissez le bon mode d'alimentation",
        "why": "Sur batterie, un portable bride fortement son processeur et sa carte graphique. Jouer débranché peut coûter une grande partie des performances.",
        "s1": "Branchez le chargeur fourni avec le portable.",
        "s2": "Windows 11 : ouvrez Paramètres, Système, Alimentation et batterie et réglez le Mode d'alimentation sur Performances optimales. Windows 10 : cliquez sur l'icône de batterie dans la barre des tâches et placez le curseur sur Performances optimales.",
        "s3": "Le Game Boost de Zanrei change aussi le mode d'alimentation pendant qu'un jeu tourne, puis le rétablit ensuite."
      },
      "refresh_rate": {
        "title": "Réglez votre écran sur sa fréquence d'actualisation la plus élevée",
        "why": "Beaucoup d'écrans vendus en 120, 144 ou 240 Hz restent à 60 Hz tant que vous ne changez rien. Les jeux et le bureau sont plus fluides à la vraie fréquence, et cela ne coûte rien.",
        "s1": "Ouvrez Paramètres, Système, Écran, Affichage avancé.",
        "s2": "Choisissez votre écran, puis ouvrez Choisir une fréquence d'actualisation.",
        "s3": "Choisissez la valeur la plus élevée et cliquez sur Conserver les modifications.",
        "s4": "Si la valeur la plus élevée manque, essayez un autre câble (DisplayPort ou un câble HDMI plus récent) et installez le pilote graphique."
      },
      "oem_software": {
        "title": "Retirez les logiciels d'essai et les utilitaires du fabricant",
        "why": "Les PC neufs sont souvent livrés avec un antivirus d'essai (McAfee, Norton), des outils « d'accélération » et des utilitaires qui tournent en permanence. La page Nettoyage de Zanrei retire les applications fournies avec Windows, mais pas celles-ci.",
        "s1": "Ouvrez Paramètres, Applications, Applications installées.",
        "s2": "Repérez les antivirus d'essai, les outils « booster » ou « optimiseur » et les utilitaires du fabricant que vous n'utilisez jamais.",
        "s3": "Désinstallez-les. La Sécurité Windows gratuite intégrée suffit à la plupart des gens.",
        "s4": "Vérifiez ensuite la page Démarrage de Zanrei pour ce qui reste.",
        "caution": "Gardez les outils de mise à jour des pilotes et du micrologiciel du fabricant si vous ne savez pas ce qu'ils font, et ne retirez pas votre seul antivirus."
      },
      "browser": {
        "title": "Allégez le navigateur",
        "why": "Sur un PC avec peu de mémoire, le navigateur est souvent ce qui en consomme le plus.",
        "s1": "Ouvrez les paramètres du navigateur, cherchez Économiseur de mémoire (Chrome) ou Onglets en veille (Edge) et activez-le.",
        "s2": "Ouvrez la liste des extensions et retirez celles que vous n'utilisez pas. Chacune s'exécute dans chaque onglet.",
        "s3": "Fermez les onglets que vous ne lisez pas. Mettez-les plutôt en favoris.",
        "s4": "Ne gardez pas un navigateur avec beaucoup d'onglets ouvert pendant que vous jouez."
      },
      "overlays": {
        "title": "Désactivez les superpositions que vous n'utilisez pas",
        "why": "Les superpositions de Discord, Steam, NVIDIA et Xbox s'accrochent à chaque jeu. Chacune coûte un peu, et provoque parfois des saccades ou des plantages.",
        "s1": "Discord : Paramètres utilisateur, Overlay de jeu, désactivez-le.",
        "s2": "Steam : Paramètres, En jeu, désactivez Activer l'overlay Steam en jeu (vous pouvez toujours l'activer jeu par jeu).",
        "s3": "NVIDIA App ou GeForce Experience : Paramètres, désactivez la superposition en jeu. L'enregistrement de la Xbox Game Bar est traité sur la page Jeux de Zanrei."
      },
      "gpu_driver": {
        "title": "Installez le bon pilote graphique",
        "why": "Les nouveaux pilotes corrigent des bugs de jeux et accélèrent souvent les choses. Un pilote très ancien, ou la « Carte vidéo de base Microsoft », laisse beaucoup de performances inutilisées.",
        "s1": "Ouvrez la page Graphismes de Zanrei. Elle indique votre carte, l'âge de son pilote et un lien vers la page de téléchargement du fabricant.",
        "s2": "Téléchargez le pilote de votre modèle exact chez NVIDIA, AMD ou Intel, pas via un outil de « mise à jour de pilotes ».",
        "s3": "Lancez le programme d'installation. Avec NVIDIA, choisissez Personnalisée, puis cochez Effectuer une nouvelle installation. AMD a une option similaire de réinitialisation d'usine.",
        "s4": "Redémarrez le PC quand le programme d'installation le demande.",
        "caution": "Sur un portable, le pilote du fabricant du portable est le choix sûr. Le pilote générique du fabricant de la puce refuse parfois de s'installer ou désactive des fonctions."
      },
      "chipset": {
        "title": "Installez le pilote du chipset",
        "why": "Windows utilise d'abord des pilotes génériques pour la carte mère. Le pilote de chipset du fabricant apporte le bon comportement d'énergie et de performances pour votre processeur.",
        "s1": "Trouvez le modèle de votre carte mère ou de votre portable : appuyez sur Win + R, tapez msinfo32 et lisez Produit de la carte mère (ou Modèle du système).",
        "s2": "Ouvrez la page d'assistance du fabricant de la carte mère ou du portable, ou celle d'AMD ou d'Intel pour le pilote du chipset.",
        "s3": "Téléchargez le pilote du chipset, installez-le et redémarrez."
      },
      "disk_health": {
        "title": "Vérifiez que le disque est en bonne santé",
        "why": "Un disque défaillant fait bloquer et figer tout le PC, et tôt ou tard il perd des données.",
        "s1": "Installez CrystalDiskInfo (gratuit) et ouvrez-le.",
        "s2": "Bon, c'est bien. Prudence ou Mauvais signifie : sauvegardez maintenant et remplacez le disque.",
        "s3": "N'utilisez pas d'outils de réparation ou d'optimisation sur un disque marqué Prudence ou Mauvais avant que vos données soient en sécurité."
      },
      "cooling": {
        "title": "Dépoussiérez et vérifiez les températures",
        "why": "Un processeur ou une carte graphique trop chauds se brident pour se protéger (thermal throttling), ce qui ressemble exactement à un PC lent. Les vieux portables en sont les victimes habituelles.",
        "s1": "Installez HWiNFO (gratuit), ouvrez-le en mode Capteurs uniquement, puis jouez ou travaillez dix minutes en surveillant les températures du processeur et du GPU.",
        "s2": "Des températures qui restent vers 90 °C ou plus, ou des fréquences qui baissent en charge, signalent un throttling.",
        "s3": "Éteignez le PC, débranchez-le et soufflez la poussière des ventilateurs et des grilles par courtes rafales d'air comprimé. Bloquez chaque ventilateur avec un cure-dent pour qu'il ne tourne pas trop vite.",
        "s4": "Posez un portable sur une surface dure et plane ou sur un support, jamais sur un lit ou sur vos genoux. Une nouvelle pâte thermique aide sur les PC anciens, mais seulement si vous êtes à l'aise pour ouvrir le refroidisseur.",
        "caution": "Ouvrir un portable peut annuler sa garantie."
      },
      "dual_channel": {
        "title": "Utilisez deux barrettes de mémoire en double canal",
        "why": "Deux barrettes identiques donnent au processeur deux fois la bande passante mémoire d'une seule. Avec la partie graphique intégrée au processeur, qui partage cette mémoire, c'est souvent la meilleure amélioration pour son prix.",
        "s1": "Ouvrez le Gestionnaire des tâches, Performance, Mémoire. Emplacements utilisés : 1 sur 2 ou 1 sur 4 signifie une seule barrette.",
        "s2": "Achetez une deuxième barrette de même taille et de même vitesse que la première (le même modèle si possible).",
        "s3": "Placez-les dans les emplacements indiqués pour le double canal dans le manuel de votre carte mère, souvent les emplacements 2 et 4 en partant du processeur.",
        "s4": "Vérifiez de nouveau le Gestionnaire des tâches, puis activez XMP ou EXPO (voir Dans le BIOS).",
        "caution": "Éteignez le PC et débranchez-le avant de l'ouvrir. Beaucoup de portables ont une mémoire soudée, renseignez-vous d'abord sur votre modèle."
      },
      "ram_upgrade": {
        "title": "Ajoutez de la mémoire si elle est presque toujours pleine",
        "why": "Quand la mémoire manque, Windows utilise le disque et tout saccade. Aucun réglage ne remplace de la vraie mémoire.",
        "s1": "Surveillez la jauge de mémoire dans l'Aperçu de Zanrei pendant que vous travaillez ou jouez. Au-dessus d'environ 85 pour cent la plupart du temps, c'est qu'il en manque.",
        "s2": "Trouvez le type et le maximum accepté par votre PC : cherchez votre modèle et « ajout de RAM », ou utilisez la page de compatibilité du fabricant.",
        "s3": "8 Go est le minimum pratique aujourd'hui. 16 Go est confortable pour jouer.",
        "caution": "Beaucoup de portables fins ne peuvent pas être améliorés."
      },
      "ssd": {
        "title": "Passez Windows sur un SSD",
        "why": "Si Windows démarre depuis un disque dur (HDD), rien d'autre n'en approche. Le démarrage, l'ouverture des programmes et le chargement des jeux deviennent tous beaucoup plus rapides.",
        "s1": "Ouvrez le Gestionnaire des tâches, Performance, Disque. Le type y est indiqué, et l'Aperçu de Zanrei l'affiche aussi.",
        "s2": "Choisissez un SSD SATA ou NVMe compatible avec votre PC (consultez le manuel de votre modèle). 256 Go suffisent pour Windows et quelques programmes.",
        "s3": "Le plus propre est de sauvegarder, monter le SSD et faire une installation neuve (voir Repartir de zéro). Cloner l'ancien disque marche aussi, mais copie son désordre avec.",
        "s4": "Gardez l'ancien disque comme stockage supplémentaire, ou retirez-le.",
        "caution": "Sauvegardez d'abord. Une installation neuve efface le disque sur lequel elle est faite."
      },
      "xmp": {
        "title": "Activez XMP ou EXPO pour que la mémoire tourne à sa vitesse nominale",
        "why": "La mémoire est souvent vendue à une vitesse mais tourne moins vite tant qu'un profil n'est pas activé dans le BIOS. Cela compte surtout sur les PC qui utilisent la partie graphique intégrée au processeur, qui partage cette mémoire, et sur AMD Ryzen.",
        "s1": "Ouvrez le Gestionnaire des tâches, Performance, Mémoire et notez la Vitesse. Comparez-la à celle imprimée sur les barrettes (par exemple 3200 ou 6000).",
        "s2": "Redémarrez le PC et appuyez sur la touche du BIOS au démarrage, en général Suppr ou F2. L'écran du logo l'indique souvent.",
        "s3": "Cherchez le réglage nommé XMP (Intel), EXPO ou DOCP (AMD), ou AI Overclock Tuner. Il se trouve en général sur le premier écran d'overclocking ou de tweaker.",
        "s4": "Choisissez Profil 1, puis enregistrez et quittez (en général F10).",
        "s5": "De retour dans Windows, vérifiez de nouveau le Gestionnaire des tâches. La vitesse doit maintenant correspondre aux barrettes.",
        "caution": "La plupart des PC démarrent sans problème. Si le vôtre ne démarre pas, éteignez-le, maintenez le bouton d'alimentation dix secondes et réessayez. La plupart des cartes reviennent à des réglages sûrs après un démarrage raté. Les portables et beaucoup de PC de bureau n'ont pas du tout ce réglage, et c'est normal."
      },
      "rebar": {
        "title": "Activez Resizable BAR",
        "why": "Il permet au processeur d'utiliser toute la mémoire de la carte graphique d'un coup. Le gain est faible et varie selon les jeux, mais il est gratuit là où c'est pris en charge (en gros les cartes graphiques depuis 2020, avec un processeur compatible).",
        "s1": "Vérifiez la compatibilité : l'outil gratuit GPU-Z affiche un champ Resizable BAR, sinon consultez la page du fabricant de la carte graphique.",
        "s2": "Dans le BIOS, activez d'abord Above 4G Decoding, puis Re-Size BAR Support. Les noms varient un peu selon les fabricants.",
        "s3": "Enregistrez, redémarrez et vérifiez de nouveau dans GPU-Z.",
        "s4": "Pour que cela fonctionne, Windows doit être installé en mode UEFI (pas Legacy ni CSM).",
        "caution": "Mettez d'abord à jour le pilote graphique. Modifier des réglages du BIOS que vous ne comprenez pas peut empêcher le PC de démarrer, alors ne modifiez que ceux cités ici."
      }
    },
    "fresh": {
      "title": "Pourquoi repartir de zéro",
      "intro": "Repartir de zéro efface le lecteur système et y installe un nouveau Windows. Rien ne peut être annulé ensuite, mais un Windows propre est le meilleur point de départ qui soit, et il permet des choses qu'aucune application ne peut faire sur un Windows en cours d'utilisation.",
      "gain": {
        "clean": "Aucun reste : des années de programmes installés et à moitié retirés, de vieux pilotes, des services en arrière-plan et d'éventuels logiciels malveillants disparaissent.",
        "bloat": "Aucun encombrement du fabricant : vous installez Windows depuis l'image de Microsoft, pas celle personnalisée par le fabricant.",
        "components": "Des parties qu'on ne peut pas retirer d'un Windows en cours d'utilisation. Des projets comme AtlasOS appliquent leurs changements juste après l'installation, avant que quoi que ce soit dépende de ces parties.",
        "layout": "Une bonne organisation du disque : UEFI moderne, le système sur le lecteur le plus rapide, rien qui reste d'une ancienne configuration MBR.",
        "known": "Un état connu. Il est plus facile de savoir ce qui a vraiment changé les performances quand tout part du même point."
      },
      "warning": "Repartir de zéro est facultatif. Zanrei fonctionne sur votre Windows actuel, et tout ce qu'il fait peut être annulé. Une réinstallation ne peut pas l'être."
    },
    "atlas": {
      "title": "AtlasOS",
      "badge": "Pour les passionnés",
      "intro": "Un projet open source (environ 22 000 étoiles sur GitHub) qui règle un Windows 11 tout neuf pour moins de latence, moins de processus en arrière-plan et moins de télémétrie. Il s'applique avec un petit installateur appelé AME Wizard après une installation propre de Windows, et le playbook qu'il applique est open source et lisible par tous. Il est fait par d'autres personnes et Zanrei n'y est pas affilié. La dernière version au moment de la rédaction est la v0.5.0.",
      "fact": {
        "w11": "Il nécessite Windows 11 (24H2 ou 25H2 au moment de la rédaction). Atlas ne prend plus en charge Windows 10.",
        "pro": "Utilisez Windows Pro ou Entreprise. Windows Famille n'est pas pris en charge.",
        "revert": "Retirer Atlas signifie réinstaller Windows.",
        "security": "Atlas vous laisse choisir quelle sécurité garder, par exemple Defender et Windows Update. Lisez sa page sur la sécurité avant de décider.",
        "unofficial": "Zanrei n'a pas mesuré Atlas. Les résultats varient d'un PC à l'autre."
      },
      "videos": "Beaucoup de gens ont enregistré des tests avant/après, donc chercher AtlasOS sur YouTube montre son comportement sur des PC comme le vôtre. Prenez chaque vidéo isolée avec prudence.",
      "others": "Des projets similaires existent, par exemple"
    },
    "win10": {
      "title": "Windows 10 ou 11 ?",
      "body": "Microsoft a arrêté les mises à jour de sécurité gratuites de Windows 10 le 14 octobre 2025. Si votre PC respecte la configuration requise pour Windows 11, installez Windows 11. Sinon, un Windows 10 propre fonctionne toujours, mais gardez le navigateur à jour, évitez les téléchargements risqués et prévoyez de remplacer le PC. La page de Microsoft indique les éventuelles options de mises à jour étendues payantes."
    },
    "install": {
      "title": "Comment réinstaller Windows (10 ou 11)",
      "intro": "Les étapes sont les mêmes pour les deux. Prévoyez une à deux heures, et n'éteignez pas le PC pendant l'installation.",
      "atlasNote": "Si vous voulez AtlasOS, arrêtez-vous après le premier démarrage et suivez à partir de là son propre guide d'installation. Ses étapes changent selon les versions, utilisez donc les actuelles.",
      "step": {
        "backup": {
          "title": "Sauvegardez ce qui compte",
          "body": "Copiez documents, photos, sauvegardes de jeux et favoris du navigateur sur un disque externe ou dans le cloud. Notez les clés de licence des programmes payants. Tout ce qui se trouve sur le lecteur système sera effacé."
        },
        "activation": {
          "title": "Vérifiez que Windows est activé",
          "body": "Ouvrez Paramètres, Système, Activation. « Activé avec une licence numérique » signifie que Windows s'active tout seul après la réinstallation. Il faudra peut-être vous connecter avec le même compte Microsoft."
        },
        "drivers": {
          "title": "Téléchargez d'abord les pilotes",
          "body": "Sur un autre appareil, téléchargez le pilote réseau (Wi-Fi ou Ethernet) de votre carte mère ou de votre portable et gardez-le sur une clé USB. Sans lui, le nouveau Windows risque de ne pas avoir Internet. Téléchargez aussi le pilote graphique."
        },
        "media": {
          "title": "Obtenez Windows auprès de Microsoft",
          "body": "Utilisez l'Outil de création de média de Microsoft et choisissez Créer un support d'installation avec une clé USB d'au moins 8 Go (elle sera effacée). Ou téléchargez le fichier ISO et écrivez-le sur la clé avec Rufus."
        },
        "boot": {
          "title": "Démarrez depuis la clé USB",
          "body": "Redémarrez et appuyez sur la touche du menu de démarrage au lancement du PC, souvent F12, F11, F8, Échap ou Suppr. L'écran du logo du fabricant l'indique en général. Choisissez la clé USB, de préférence l'entrée qui commence par UEFI."
        },
        "setup": {
          "title": "Lancez l'installation",
          "body": "Choisissez la langue, puis Installer maintenant. « Je n'ai pas de clé de produit » convient si Windows était activé avant. Choisissez la même édition qu'avant (Pro ou Famille), acceptez les termes du contrat de licence et choisissez Personnalisé : installer uniquement Windows."
        },
        "drive": {
          "title": "Choisissez le lecteur",
          "body": "Sélectionnez le lecteur où installer Windows. Pour l'effacer complètement, supprimez ses partitions, sélectionnez l'espace non alloué et cliquez sur Suivant. Ne touchez pas aux lecteurs qui contiennent vos fichiers. Leurs tailles aident à les distinguer."
        },
        "firstrun": {
          "title": "Premier démarrage",
          "body": "Windows redémarre plusieurs fois. Choisissez votre région et votre clavier et connectez-vous au réseau, avec le pilote de votre clé USB si besoin. Windows 11 vous demande de vous connecter avec un compte Microsoft."
        },
        "update": {
          "title": "Mettez à jour et installez les pilotes",
          "body": "Lancez Windows Update jusqu'à ce qu'il ne reste rien, puis installez les pilotes du chipset et graphique et redémarrez."
        },
        "zanrei": {
          "title": "Puis installez Zanrei",
          "body": "Lancez l'installation de Zanrei. Elle crée un point de restauration, applique les réglages adaptés à votre PC et montre ce qu'il reste à faire."
        }
      }
    }
  },
  "tweaks": {
    "telemetry": {
      "name": "Réduire les données de diagnostic",
      "desc": "Demande à Windows de n'envoyer que les données de diagnostic minimales obligatoires et arrête les demandes de commentaires."
    },
    "advertising_id": {
      "name": "Désactiver l'identifiant de publicité",
      "desc": "Empêche les applications d'utiliser un identifiant par utilisateur pour personnaliser les publicités."
    },
    "tailored_experiences": {
      "name": "Désactiver les expériences personnalisées",
      "desc": "Empêche Windows d'utiliser vos données de diagnostic pour proposer des conseils et des publicités."
    },
    "activity_history": {
      "name": "Désactiver l'historique des activités",
      "desc": "Empêche Windows de collecter et d'envoyer les applications et fichiers que vous ouvrez."
    },
    "suggestions": {
      "name": "Retirer les suggestions et publicités",
      "desc": "Masque les applications et conseils promus dans Démarrer, Paramètres et l'écran de verrouillage, et bloque les installations silencieuses d'applications."
    },
    "web_search": {
      "name": "Rechercher uniquement sur ce PC",
      "desc": "Retire les résultats web de la recherche du menu Démarrer, pour qu'elle soit plus rapide et plus privée."
    },
    "consumer_features": {
      "name": "Bloquer l'installation d'applications promues",
      "desc": "Empêche Windows d'installer des applications sponsorisées, comme des jeux, après la configuration ou les mises à jour."
    },
    "delivery_optimization": {
      "name": "Ne pas envoyer les mises à jour à d'autres PC",
      "desc": "Windows télécharge les mises à jour uniquement depuis Microsoft au lieu de les partager via votre connexion."
    },
    "telemetry_tasks": {
      "name": "Désactiver les tâches planifiées de télémétrie",
      "desc": "Désactive les tâches en arrière-plan qui collectent des données de compatibilité et d'utilisation."
    },
    "diagnostic_services": {
      "name": "Désactiver les services de télémétrie",
      "desc": "Arrête les services Expériences des utilisateurs connectés et télémétrie et de messages push. Prend effet après un redémarrage."
    },
    "location": {
      "name": "Désactiver les services de localisation",
      "desc": "Bloque l'accès à la localisation pour toutes les applications. Cartes et Localiser mon appareil ne fonctionneront plus."
    },
    "background_apps": {
      "name": "Empêcher les applications du Store de tourner en arrière-plan",
      "desc": "Économise la mémoire et la batterie sur les PC anciens. Les applications du Store ne mettront plus à jour leurs vignettes ni leurs notifications une fois fermées."
    },
    "error_reporting": {
      "name": "Désactiver le Rapport d'erreurs Windows",
      "desc": "Empêche la collecte et l'envoi des rapports de plantage. Vous perdez le diagnostic de plantage intégré."
    },
    "windows_ai": {
      "name": "Désactiver Copilot et Recall",
      "desc": "Désactive le bouton Copilot et l'analyse de données par IA qui prend des captures de votre écran."
    },
    "animations": {
      "name": "Réduire les animations",
      "desc": "Désactive la plupart des animations de fenêtres et des délais de menus pour que les PC anciens paraissent plus rapides. Déconnectez-vous pour appliquer."
    },
    "transparency": {
      "name": "Désactiver les effets de transparence",
      "desc": "Retire le flou transparent des fenêtres et de la barre des tâches, ce qui économise de la puissance graphique sur les cartes anciennes."
    },
    "startup_delay": {
      "name": "Supprimer le délai de démarrage",
      "desc": "Windows attend avant de lancer les programmes de démarrage. Ceci les lance juste après la connexion."
    },
    "edge_background": {
      "name": "Empêcher Edge de tourner en arrière-plan",
      "desc": "Empêche Edge de se précharger et de rester en mémoire après sa fermeture. Edge peut afficher la mention « Géré par votre organisation »."
    },
    "sysmain": {
      "name": "Désactiver SysMain (Superfetch)",
      "desc": "Arrête le préchargement des applications en mémoire. Aide sur certains systèmes, mais n'est recommandé qu'avec un SSD ; laissez-le activé avec un disque dur."
    },
    "search_indexing": {
      "name": "Désactiver l'indexation de recherche",
      "desc": "Arrête l'indexeur en arrière-plan. Réduit l'activité disque sur les vieux disques durs, mais la recherche de fichiers devient plus lente."
    },
    "hibernation": {
      "name": "Désactiver la mise en veille prolongée",
      "desc": "Supprime le fichier de mise en veille prolongée et libère plusieurs gigaoctets. Désactive aussi le Démarrage rapide."
    },
    "high_performance_plan": {
      "name": "Utiliser le mode de gestion de l'alimentation Performances élevées",
      "desc": "Garde le processeur prêt à pleine vitesse. Consomme plus d'énergie ; pas idéal pour les portables sur batterie."
    },
    "svchost_split": {
      "name": "Regrouper les services Windows dans moins de processus",
      "desc": "Au-delà de 3,5 Go de RAM, Windows exécute chaque service dans son propre processus. Les regrouper économise de la mémoire et des dizaines de processus en arrière-plan sur les PC de 4 à 8 Go. Redémarrage requis."
    },
    "power_throttling": {
      "name": "Désactiver la limitation de puissance",
      "desc": "Empêche Windows de ralentir les programmes en arrière-plan pour économiser l'énergie. Peut aider les vieux PC de bureau ; consomme plus de batterie sur les portables. Redémarrage requis."
    },
    "multimedia_scheduler": {
      "name": "Donner la priorité aux jeux sur le multimédia en arrière-plan",
      "desc": "Réduit de 20 % à 10 % la part de temps processeur que Windows réserve au multimédia en arrière-plan, pour qu'une plus grande partie aille au jeu."
    },
    "foreground_priority": {
      "name": "Favoriser le programme que vous utilisez",
      "desc": "Donne à la fenêtre au premier plan des tranches de temps plus courtes et le plus fort gain de priorité, pour qu'elle réagisse mieux sur un vieux PC chargé."
    },
    "vbs_off": {
      "name": "Désactiver l'intégrité de la mémoire (VBS)",
      "desc": "Windows peut exécuter certaines de ses parties dans une machine virtuelle par sécurité. Sur certains PC, cela coûte des images dans les jeux. Cela retire aussi une couche de protection contre les logiciels malveillants : uniquement pour un PC servant surtout aux jeux. Redémarrage requis."
    },
    "game_mode": {
      "name": "Activer le Mode Jeu",
      "desc": "Permet à Windows de privilégier le jeu en cours plutôt que les tâches en arrière-plan."
    },
    "game_dvr": {
      "name": "Désactiver l'enregistrement de jeu en arrière-plan",
      "desc": "Empêche la Xbox Game Bar d'enregistrer en arrière-plan, ce qui coûte des images."
    },
    "windowed_optimizations": {
      "name": "Optimisations pour les jeux fenêtrés",
      "desc": "Améliore la latence et active des fonctions comme Auto HDR dans les jeux sans bordure et fenêtrés (Windows 11 22H2+)."
    },
    "vrr": {
      "name": "Fréquence d'actualisation variable pour les jeux fenêtrés",
      "desc": "Permet aux écrans G-SYNC et FreeSync de se synchroniser dans les jeux fenêtrés (Windows 11 22H2+). Nécessite un écran compatible."
    },
    "hags": {
      "name": "Planification GPU à accélération matérielle",
      "desc": "Laisse la carte graphique gérer sa propre mémoire. Aide certains jeux, en pénalise d'autres. Nécessite un pilote GPU récent et un redémarrage."
    },
    "fullscreen_optimizations": {
      "name": "Désactiver partout les optimisations plein écran",
      "desc": "Exécute les jeux en vrai plein écran exclusif. Certains jeux gagnent en réactivité, d'autres empirent. Vous pouvez aussi le régler jeu par jeu."
    },
    "mouse_precision": {
      "name": "Désactiver l'accélération du pointeur",
      "desc": "Le curseur suit votre main 1:1, comme l'attendent la plupart des jeux de tir. Déconnectez-vous pour appliquer."
    },
    "sticky_keys": {
      "name": "Désactiver les raccourcis des Touches rémanentes",
      "desc": "Supprime la fenêtre qui s'ouvre quand vous appuyez cinq fois sur Maj ou la maintenez, ce qui peut interrompre un jeu."
    },
    "file_extensions": {
      "name": "Afficher les extensions de fichiers",
      "desc": "Affiche .exe, .png, etc., ce qui aide à repérer les fichiers déguisés."
    },
    "hidden_files": {
      "name": "Afficher les fichiers cachés",
      "desc": "Affiche les fichiers et dossiers cachés dans l'Explorateur de fichiers."
    },
    "end_task": {
      "name": "Ajouter « Fin de tâche » au menu de la barre des tâches",
      "desc": "Cliquez droit sur une application dans la barre des tâches pour la fermer même si elle est figée (Windows 11 22H2+)."
    },
    "widgets": {
      "name": "Désactiver les Widgets et les actualités",
      "desc": "Retire le panneau des widgets et le fil d'actualités, qui exécutent des processus en arrière-plan."
    },
    "long_paths": {
      "name": "Autoriser les chemins de fichiers très longs",
      "desc": "Lève la limite de 260 caractères des chemins pour les applications qui le prennent en charge."
    },
    "no_auto_reboot": {
      "name": "Pas de redémarrage automatique pendant une session",
      "desc": "Windows Update ne redémarrera pas votre PC tant que vous êtes connecté."
    },
    "onedrive_policy": {
      "name": "Arrêter la synchronisation des fichiers OneDrive",
      "desc": "Désactive la synchronisation des fichiers OneDrive par stratégie, sans le désinstaller."
    },
    "edge_debloat": {
      "name": "Retirer les sollicitations et publicités d'Edge",
      "desc": "Masque l'écran de premier lancement, l'assistant d'achat, les recommandations et les récompenses d'Edge. Edge peut afficher la mention « Géré par votre organisation »."
    },
    "remove_edge": {
      "name": "Retirer Microsoft Edge",
      "desc": "Désinstalle le navigateur Edge et empêche Windows de le réinstaller. Le runtime WebView2 dont ont besoin des applications comme Zanrei est conservé. Cela ne peut pas être annulé depuis Zanrei. Assurez-vous d'abord d'avoir un autre navigateur."
    },
    "bloat_apps": {
      "name": "Retirer les applications préinstallées",
      "desc": "Désinstalle les applications promotionnelles du Store que vous cochez dans une liste (Actualités, Météo, Solitaire, Candy Crush et similaires). Les applications souvent utilisées, comme Spotify ou Mobile connecté, sont décochées au départ. Xbox, Store, Photos et Calculatrice ne sont jamais listés. Cela ne peut pas être annulé depuis Zanrei ; réinstallez ce qui vous manque depuis le Microsoft Store."
    }
  }
} satisfies Translation<Locale>;
