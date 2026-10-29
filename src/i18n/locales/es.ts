import type { DeepPartial, Locale } from "./en";

// Translated: the interface core. Anything missing here (newer screens, tweak descriptions) falls back to English.
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
    "search": "Buscar"
  },
  "setup": {
    "steps": {
      "welcome": "Bienvenida",
      "recommend": "Recomendado",
      "done": "Listo"
    },
    "scan": {
      "working": "Analizando…"
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
      "start": "Abrir Zanrei"
    }
  },
  "nav": {
    "overview": "Resumen",
    "restore": "Restaurar",
    "settings": "Ajustes"
  },
  "splash": {
    "tagline": "Windows, a tu medida. Todo cambio se puede deshacer."
  },
  "titlebar": {
    "minimize": "Minimizar",
    "close": "Cerrar",
    "closeToTray": "Cerrar (sigue en segundo plano)"
  },
  "overview": {
    "title": "Tu PC",
    "cpu": "Procesador",
    "ram": "Memoria",
    "gpu": "Gráficos",
    "storage": "Almacenamiento",
    "os": "Sistema",
    "noGpu": "No se detectó tarjeta gráfica",
    "cores": "{{physical}} núcleos / {{logical}} hilos",
    "tier": {
      "Legacy": "PC antiguo",
      "Mainstream": "PC de gama media",
      "High": "PC de alto rendimiento"
    }
  },
  "restore": {
    "empty": "Aún no hay puntos de restauración.",
    "create": "Crear punto de restauración",
    "creating": "Creando…",
    "rollback": "Deshacer",
    "rolledBack": "Deshecho",
    "openSystem": "Abrir Restaurar sistema de Windows",
    "confirmTitle": "¿Deshacer este punto de restauración?",
    "confirmBody": "Se revertirán todos los cambios guardados en este punto.",
    "failed": "Algo salió mal"
  },
  "settings": {
    "language": "Idioma"
  }
} satisfies DeepPartial<Locale>;
