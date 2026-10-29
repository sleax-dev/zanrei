import type { DeepPartial, Locale } from "./en";

// Translated: the interface core. Anything missing here (newer screens, tweak descriptions) falls back to English.
export default {
  "common": {
    "next": "Avançar",
    "back": "Voltar",
    "finish": "Concluir",
    "retry": "Tentar novamente",
    "cancel": "Cancelar",
    "confirm": "Confirmar",
    "close": "Fechar",
    "loading": "Carregando…",
    "search": "Pesquisar"
  },
  "setup": {
    "steps": {
      "welcome": "Boas-vindas",
      "recommend": "Recomendado",
      "done": "Concluído"
    },
    "scan": {
      "working": "Verificando…"
    },
    "mode": {
      "title": "Quanto o Zanrei deve fazer?",
      "desc": "Você pode mudar isso a qualquer momento.",
      "manual": {
        "name": "Manual",
        "desc": "Nada acontece a menos que você escolha."
      },
      "recommended": {
        "name": "Recomendado",
        "desc": "O Zanrei sugere melhorias seguras e você confirma cada uma."
      },
      "auto": {
        "name": "Automático",
        "desc": "O Zanrei aplica melhorias seguras sozinho, sempre depois de criar um ponto de restauração."
      }
    },
    "done": {
      "title": "Tudo pronto",
      "start": "Abrir o Zanrei"
    }
  },
  "nav": {
    "overview": "Visão geral",
    "restore": "Restaurar",
    "settings": "Configurações"
  },
  "boost": {
    "label": "Turbo de jogos",
    "on": "Ativado",
    "off": "Desativado"
  },
  "splash": {
    "tagline": "Windows, otimizado. Toda alteração pode ser desfeita."
  },
  "titlebar": {
    "minimize": "Minimizar",
    "close": "Fechar",
    "closeToTray": "Fechar (continua em segundo plano)"
  },
  "overview": {
    "title": "Seu PC",
    "cpu": "Processador",
    "ram": "Memória",
    "gpu": "Placa de vídeo",
    "storage": "Armazenamento",
    "os": "Sistema",
    "noGpu": "Nenhuma placa de vídeo detectada",
    "cores": "{{physical}} núcleos / {{logical}} threads",
    "tier": {
      "Legacy": "PC antigo",
      "Mainstream": "PC intermediário",
      "High": "PC de alto desempenho"
    }
  },
  "restore": {
    "empty": "Ainda não há pontos de restauração.",
    "create": "Criar ponto de restauração",
    "creating": "Criando…",
    "rollback": "Desfazer",
    "rolledBack": "Desfeito",
    "openSystem": "Abrir Restauração do Sistema do Windows",
    "confirmTitle": "Desfazer este ponto de restauração?",
    "confirmBody": "Todas as alterações salvas neste ponto serão revertidas.",
    "failed": "Algo deu errado"
  },
  "settings": {
    "language": "Idioma"
  }
} satisfies DeepPartial<Locale>;
