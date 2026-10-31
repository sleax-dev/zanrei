import type { Locale, Translation } from "./en";

export default {
  "common": {
    "next": "Siguiente",
    "back": "Atrás",
    "finish": "Finalizar",
    "retry": "Reintentar",
    "cancel": "Cancelar",
    "confirm": "Confirmar",
    "close": "Cerrar",
    "loading": "Cargando…",
    "remove": "Quitar",
    "search": "Buscar",
    "delete": "Eliminar"
  },
  "boost": {
    "label": "Impulso de juegos",
    "on": "Activado",
    "off": "Desactivado"
  },
  "splash": {
    "tagline": "Windows, a tu medida. Todo cambio se puede deshacer.",
    "loading": "Iniciando Zanrei…"
  },
  "setup": {
    "progress": "Paso {{current}} de {{total}}",
    "steps": {
      "welcome": "Bienvenida",
      "recommend": "Recomendado",
      "done": "Listo"
    },
    "welcome": {
      "title": "Bienvenido a Zanrei",
      "body": "Zanrei ajusta Windows para el PC que tienes de verdad, y cada cambio se puede deshacer.",
      "p1": "Antes del primer cambio se crea un punto de restauración de Windows.",
      "p2": "Ves lo que hace cada ajuste antes de activarlo.",
      "p3": "No se envía nada a ningún sitio. No hay cuenta.",
      "language": "Idioma",
      "start": "Empezar"
    },
    "scan": {
      "working": "Analizando…"
    },
    "recommend": {
      "title": "Recomendado para tu PC",
      "found_many": "{{count}} ajustes le convienen.",
      "found_one": "{{count}} ajuste le conviene.",
      "found_other": "{{count}} ajustes le convienen.",
      "alreadyOn": "{{count}} más ya estaban configurados.",
      "pc": "Tu PC",
      "safety": "Primero se crea un punto de restauración. Puedes deshacerlo todo desde la página Restaurar.",
      "failed": "Zanrei no pudo hacer un cambio y se detuvo. No se tocó nada más.",
      "skip": "Omitir, elegiré yo",
      "applying": "Aplicando {{done}} de {{total}}…",
      "apply_many": "Aplicar {{count}} ajustes",
      "apply_one": "Aplicar {{count}} ajuste",
      "apply_other": "Aplicar {{count}} ajustes"
    },
    "mode": {
      "title": "¿Cuánto debe hacer Zanrei?",
      "desc": "Puedes cambiarlo cuando quieras.",
      "manual": {
        "name": "Manual",
        "desc": "No ocurre nada a menos que lo elijas."
      },
      "recommended": {
        "name": "Recomendado",
        "desc": "Zanrei sugiere mejoras seguras y tú confirmas cada una."
      },
      "auto": {
        "name": "Automático",
        "desc": "Zanrei aplica mejoras seguras por sí mismo, siempre tras crear un punto de restauración."
      }
    },
    "done": {
      "title": "Todo listo",
      "applied_many": "Se aplicaron {{count}} ajustes.",
      "applied_one": "Se aplicó {{count}} ajuste.",
      "applied_other": "Se aplicaron {{count}} ajustes.",
      "nothing": "No se hizo ningún cambio.",
      "autoNote": "A partir de ahora Zanrei aplica por sí solo las nuevas recomendaciones seguras. Lo que desactives seguirá desactivado. Puedes cambiarlo en Configuración.",
      "manualNote": "Zanrei te sugerirá mejoras y esperará tu aprobación. Puedes cambiarlo en Configuración.",
      "start": "Abrir Zanrei"
    }
  },
  "nav": {
    "label": "Principal",
    "countLabel": "{{on}} de {{total}} activos",
    "newErrors_many": "{{count}} errores nuevos",
    "newErrors_one": "{{count}} error nuevo",
    "newErrors_other": "{{count}} errores nuevos",
    "overview": "Resumen",
    "privacy": "Privacidad",
    "performance": "Rendimiento",
    "startup": "Inicio",
    "gaming": "Juegos",
    "windows": "Windows",
    "cleanup": "Limpieza",
    "library": "Biblioteca",
    "graphics": "Gráficos",
    "guide": "Guía",
    "restore": "Restaurar",
    "logs": "Registro",
    "settings": "Ajustes",
    "group": {
      "optimize": "Optimizar",
      "games": "Juegos",
      "tools": "Herramientas"
    }
  },
  "pageDesc": {
    "privacy": "Evita que Windows recopile y comparta más de lo necesario.",
    "performance": "Haz que un PC antiguo o saturado se sienta más rápido.",
    "startup": "Elige qué programas se inician con Windows. Menos al inicio significa un arranque más rápido y más memoria libre.",
    "gaming": "Menos interrupciones y menos carga mientras juegas.",
    "windows": "Pequeños cambios en el aspecto y el comportamiento de Windows.",
    "cleanup": "Libera espacio en disco y quita software que no pediste. Los archivos eliminados y los programas quitados no se pueden recuperar.",
    "library": "Zanrei encuentra tus juegos instalados y ajusta Windows para cada uno.",
    "graphics": "Tu tarjeta gráfica y su controlador.",
    "restore": "Cada cambio que hace Zanrei se guarda aquí y se puede deshacer. Puedes eliminar los puntos de restauración que ya no necesites.",
    "guide": "Lo que solo tú puedes hacer, como ajustes de la BIOS, pasos de hardware y controladores, y cómo empezar de cero con un Windows limpio.",
    "logs": "Lo que hizo Zanrei y cualquier cosa que saliera mal. Compártelo cuando pidas ayuda.",
    "settings": "Cómo se inicia, se actualiza y se comporta Zanrei."
  },
  "titlebar": {
    "minimize": "Minimizar",
    "close": "Cerrar",
    "closeToTray": "Cerrar (sigue en segundo plano)"
  },
  "toast": {
    "applied_many": "{{count}} ajustes aplicados",
    "applied_one": "{{count}} ajuste aplicado",
    "applied_other": "{{count}} ajustes aplicados",
    "nothingToApply": "No queda nada por aplicar",
    "viewLog": "Ver registro"
  },
  "restart": {
    "Explorer": "El Explorador de archivos necesita reiniciarse para terminar de aplicar los cambios.",
    "SignOut": "Cierra sesión y vuelve a entrar para terminar de aplicar los cambios.",
    "Reboot": "Reinicia Windows para terminar de aplicar los cambios.",
    "because": "Por: {{names}}",
    "explorerButton": "Reiniciar Explorador",
    "rebootButton": "Reiniciar ahora",
    "signOutButton": "Cerrar sesión ahora",
    "signOutTitle": "¿Cerrar sesión en Windows?",
    "signOutBody": "Se cerrará la sesión de inmediato. Guarda tu trabajo primero.",
    "confirmTitle": "¿Reiniciar Windows?",
    "confirmBody": "Windows se reiniciará en {{seconds}} segundos. Guarda tu trabajo primero. Puedes cancelarlo hasta entonces.",
    "countdown": "Reiniciando en {{seconds}} s…"
  },
  "overview": {
    "title": "Tu PC",
    "loading": "Revisando tu PC…",
    "tier": {
      "Legacy": "PC antiguo",
      "Mainstream": "PC de gama media",
      "High": "PC de alto rendimiento"
    },
    "build": "Compilación {{build}}",
    "os": "Sistema",
    "cpu": "Procesador",
    "ram": "Memoria",
    "gpu": "Gráficos",
    "storage": "Almacenamiento",
    "noGpu": "No se detectó tarjeta gráfica",
    "cores": "{{physical}} núcleos / {{logical}} hilos",
    "freeOf": "{{free}} libres de {{total}}",
    "summaryTodo_many": "{{count}} ajustes recomendados están listos.",
    "summaryTodo_one": "{{count}} ajuste recomendado está listo.",
    "summaryTodo_other": "{{count}} ajustes recomendados están listos.",
    "summaryDone": "Todo lo recomendado ya está activado.",
    "apply": "Aplicar {{count}}",
    "safetyNote": "Primero se crea un punto de restauración, y cada cambio se puede deshacer."
  },
  "live": {
    "title": "Ahora mismo",
    "desc": "Estas cifras cambian cuando las optimizaciones funcionan. Compáralas después de reiniciar.",
    "cpu": "Procesador",
    "ram": "Memoria en uso",
    "ramTotal": "/ {{total}}",
    "processes": "Procesos en ejecución",
    "startup": "Programas de inicio"
  },
  "bloat": {
    "pick": "Solo se eliminan las apps que marques. Las que mucha gente usa quedan sin marcar.",
    "mayUse": "puede que la uses",
    "none": "Ninguna de las apps que se pueden quitar está instalada.",
    "remove_many": "Quitar {{count}} apps",
    "remove_one": "Quitar {{count}} app",
    "remove_other": "Quitar {{count}} apps"
  },
  "optimize": {
    "forThisPc": "Recomendado para este PC",
    "more": "Más opciones",
    "applyAll": "Aplicar los {{count}}",
    "empty": "No hay coincidencias.",
    "apply": "Aplicar",
    "irreversible": "No se puede deshacer",
    "acknowledge": "Entiendo que esto no se puede deshacer",
    "partial": "Aplicado en parte",
    "unavailable": "No disponible en este PC",
    "category": {
      "Privacy": "Privacidad",
      "Performance": "Rendimiento",
      "Gaming": "Juegos",
      "Interface": "Interfaz",
      "System": "Sistema",
      "Cleanup": "Limpieza"
    },
    "risk": {
      "Safe": "Seguro",
      "Moderate": "Moderado",
      "Advanced": "Avanzado"
    },
    "needs": {
      "Explorer": "Reinicia el Explorador",
      "SignOut": "Requiere cerrar sesión",
      "Reboot": "Requiere reiniciar"
    },
    "confirm": {
      "Safe": "Es un cambio de bajo riesgo.",
      "Moderate": "Esto cambia cómo se comporta Windows. Se puede volver a desactivar, y primero se crea un punto de restauración.",
      "Advanced": "Es un cambio avanzado. Lee la descripción con atención. Primero se crea un punto de restauración.",
      "irreversible": "Esto no se puede deshacer. Zanrei no puede revertirlo, y no se puede confiar en un punto de restauración para ello."
    }
  },
  "games": {
    "rescan": "Volver a buscar",
    "add": "Añadir juego",
    "scanning": "Buscando juegos…",
    "empty": "Aún no se encontraron juegos. Añade uno a mano o instala un juego desde Steam, Epic, GOG, Xbox, Ubisoft, EA, Battle.net o Riot.",
    "yourGames": "Tus juegos",
    "optionsOn_many": "{{count}} opciones activas",
    "optionsOn_one": "{{count}} opción activa",
    "optionsOn_other": "{{count}} opciones activas",
    "found_many": "{{count}} juegos encontrados: {{launchers}}",
    "found_one": "{{count}} juego encontrado: {{launchers}}",
    "found_other": "{{count}} juegos encontrados: {{launchers}}",
    "removeFromList": "Quitar de la lista",
    "boostTitle": "Game Boost",
    "boostDesc": "Mientras un juego está abierto, Zanrei cambia Windows al plan de energía de alto rendimiento y lo restablece al salir.",
    "boostActive": "Activo: {{game}} está en ejecución.",
    "boostWaiting": "Esperando a que se inicie un juego.",
    "boostOff": "Desactivado.",
    "driver": "Controlador",
    "driverCheck": "Buscar actualizaciones",
    "opt": {
      "gpu": {
        "name": "Usar la GPU de alto rendimiento",
        "desc": "Indica a Windows que ejecute este juego en tu tarjeta gráfica más rápida."
      },
      "fso": {
        "name": "Desactivar las optimizaciones de pantalla completa",
        "desc": "Puede reducir los tirones o el retraso de entrada en algunos juegos antiguos."
      },
      "priority": {
        "name": "Iniciar con prioridad alta de CPU",
        "desc": "Da al juego más tiempo de procesador que a los programas en segundo plano."
      }
    }
  },
  "graphics": {
    "oldTitle": "Este controlador tiene más de dos años",
    "oldBody": "Los controladores nuevos corrigen bloqueos y añaden soporte para juegos nuevos. Descarga el más reciente del fabricante.",
    "maker": "Fabricante",
    "driverDate": "Fecha del controlador",
    "memory": "Memoria de vídeo",
    "tuneTitle": "Ajustar Windows para jugar",
    "tuneBody": "La programación de GPU, las optimizaciones para juegos en ventana y la frecuencia de actualización variable están en la página Juegos.",
    "openGaming": "Abrir Juegos"
  },
  "restore": {
    "entryTitle_many": "{{count}} ajustes cambiados",
    "entryTitle_one": "{{count}} ajuste cambiado",
    "entryTitle_other": "{{count}} ajustes cambiados",
    "manual": "Punto de restauración manual",
    "empty": "Aún no hay puntos de restauración.",
    "create": "Crear punto de restauración",
    "creating": "Creando…",
    "rollback": "Deshacer",
    "rolledBack": "Deshecho",
    "openSystem": "Abrir Restaurar sistema de Windows",
    "confirmTitle": "¿Deshacer este punto de restauración?",
    "confirmBody": "Se revertirán todos los cambios guardados en este punto.",
    "failed": "Algo salió mal",
    "deleteTitle": "¿Eliminar este punto de restauración?",
    "deleteBody": "Lo que cambió se queda como está, pero Zanrei ya no podrá deshacerlo. También se elimina el punto de restauración de Windows correspondiente.",
    "deleteAll": "Eliminar todos",
    "deleteAllTitle": "¿Eliminar todos los puntos de restauración?",
    "deleteAllBody": "No se toca nada de lo que se cambió, pero nada de ello se podrá deshacer ya desde Zanrei. También se eliminan los puntos de restauración de Windows correspondientes.",
    "deleted_many": "{{count}} puntos de restauración eliminados",
    "deleted_one": "{{count}} punto de restauración eliminado",
    "deleted_other": "{{count}} puntos de restauración eliminados",
    "windowsKept_many": "No se pudieron quitar {{count}} puntos de restauración de Windows. Quítalos en Protección del sistema si quieres que desaparezcan.",
    "windowsKept_one": "No se pudo quitar {{count}} punto de restauración de Windows. Quítalo en Protección del sistema si quieres que desaparezca.",
    "windowsKept_other": "No se pudieron quitar {{count}} puntos de restauración de Windows. Quítalos en Protección del sistema si quieres que desaparezcan."
  },
  "startup": {
    "count": "{{on}} de {{total}} se inician con Windows",
    "empty": "No se encontraron programas de inicio.",
    "system": "Componente de Windows",
    "scope": {
      "User": "Tu cuenta",
      "AllUsers": "Todos los usuarios"
    },
    "note": "Desactivar un programa solo evita que se inicie con Windows. Sigue instalado y puedes volver a activarlo. Desactiva solo lo que reconozcas."
  },
  "disk": {
    "title": "Limpieza de disco",
    "desc": "Los archivos eliminados no pasan por la Papelera de reciclaje y no se pueden recuperar. Zanrei mide primero y quita solo lo que marques.",
    "software": "Quitar software",
    "nothing": "Ahora mismo no hay nada que limpiar.",
    "measure": "Medir de nuevo",
    "selected": "{{size}} seleccionados",
    "run": "Eliminar lo seleccionado",
    "confirmTitle": "¿Eliminar estos archivos para siempre?",
    "confirmBody": "No se puede deshacer. Los archivos en uso se omiten.",
    "done": "Se liberaron {{size}}",
    "item": {
      "temp": {
        "name": "Archivos temporales",
        "desc": "Archivos de trabajo que los programas dejaron en tu carpeta temporal."
      },
      "windows_temp": {
        "name": "Archivos temporales de Windows",
        "desc": "Archivos de trabajo que quedaron en la carpeta temporal del sistema."
      },
      "crash_dumps": {
        "name": "Volcados de memoria e informes de errores",
        "desc": "Volcados de memoria e informes que Windows guardó tras los bloqueos."
      },
      "update_cache": {
        "name": "Actualizaciones de Windows descargadas",
        "desc": "Archivos de actualización que Windows ya instaló. Windows los vuelve a descargar si los necesita."
      },
      "delivery_cache": {
        "name": "Caché de Optimización de distribución",
        "desc": "Fragmentos de actualizaciones guardados para compartir con otros PC."
      },
      "browser_cache": {
        "name": "Cachés del navegador",
        "desc": "Cachés de páginas de Edge, Chrome, Brave y Firefox. Cierra antes el navegador. Los sitios cargan un poco más lento una vez, mientras la caché se vuelve a llenar."
      },
      "recycle_bin": {
        "name": "Papelera de reciclaje",
        "desc": "Todo lo que hay en la Papelera de reciclaje, en todas las unidades."
      }
    }
  },
  "logs": {
    "copy": "Copiar",
    "copied": "Copiado al portapapeles",
    "openFolder": "Abrir carpeta",
    "clear": "Borrar",
    "filter": "Filtrar por nivel",
    "empty": "Aún no hay nada registrado.",
    "level": {
      "all": "Todo",
      "Info": "Información",
      "Warn": "Advertencias",
      "Error": "Errores"
    }
  },
  "settings": {
    "general": "General",
    "language": "Idioma",
    "automation": "Cuánto hace Zanrei por sí solo",
    "background": "Segundo plano",
    "runInBackground": "Seguir ejecutándose en segundo plano",
    "runInBackgroundDesc": "Al cerrar la ventana, Zanrei se oculta en la bandeja en lugar de salir.",
    "startWithWindows": "Iniciar con Windows",
    "startWithWindowsDesc": "Se inicia discretamente en la bandeja al iniciar sesión.",
    "updates": "Actualizaciones",
    "version": "Versión {{version}}",
    "lastChecked": "Última comprobación: {{when}}",
    "checkNow": "Comprobar ahora",
    "checking": "Comprobando…",
    "autoUpdate": "Instalar actualizaciones automáticamente",
    "autoUpdateDesc": "Zanrei descarga e instala las nuevas versiones por sí solo, nunca mientras hay un juego abierto. Desactívalo para que te pregunte antes.",
    "updateAvailable": "La versión {{version}} está disponible",
    "updateTo": "Actualizar a {{version}}",
    "upToDate": "Estás al día.",
    "updateFailed": "No se pudo comprobar si hay actualizaciones.",
    "install": "Instalar y reiniciar",
    "installing": "Instalando…",
    "tools": "Herramientas",
    "quit": "Salir de Zanrei",
    "quitDesc": "Cierra la aplicación por completo, incluido el vigilante en segundo plano."
  },
  "os": {
    "flavor": {
      "title": "Se detectó {{name}} {{version}}",
      "badgeHint": "{{name}} es un Windows modificado",
      "body": "Este PC usa un Windows modificado. Muchos ajustes de Zanrei pueden estar ya activados porque {{name}} los aplicó, y cada interruptor muestra cómo está configurado Windows ahora mismo.",
      "keep": "Zanrei solo cambia lo que {{name}} dejó intacto, y cada cambio se puede seguir deshaciendo desde Restaurar.",
      "restore": "Los puntos de restauración necesitan Protección del sistema. Si está desactivada, Zanrei la activa en la unidad del sistema antes de cambiar nada.",
      "own": "Cambia los ajustes que gestiona {{name}} en las herramientas propias de {{name}}, no aquí, para que no se deshagan entre sí.",
      "docs": "Documentación de {{name}}"
    },
    "win10": {
      "title": "Windows 10 ya no recibe actualizaciones de seguridad gratuitas",
      "body": "Microsoft terminó el soporte habitual de Windows 10 el 14 de octubre de 2025. El PC sigue funcionando, pero los problemas de seguridad nuevos ya no se corrigen gratis. Si puede ejecutar Windows 11, pasarse a él es la opción más segura.",
      "guide": "Leer la guía",
      "microsoft": "Anuncio de Microsoft"
    }
  },
  "guide": {
    "tab": {
      "yourself": "Hazlo tú mismo",
      "fresh": "Empezar de cero"
    },
    "link": {
      "nvidia": "Controladores de NVIDIA",
      "amd": "Controladores de AMD",
      "intel": "Controladores de Intel",
      "atlasDrivers": "Guía de controladores",
      "crystaldiskinfo": "CrystalDiskInfo",
      "hwinfo": "HWiNFO",
      "atlasXmp": "Guía paso a paso",
      "atlasRebar": "Guía paso a paso",
      "site": "Sitio web",
      "docs": "Guía de instalación",
      "github": "GitHub",
      "youtube": "Vídeos en YouTube",
      "win10Ended": "Fin del soporte de Windows 10",
      "requirements": "Requisitos de Windows 11",
      "mediaHelp": "Instrucciones de Microsoft",
      "win11": "Descargar Windows 11",
      "win10": "Descargar Windows 10",
      "rufus": "Rufus"
    },
    "goto": {
      "graphics": "Abrir Gráficos",
      "startup": "Abrir Inicio",
      "library": "Abrir Biblioteca"
    },
    "impact": {
      "big": "Gran efecto",
      "medium": "Efecto medio",
      "small": "Efecto pequeño"
    },
    "effort": {
      "easy": "Fácil",
      "medium": "Requiere cuidado",
      "careful": "Con precaución"
    },
    "yourself": {
      "intro": "Zanrei puede cambiar lo que hace Windows, pero algunas de las mayores mejoras están fuera de Windows: en la BIOS, en el hardware, en los controladores y dentro de tus juegos. Estos pasos los haces tú. Empieza por arriba; los primeros grupos son los más fáciles.",
      "honest": "Cuánto ayuda cada uno depende de tu PC. No los hemos medido, así que las etiquetas de efecto son nuestra valoración, no una medición."
    },
    "group": {
      "games": {
        "title": "En tus juegos",
        "desc": "Normalmente, la forma más rápida de conseguir más fotogramas."
      },
      "windows": {
        "title": "En Windows",
        "desc": "Ajustes que Zanrei no puede o no debe cambiar por ti."
      },
      "drivers": {
        "title": "Controladores",
        "desc": "El software que permite a Windows usar bien tu hardware."
      },
      "hardware": {
        "title": "Hardware",
        "desc": "Requiere un destornillador, una compra o ambos."
      },
      "bios": {
        "title": "En la BIOS",
        "desc": "Ajustes del firmware del PC, antes de que arranque Windows. Cambia solo los que se nombran aquí."
      }
    },
    "items": {
      "game_settings": {
        "title": "Baja los ajustes que más fotogramas cuestan",
        "why": "La forma más rápida de tener más FPS casi siempre está dentro del juego, no en Windows.",
        "s1": "Pon el juego en Pantalla completa (o Sin bordes en juegos recientes) a la resolución nativa de tu pantalla.",
        "s2": "Si el juego ofrece un escalador (DLSS, FSR o XeSS), actívalo y pon la escala de renderizado en torno al 75 a 85 por ciento.",
        "s3": "Baja primero Sombras, Niebla o efectos volumétricos, Reflejos y Distancia de visión. Son los que más cuestan para la menor diferencia visible. Después viene el antialiasing.",
        "s4": "Pon un límite de fotogramas (por ejemplo, la frecuencia de actualización de tu pantalla) para que el PC no vaya al máximo sin ganar nada. Desactiva V-Sync si el juego se nota lento.",
        "s5": "Cambia una cosa cada vez y mira un contador de FPS (Steam: Parámetros, En la partida, Contador de FPS en la partida) para ver qué ayudó de verdad."
      },
      "laptop_power": {
        "title": "Portátiles: enchúfalo y elige el modo de energía adecuado",
        "why": "Con batería, un portátil frena mucho el procesador y la tarjeta gráfica. Jugar desenchufado puede costar gran parte del rendimiento.",
        "s1": "Conecta el cargador que vino con el portátil.",
        "s2": "Windows 11: abre Configuración, Sistema, Energía y batería y pon Modo de energía en Máximo rendimiento. Windows 10: haz clic en el icono de batería de la barra de tareas y mueve el control a Máximo rendimiento.",
        "s3": "El Game Boost de Zanrei también cambia el plan de energía mientras hay un juego abierto y lo restablece después."
      },
      "refresh_rate": {
        "title": "Pon tu monitor a su frecuencia de actualización más alta",
        "why": "Muchas pantallas vendidas como de 120, 144 o 240 Hz siguen funcionando a 60 Hz hasta que lo cambias. Los juegos y el escritorio se ven más fluidos a la frecuencia real, y no cuesta nada.",
        "s1": "Abre Configuración, Sistema, Pantalla, Pantalla avanzada.",
        "s2": "Elige tu monitor y abre Elegir una frecuencia de actualización.",
        "s3": "Elige el valor más alto y haz clic en Mantener cambios.",
        "s4": "Si falta el valor más alto, prueba otro cable (DisplayPort o un cable HDMI más nuevo) e instala el controlador gráfico."
      },
      "oem_software": {
        "title": "Quita el software de prueba y los ayudantes del fabricante",
        "why": "Los PC nuevos suelen traer antivirus de prueba (McAfee, Norton), herramientas \"aceleradoras\" y apps auxiliares que se ejecutan todo el tiempo. La página Limpieza de Zanrei quita las apps incluidas con Windows, pero no estas.",
        "s1": "Abre Configuración, Aplicaciones, Aplicaciones instaladas.",
        "s2": "Busca antivirus de prueba, herramientas \"booster\" u \"optimizador\" y apps auxiliares del fabricante que nunca usas.",
        "s3": "Desinstálalas. La Seguridad de Windows gratuita que viene integrada basta para la mayoría.",
        "s4": "Después, revisa la página Inicio de Zanrei por si queda algo.",
        "caution": "Conserva los actualizadores de controladores y firmware del fabricante si no sabes qué hacen, y no quites tu único antivirus."
      },
      "browser": {
        "title": "Aligera el navegador",
        "why": "En un PC con poca memoria, el navegador suele ser lo que más memoria usa.",
        "s1": "Abre la configuración del navegador, busca Ahorro de memoria (Chrome) o Pestañas en suspensión (Edge) y actívalo.",
        "s2": "Abre la lista de extensiones y quita las que no uses. Cada una se ejecuta en todas las pestañas.",
        "s3": "Cierra las pestañas que no estés leyendo. Guárdalas en marcadores.",
        "s4": "No dejes un navegador con muchas pestañas abiertas mientras juegas."
      },
      "overlays": {
        "title": "Desactiva las superposiciones que no uses",
        "why": "Las superposiciones de Discord, Steam, NVIDIA y Xbox se enganchan a cada juego. Cada una cuesta un poco y a veces provoca tirones o bloqueos.",
        "s1": "Discord: Ajustes de usuario, Superposición del juego, desactívala.",
        "s2": "Steam: Parámetros, En la partida, desactiva Habilitar la interfaz de Steam en el juego (puedes seguir activándola por juego).",
        "s3": "NVIDIA App o GeForce Experience: Configuración, desactiva la superposición en el juego. La grabación de la Xbox Game Bar está en la página Juegos de Zanrei."
      },
      "gpu_driver": {
        "title": "Instala el controlador gráfico correcto",
        "why": "Los controladores nuevos corrigen errores de juegos y a menudo aceleran las cosas. Un controlador muy antiguo, o el básico \"Adaptador de pantalla básico de Microsoft\", deja mucho rendimiento sin usar.",
        "s1": "Abre la página Gráficos de Zanrei. Muestra tu tarjeta, la antigüedad de su controlador y un enlace a la página de descarga del fabricante.",
        "s2": "Descarga el controlador para tu modelo exacto desde NVIDIA, AMD o Intel, no desde una herramienta \"actualizadora de controladores\".",
        "s3": "Ejecuta el instalador. Con NVIDIA elige Personalizada y marca Realizar una instalación limpia. AMD tiene una opción similar de restablecimiento de fábrica.",
        "s4": "Reinicia el PC cuando el instalador lo pida.",
        "caution": "En portátiles, el controlador del fabricante del portátil es la opción segura. El controlador genérico del fabricante del chip a veces no se instala o desactiva funciones."
      },
      "chipset": {
        "title": "Instala el controlador del chipset",
        "why": "Al principio Windows usa controladores genéricos para la placa base. El controlador de chipset del fabricante añade el comportamiento de energía y rendimiento adecuado para tu procesador.",
        "s1": "Averigua el modelo de tu placa base o portátil: pulsa Win + R, escribe msinfo32 y lee Producto de placa base (o Modelo del sistema).",
        "s2": "Abre la página de soporte del fabricante de la placa base o del portátil, o la de AMD o Intel para el controlador del chipset.",
        "s3": "Descarga el controlador del chipset, instálalo y reinicia."
      },
      "disk_health": {
        "title": "Comprueba que la unidad está sana",
        "why": "Una unidad que falla hace que todo el PC se cuelgue y se congele, y tarde o temprano pierde datos.",
        "s1": "Instala CrystalDiskInfo (gratis) y ábrelo.",
        "s2": "Bueno está bien. Precaución o Malo significa: haz una copia de seguridad ya y cambia la unidad.",
        "s3": "No uses herramientas de reparación u optimización en una unidad marcada como Precaución o Malo hasta que tus datos estén a salvo."
      },
      "cooling": {
        "title": "Limpia el polvo y comprueba las temperaturas",
        "why": "Un procesador o una tarjeta gráfica calientes se frenan solos para protegerse (thermal throttling), lo que parece exactamente un PC lento. Los portátiles antiguos son las víctimas habituales.",
        "s1": "Instala HWiNFO (gratis), ábrelo en modo Solo sensores y juega o trabaja diez minutos mientras miras las temperaturas de la CPU y la GPU.",
        "s2": "Temperaturas que se mantienen cerca de 90 °C o más, o frecuencias que bajan con carga, indican throttling.",
        "s3": "Apaga el PC, desenchúfalo y sopla el polvo de los ventiladores y rejillas con ráfagas cortas de aire comprimido. Sujeta cada ventilador con un palillo para que no gire demasiado rápido.",
        "s4": "Usa una superficie dura y plana o un soporte para el portátil, nunca la cama ni el regazo. Una pasta térmica nueva ayuda en PC antiguos, pero solo si te ves capaz de abrir el disipador.",
        "caution": "Abrir un portátil puede anular su garantía."
      },
      "dual_channel": {
        "title": "Usa dos módulos de memoria en doble canal",
        "why": "Dos módulos iguales dan al procesador el doble de ancho de banda de memoria que uno. Con los gráficos integrados del procesador, que comparten esa memoria, suele ser la mejor mejora por su precio.",
        "s1": "Abre el Administrador de tareas, Rendimiento, Memoria. Ranuras usadas: 1 de 2 o 1 de 4 significa un solo módulo.",
        "s2": "Compra un segundo módulo del mismo tamaño y velocidad que el primero (el mismo modelo si puedes).",
        "s3": "Colócalos en las ranuras que el manual de tu placa base indica para doble canal, a menudo las ranuras 2 y 4 contando desde el procesador.",
        "s4": "Vuelve a mirar el Administrador de tareas y luego activa XMP o EXPO (ver En la BIOS).",
        "caution": "Apaga el PC y desenchúfalo antes de abrirlo. Muchos portátiles tienen la memoria soldada, así que busca primero tu modelo."
      },
      "ram_upgrade": {
        "title": "Añade memoria si casi siempre está llena",
        "why": "Cuando se acaba la memoria, Windows usa el disco y todo da tirones. Ningún ajuste sustituye a la memoria real.",
        "s1": "Mira el indicador de memoria en el Resumen de Zanrei mientras trabajas o juegas. Por encima del 85 por ciento casi siempre significa que te falta.",
        "s2": "Averigua el tipo y el máximo que admite tu PC: busca tu modelo y \"ampliar RAM\", o usa la página de compatibilidad del fabricante.",
        "s3": "8 GB es el mínimo práctico hoy en día. 16 GB es cómodo para jugar.",
        "caution": "Muchos portátiles finos no se pueden ampliar."
      },
      "ssd": {
        "title": "Pasa Windows a un SSD",
        "why": "Si Windows arranca desde un disco duro (HDD), nada de lo que hagas se le acerca. El arranque, abrir programas y cargar juegos van mucho más rápido.",
        "s1": "Abre el Administrador de tareas, Rendimiento, Disco. Ahí aparece el tipo, y el Resumen de Zanrei también lo muestra.",
        "s2": "Elige un SSD SATA o NVMe que admita tu PC (consulta el manual de tu modelo). 256 GB bastan para Windows y unos cuantos programas.",
        "s3": "Lo más limpio es hacer una copia de seguridad, montar el SSD e instalar de cero (ver Empezar de cero). Clonar el disco antiguo también funciona, pero copia su desorden.",
        "s4": "Conserva el disco antiguo como almacenamiento extra o quítalo.",
        "caution": "Haz primero una copia de seguridad. Una instalación limpia borra el disco en el que se instala."
      },
      "xmp": {
        "title": "Activa XMP o EXPO para que la memoria funcione a su velocidad nominal",
        "why": "La memoria se vende a menudo a una velocidad pero funciona más lenta hasta que se activa un perfil en la BIOS. Importa sobre todo en PC que usan los gráficos integrados del procesador, que comparten esta memoria, y en AMD Ryzen.",
        "s1": "Abre el Administrador de tareas, Rendimiento, Memoria y anota la Velocidad. Compárala con la que llevan impresa los módulos (por ejemplo 3200 o 6000).",
        "s2": "Reinicia el PC y pulsa la tecla de la BIOS al arrancar, normalmente Supr o F2. La pantalla del logotipo suele indicarlo.",
        "s3": "Busca el ajuste llamado XMP (Intel), EXPO o DOCP (AMD), o AI Overclock Tuner. Suele estar en la primera pantalla de overclocking o tweaker.",
        "s4": "Elige el Perfil 1 y guarda y sal (normalmente F10).",
        "s5": "De vuelta en Windows, mira otra vez el Administrador de tareas. La velocidad debería coincidir ahora con la de los módulos.",
        "caution": "La mayoría de los PC arrancan sin problemas. Si el tuyo no, apágalo, mantén pulsado el botón de encendido diez segundos y vuelve a intentarlo. La mayoría de las placas vuelven a valores seguros tras un arranque fallido. Los portátiles y muchos PC de oficina no tienen este ajuste, y es normal."
      },
      "rebar": {
        "title": "Activa Resizable BAR",
        "why": "Permite que el procesador use toda la memoria de la tarjeta gráfica a la vez. La mejora es pequeña y varía según el juego, pero es gratis donde se admite (aproximadamente tarjetas gráficas de 2020 en adelante, con un procesador compatible).",
        "s1": "Comprueba la compatibilidad: la herramienta gratuita GPU-Z muestra un campo Resizable BAR, o consulta la página del fabricante de la tarjeta gráfica.",
        "s2": "En la BIOS, activa primero Above 4G Decoding y luego Re-Size BAR Support. Los nombres varían un poco entre fabricantes.",
        "s3": "Guarda, reinicia y vuelve a comprobarlo en GPU-Z.",
        "s4": "Para que funcione, Windows debe estar instalado en modo UEFI (no Legacy ni CSM).",
        "caution": "Actualiza primero el controlador gráfico. Cambiar ajustes de la BIOS que no entiendes puede impedir que el PC arranque, así que cambia solo los que se nombran aquí."
      }
    },
    "fresh": {
      "title": "Por qué empezar de cero",
      "intro": "Empezar de cero borra la unidad del sistema e instala un Windows nuevo. Después no se puede deshacer nada, pero un Windows limpio es el mejor punto de partida que existe, y puede hacer cosas que ninguna app puede hacer en un Windows en marcha.",
      "gain": {
        "clean": "Sin restos: años de programas instalados y a medio quitar, controladores viejos, servicios en segundo plano y cualquier malware desaparecen.",
        "bloat": "Sin desorden del fabricante: instalas Windows desde la imagen propia de Microsoft, no la que personalizó el fabricante.",
        "components": "Partes que no se pueden quitar de un Windows en marcha. Proyectos como AtlasOS aplican sus cambios justo después de la instalación, antes de que algo dependa de esas partes.",
        "layout": "Una distribución de disco correcta: UEFI moderno, el sistema en la unidad más rápida, nada sobrante de una antigua configuración MBR.",
        "known": "Un estado conocido. Es más fácil saber qué cambió de verdad el rendimiento cuando todo parte del mismo punto."
      },
      "warning": "Empezar de cero es opcional. Zanrei funciona en tu Windows actual, y todo lo que hace se puede deshacer. Una reinstalación no se puede deshacer."
    },
    "atlas": {
      "title": "AtlasOS",
      "badge": "Para entusiastas",
      "intro": "Un proyecto de código abierto (unas 22.000 estrellas en GitHub) que ajusta un Windows 11 recién instalado para tener menos latencia, menos procesos en segundo plano y menos telemetría. Se aplica con un pequeño instalador llamado AME Wizard tras una instalación limpia de Windows, y el playbook que aplica es de código abierto y cualquiera puede leerlo. Lo hacen otras personas y Zanrei no está afiliado a él. La última versión en el momento de escribir esto es la v0.5.0.",
      "fact": {
        "w11": "Necesita Windows 11 (24H2 o 25H2 en el momento de escribir esto). Atlas ya no es compatible con Windows 10.",
        "pro": "Usa Windows Pro o Enterprise. Windows Home no es compatible.",
        "revert": "Quitar Atlas significa reinstalar Windows.",
        "security": "Atlas te deja elegir cuánta seguridad conservar, por ejemplo Defender y Windows Update. Lee su página de seguridad antes de decidir.",
        "unofficial": "Zanrei no ha medido Atlas. Los resultados varían de un PC a otro."
      },
      "videos": "Mucha gente ha grabado pruebas de antes y después, así que buscar AtlasOS en YouTube muestra cómo se comporta en PC como el tuyo. Toma cualquier vídeo aislado con cautela.",
      "others": "Existen proyectos similares, por ejemplo"
    },
    "win10": {
      "title": "¿Windows 10 u 11?",
      "body": "Microsoft dejó de dar actualizaciones de seguridad gratuitas para Windows 10 el 14 de octubre de 2025. Si tu PC cumple los requisitos de Windows 11, instala Windows 11. Si no, un Windows 10 limpio sigue funcionando, pero mantén el navegador actualizado, evita descargas arriesgadas y planea cambiar de PC. La página de Microsoft indica las opciones de actualizaciones extendidas de pago."
    },
    "install": {
      "title": "Cómo reinstalar Windows (10 u 11)",
      "intro": "Los pasos son los mismos para ambos. Calcula una o dos horas y no apagues el PC mientras se instala.",
      "atlasNote": "Si quieres AtlasOS, detente tras el primer inicio y sigue desde ahí su propia guía de instalación. Sus pasos cambian entre versiones, así que usa los actuales.",
      "step": {
        "backup": {
          "title": "Haz una copia de lo importante",
          "body": "Copia documentos, fotos, partidas guardadas y marcadores del navegador a una unidad externa o a la nube. Apunta las claves de licencia de los programas de pago. Todo lo que hay en la unidad del sistema se borrará."
        },
        "activation": {
          "title": "Comprueba que Windows está activado",
          "body": "Abre Configuración, Sistema, Activación. \"Activado con una licencia digital\" significa que Windows se activa solo tras la reinstalación. Puede que tengas que iniciar sesión con la misma cuenta Microsoft."
        },
        "drivers": {
          "title": "Descarga antes los controladores",
          "body": "En otro dispositivo, descarga el controlador de red (Wi-Fi o Ethernet) para tu placa base o portátil y guárdalo en una memoria USB. Sin él, el Windows nuevo puede quedarse sin internet. Descarga también el controlador gráfico."
        },
        "media": {
          "title": "Consigue Windows de Microsoft",
          "body": "Usa la Herramienta de creación de medios de Microsoft y elige Crear medios de instalación con una memoria USB de al menos 8 GB (se borrará). O descarga el archivo ISO y grábalo en la memoria con Rufus."
        },
        "boot": {
          "title": "Arranca desde la memoria USB",
          "body": "Reinicia y pulsa la tecla del menú de arranque al iniciar el PC, a menudo F12, F11, F8, Esc o Supr. La pantalla del logotipo del fabricante suele indicarla. Elige la memoria USB, preferiblemente la entrada que empieza por UEFI."
        },
        "setup": {
          "title": "Ejecuta el instalador",
          "body": "Elige el idioma y luego Instalar ahora. \"No tengo clave de producto\" vale si Windows estaba activado antes. Elige la misma edición que tenías (Pro o Home), acepta los términos de licencia y elige Personalizada: instalar solo Windows."
        },
        "drive": {
          "title": "Elige la unidad",
          "body": "Selecciona la unidad donde irá Windows. Para borrarla por completo, elimina sus particiones, selecciona el espacio sin asignar y haz clic en Siguiente. No toques las unidades que guardan tus archivos. Sus tamaños ayudan a distinguirlas."
        },
        "firstrun": {
          "title": "Primer inicio",
          "body": "Windows se reinicia varias veces. Elige tu región y teclado y conéctate a la red, usando el controlador de la memoria USB si hace falta. Windows 11 te pide iniciar sesión con una cuenta Microsoft."
        },
        "update": {
          "title": "Actualiza e instala los controladores",
          "body": "Ejecuta Windows Update hasta que no quede nada, luego instala los controladores del chipset y gráficos y reinicia."
        },
        "zanrei": {
          "title": "Después instala Zanrei",
          "body": "Ejecuta el instalador de Zanrei. Crea un punto de restauración, aplica los ajustes adecuados para tu PC y muestra lo que queda por hacer."
        }
      }
    }
  },
  "tweaks": {
    "telemetry": {
      "name": "Reducir los datos de diagnóstico",
      "desc": "Pide a Windows que envíe solo los datos de diagnóstico mínimos obligatorios y detiene las solicitudes de comentarios."
    },
    "advertising_id": {
      "name": "Desactivar el identificador de publicidad",
      "desc": "Impide que las apps usen un identificador por usuario para personalizar anuncios."
    },
    "tailored_experiences": {
      "name": "Desactivar las experiencias personalizadas",
      "desc": "Impide que Windows use tus datos de diagnóstico para sugerirte consejos y anuncios."
    },
    "activity_history": {
      "name": "Desactivar el historial de actividad",
      "desc": "Impide que Windows recopile y suba las apps y archivos que abres."
    },
    "suggestions": {
      "name": "Quitar sugerencias y anuncios",
      "desc": "Oculta apps promocionadas y consejos en Inicio, Configuración y la pantalla de bloqueo, y bloquea instalaciones silenciosas de apps."
    },
    "web_search": {
      "name": "Buscar solo en este PC",
      "desc": "Quita los resultados web de la búsqueda del menú Inicio, para que sea más rápida y privada."
    },
    "consumer_features": {
      "name": "Bloquear la instalación de apps promocionadas",
      "desc": "Impide que Windows instale apps patrocinadas, como juegos, después de la configuración o de las actualizaciones."
    },
    "delivery_optimization": {
      "name": "No subir actualizaciones a otros PC",
      "desc": "Windows descarga las actualizaciones solo de Microsoft en lugar de compartirlas a través de tu conexión."
    },
    "telemetry_tasks": {
      "name": "Desactivar las tareas programadas de telemetría",
      "desc": "Apaga las tareas en segundo plano que recopilan datos de compatibilidad y uso."
    },
    "diagnostic_services": {
      "name": "Desactivar los servicios de telemetría",
      "desc": "Detiene los servicios Experiencias del usuario y telemetría asociadas y de mensajes push. Surte efecto tras reiniciar."
    },
    "location": {
      "name": "Desactivar los servicios de ubicación",
      "desc": "Bloquea el acceso a la ubicación para todas las apps. Mapas y Buscar mi dispositivo no funcionarán."
    },
    "background_apps": {
      "name": "Impedir que las apps de la Store se ejecuten en segundo plano",
      "desc": "Ahorra memoria y batería en PC antiguos. Las apps de la Store no actualizarán iconos ni notificaciones mientras estén cerradas."
    },
    "error_reporting": {
      "name": "Desactivar Informe de errores de Windows",
      "desc": "Impide que se recopilen y envíen informes de bloqueos. Pierdes el diagnóstico de bloqueos integrado."
    },
    "windows_ai": {
      "name": "Desactivar Copilot y Recall",
      "desc": "Desactiva el botón de Copilot y el análisis de datos con IA que toma capturas de tu pantalla."
    },
    "animations": {
      "name": "Reducir las animaciones",
      "desc": "Desactiva la mayoría de las animaciones de ventanas y los retrasos de menús para que los PC antiguos parezcan más rápidos. Cierra sesión para aplicarlo."
    },
    "transparency": {
      "name": "Desactivar los efectos de transparencia",
      "desc": "Quita el desenfoque transparente de las ventanas y la barra de tareas, lo que ahorra potencia gráfica en tarjetas antiguas."
    },
    "startup_delay": {
      "name": "Quitar el retraso de inicio",
      "desc": "Windows espera antes de abrir los programas de inicio. Así se abren justo después de iniciar sesión."
    },
    "edge_background": {
      "name": "Impedir que Edge se ejecute en segundo plano",
      "desc": "Evita que Edge se precargue y se quede en memoria después de cerrarlo. Edge puede mostrar el aviso \"Administrado por tu organización\"."
    },
    "sysmain": {
      "name": "Desactivar SysMain (Superfetch)",
      "desc": "Deja de precargar apps en la memoria. Ayuda en algunos sistemas, pero solo se recomienda con SSD; déjalo activado con discos duros."
    },
    "search_indexing": {
      "name": "Desactivar la indexación de búsqueda",
      "desc": "Detiene el indexador en segundo plano. Ahorra actividad de disco en discos duros antiguos, pero buscar archivos se vuelve más lento."
    },
    "hibernation": {
      "name": "Desactivar la hibernación",
      "desc": "Elimina el archivo de hibernación y libera varios gigabytes. También desactiva el Inicio rápido."
    },
    "high_performance_plan": {
      "name": "Usar el plan de energía de alto rendimiento",
      "desc": "Mantiene el procesador listo a máxima velocidad. Consume más energía; no es ideal para portátiles con batería."
    },
    "svchost_split": {
      "name": "Agrupar los servicios de Windows en menos procesos",
      "desc": "Con más de 3,5 GB de RAM, Windows ejecuta cada servicio en su propio proceso. Volver a agruparlos ahorra memoria y decenas de procesos en segundo plano en PC con 4 a 8 GB. Requiere reiniciar."
    },
    "power_throttling": {
      "name": "Desactivar la limitación de energía",
      "desc": "Impide que Windows ralentice los programas en segundo plano para ahorrar energía. Puede ayudar en equipos de sobremesa antiguos; gasta más batería en portátiles. Requiere reiniciar."
    },
    "multimedia_scheduler": {
      "name": "Dar prioridad a los juegos sobre el multimedia en segundo plano",
      "desc": "Reduce del 20 % al 10 % la parte del tiempo de procesador que Windows reserva para el multimedia en segundo plano, así que más va al juego."
    },
    "foreground_priority": {
      "name": "Favorecer el programa que estás usando",
      "desc": "Da a la ventana en primer plano intervalos de tiempo más cortos y el mayor aumento de prioridad, para que responda mejor en un PC antiguo y saturado."
    },
    "vbs_off": {
      "name": "Desactivar la integridad de memoria (VBS)",
      "desc": "Windows puede ejecutar partes de sí mismo dentro de una máquina virtual por seguridad. En algunos PC eso cuesta fotogramas en los juegos. También quita una capa de protección contra malware: solo para un PC que uses sobre todo para jugar. Requiere reiniciar."
    },
    "game_mode": {
      "name": "Activar el Modo de juego",
      "desc": "Permite que Windows dé prioridad al juego que estás jugando frente a las tareas en segundo plano."
    },
    "game_dvr": {
      "name": "Desactivar la grabación de juegos en segundo plano",
      "desc": "Impide que la Xbox Game Bar grabe en segundo plano, lo que cuesta fotogramas."
    },
    "windowed_optimizations": {
      "name": "Optimizaciones para juegos en ventana",
      "desc": "Mejora la latencia y habilita funciones como Auto HDR en juegos sin bordes y en ventana (Windows 11 22H2+)."
    },
    "vrr": {
      "name": "Frecuencia de actualización variable para juegos en ventana",
      "desc": "Permite que los monitores G-SYNC y FreeSync se sincronicen en juegos en ventana (Windows 11 22H2+). Requiere un monitor compatible."
    },
    "hags": {
      "name": "Programación de GPU acelerada por hardware",
      "desc": "Permite que la tarjeta gráfica gestione su propia memoria. Ayuda a algunos juegos y perjudica a otros. Requiere un controlador de GPU reciente y reiniciar."
    },
    "fullscreen_optimizations": {
      "name": "Desactivar las optimizaciones de pantalla completa en todas partes",
      "desc": "Ejecuta los juegos en pantalla completa exclusiva real. Algunos juegos responden mejor y otros peor. También puedes ajustarlo por juego."
    },
    "mouse_precision": {
      "name": "Desactivar la aceleración del puntero",
      "desc": "Hace que el cursor siga tu mano 1:1, como esperan la mayoría de los shooters. Cierra sesión para aplicarlo."
    },
    "sticky_keys": {
      "name": "Desactivar los atajos de Teclas especiales",
      "desc": "Evita la ventana que aparece al pulsar Mayús cinco veces o mantenerla, que puede interrumpir un juego."
    },
    "file_extensions": {
      "name": "Mostrar las extensiones de archivo",
      "desc": "Muestra .exe, .png, etc., lo que facilita detectar archivos disfrazados."
    },
    "hidden_files": {
      "name": "Mostrar los archivos ocultos",
      "desc": "Muestra los archivos y carpetas ocultos en el Explorador de archivos."
    },
    "end_task": {
      "name": "Añadir \"Finalizar tarea\" al menú de la barra de tareas",
      "desc": "Haz clic derecho en una app de la barra de tareas para cerrarla aunque esté bloqueada (Windows 11 22H2+)."
    },
    "widgets": {
      "name": "Desactivar Widgets y Noticias",
      "desc": "Quita el panel de widgets y las noticias, que ejecutan procesos en segundo plano."
    },
    "long_paths": {
      "name": "Permitir rutas de archivo muy largas",
      "desc": "Elimina el límite de 260 caracteres en las rutas para las apps que lo admiten."
    },
    "no_auto_reboot": {
      "name": "Sin reinicios automáticos con la sesión iniciada",
      "desc": "Windows Update no reiniciará tu PC mientras tengas la sesión iniciada."
    },
    "onedrive_policy": {
      "name": "Detener la sincronización de archivos de OneDrive",
      "desc": "Desactiva la sincronización de archivos de OneDrive mediante directiva sin desinstalarlo."
    },
    "edge_debloat": {
      "name": "Quitar avisos y anuncios de Edge",
      "desc": "Oculta la pantalla de primer inicio, el asistente de compras, las recomendaciones y las recompensas de Edge. Edge puede mostrar el aviso \"Administrado por tu organización\"."
    },
    "remove_edge": {
      "name": "Quitar Microsoft Edge",
      "desc": "Desinstala el navegador Edge e impide que Windows lo vuelva a instalar. Se conserva el runtime de WebView2 que necesitan apps como Zanrei. Esto no se puede deshacer desde Zanrei. Asegúrate antes de tener otro navegador."
    },
    "bloat_apps": {
      "name": "Quitar apps preinstaladas",
      "desc": "Desinstala las apps promocionales de la Store que marques en una lista (Noticias, El Tiempo, Solitario, Candy Crush y similares). Las apps que mucha gente usa, como Spotify o Vincular teléfono, empiezan sin marcar. Xbox, Store, Fotos y Calculadora nunca aparecen. Esto no se puede deshacer desde Zanrei; reinstala lo que eches de menos desde Microsoft Store."
    }
  }
} satisfies Translation<Locale>;
