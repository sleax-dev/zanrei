import type { Locale, Translation } from "./en";

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
    "remove": "Remover",
    "search": "Pesquisar",
    "delete": "Excluir"
  },
  "boost": {
    "label": "Turbo de jogos",
    "on": "Ativado",
    "off": "Desativado"
  },
  "splash": {
    "tagline": "Windows, otimizado. Toda alteração pode ser desfeita.",
    "loading": "Iniciando o Zanrei…"
  },
  "setup": {
    "progress": "Etapa {{current}} de {{total}}",
    "steps": {
      "welcome": "Boas-vindas",
      "recommend": "Recomendado",
      "done": "Concluído"
    },
    "welcome": {
      "title": "Bem-vindo ao Zanrei",
      "body": "O Zanrei ajusta o Windows para o PC que você realmente tem, e toda alteração pode ser desfeita.",
      "p1": "Um ponto de restauração do Windows é criado antes da primeira alteração.",
      "p2": "Você vê o que cada configuração faz antes de ativá-la.",
      "p3": "Nada é enviado a lugar nenhum. Não existe conta.",
      "language": "Idioma",
      "start": "Começar"
    },
    "scan": {
      "working": "Verificando…"
    },
    "recommend": {
      "title": "Recomendado para o seu PC",
      "found_many": "{{count}} configurações combinam com ele.",
      "found_one": "{{count}} configuração combina com ele.",
      "found_other": "{{count}} configurações combinam com ele.",
      "alreadyOn": "Mais {{count}} já estavam configuradas.",
      "pc": "Seu PC",
      "safety": "Primeiro é criado um ponto de restauração. Você pode desfazer tudo na página Restaurar.",
      "failed": "O Zanrei não conseguiu fazer uma alteração e parou. Nada mais foi mexido.",
      "skip": "Pular, vou escolher sozinho",
      "applying": "Aplicando {{done}} de {{total}}…",
      "apply_many": "Aplicar {{count}} configurações",
      "apply_one": "Aplicar {{count}} configuração",
      "apply_other": "Aplicar {{count}} configurações"
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
      "applied_many": "{{count}} configurações foram aplicadas.",
      "applied_one": "{{count}} configuração foi aplicada.",
      "applied_other": "{{count}} configurações foram aplicadas.",
      "nothing": "Nenhuma alteração foi feita.",
      "autoNote": "A partir de agora o Zanrei aplica sozinho as novas recomendações seguras. O que você desativar continua desativado. Altere isso em Configurações.",
      "manualNote": "O Zanrei vai sugerir melhorias e esperar a sua aprovação. Altere isso em Configurações.",
      "start": "Abrir o Zanrei"
    }
  },
  "nav": {
    "label": "Principal",
    "countLabel": "{{on}} de {{total}} ativas",
    "newErrors_many": "{{count}} erros novos",
    "newErrors_one": "{{count}} erro novo",
    "newErrors_other": "{{count}} erros novos",
    "overview": "Visão geral",
    "privacy": "Privacidade",
    "performance": "Desempenho",
    "startup": "Inicialização",
    "gaming": "Jogos",
    "windows": "Windows",
    "cleanup": "Limpeza",
    "library": "Biblioteca",
    "graphics": "Gráficos",
    "guide": "Guia",
    "restore": "Restaurar",
    "logs": "Registro",
    "settings": "Configurações",
    "group": {
      "optimize": "Otimizar",
      "games": "Jogos",
      "tools": "Ferramentas"
    }
  },
  "pageDesc": {
    "privacy": "Impeça o Windows de coletar e compartilhar mais do que precisa.",
    "performance": "Deixe um PC antigo ou sobrecarregado mais rápido.",
    "startup": "Escolha quais programas iniciam com o Windows. Menos na inicialização significa um início mais rápido e mais memória livre.",
    "gaming": "Menos interrupções e menos sobrecarga enquanto você joga.",
    "windows": "Pequenas mudanças na aparência e no comportamento do Windows.",
    "cleanup": "Libere espaço em disco e remova softwares que você não pediu. Arquivos excluídos e programas removidos não podem ser recuperados.",
    "library": "O Zanrei encontra seus jogos instalados e ajusta o Windows para cada um.",
    "graphics": "Sua placa de vídeo e o driver dela.",
    "restore": "Toda alteração do Zanrei fica salva aqui e pode ser desfeita. Pontos de restauração de que você não precisa mais podem ser excluídos.",
    "guide": "O que só você pode fazer, como configurações da BIOS, etapas de hardware e drivers, e como recomeçar com um Windows limpo.",
    "logs": "O que o Zanrei fez e o que deu errado. Compartilhe quando pedir ajuda.",
    "settings": "Como o Zanrei inicia, se atualiza e se comporta."
  },
  "titlebar": {
    "minimize": "Minimizar",
    "close": "Fechar",
    "closeToTray": "Fechar (continua em segundo plano)"
  },
  "toast": {
    "applied_many": "{{count}} configurações aplicadas",
    "applied_one": "{{count}} configuração aplicada",
    "applied_other": "{{count}} configurações aplicadas",
    "nothingToApply": "Nada mais para aplicar",
    "viewLog": "Ver registro"
  },
  "restart": {
    "Explorer": "O Explorador de Arquivos precisa ser reiniciado para concluir as alterações.",
    "SignOut": "Saia e entre novamente para concluir as alterações.",
    "Reboot": "Reinicie o Windows para concluir as alterações.",
    "because": "Por causa de: {{names}}",
    "explorerButton": "Reiniciar o Explorador",
    "rebootButton": "Reiniciar agora",
    "signOutButton": "Sair agora",
    "signOutTitle": "Sair do Windows?",
    "signOutBody": "Você sairá imediatamente. Salve seu trabalho antes.",
    "confirmTitle": "Reiniciar o Windows?",
    "confirmBody": "O Windows será reiniciado em {{seconds}} segundos. Salve seu trabalho antes. Você pode cancelar até lá.",
    "countdown": "Reiniciando em {{seconds}} s…"
  },
  "overview": {
    "title": "Seu PC",
    "loading": "Verificando seu PC…",
    "tier": {
      "Legacy": "PC antigo",
      "Mainstream": "PC intermediário",
      "High": "PC de alto desempenho"
    },
    "build": "Build {{build}}",
    "os": "Sistema",
    "cpu": "Processador",
    "ram": "Memória",
    "gpu": "Placa de vídeo",
    "storage": "Armazenamento",
    "noGpu": "Nenhuma placa de vídeo detectada",
    "cores": "{{physical}} núcleos / {{logical}} threads",
    "freeOf": "{{free}} livres de {{total}}",
    "summaryTodo_many": "{{count}} configurações recomendadas estão prontas.",
    "summaryTodo_one": "{{count}} configuração recomendada está pronta.",
    "summaryTodo_other": "{{count}} configurações recomendadas estão prontas.",
    "summaryDone": "Tudo o que é recomendado já está ativado.",
    "apply": "Aplicar {{count}}",
    "safetyNote": "Primeiro é criado um ponto de restauração, e cada alteração pode ser desfeita."
  },
  "live": {
    "title": "Agora mesmo",
    "desc": "Estes números mudam quando as otimizações funcionam. Compare-os depois de reiniciar.",
    "cpu": "Processador",
    "ram": "Memória em uso",
    "ramTotal": "/ {{total}}",
    "processes": "Processos em execução",
    "startup": "Programas de inicialização"
  },
  "bloat": {
    "pick": "Só as apps que marcares são removidas. As que muita gente usa ficam desmarcadas.",
    "mayUse": "talvez a uses",
    "none": "Nenhuma das apps removíveis está instalada.",
    "remove_many": "Remover {{count}} apps",
    "remove_one": "Remover {{count}} app",
    "remove_other": "Remover {{count}} apps"
  },
  "optimize": {
    "forThisPc": "Recomendado para este PC",
    "more": "Mais opções",
    "applyAll": "Aplicar todas ({{count}})",
    "empty": "Nenhum resultado.",
    "apply": "Aplicar",
    "irreversible": "Não pode ser desfeito",
    "acknowledge": "Entendo que isso não pode ser desfeito",
    "partial": "Aplicado em parte",
    "unavailable": "Indisponível neste PC",
    "category": {
      "Privacy": "Privacidade",
      "Performance": "Desempenho",
      "Gaming": "Jogos",
      "Interface": "Interface",
      "System": "Sistema",
      "Cleanup": "Limpeza"
    },
    "risk": {
      "Safe": "Seguro",
      "Moderate": "Moderado",
      "Advanced": "Avançado"
    },
    "needs": {
      "Explorer": "Reinicia o Explorador",
      "SignOut": "Exige sair da conta",
      "Reboot": "Exige reiniciar"
    },
    "confirm": {
      "Safe": "Esta é uma alteração de baixo risco.",
      "Moderate": "Isso muda o comportamento do Windows. Pode ser desativado de novo, e primeiro é criado um ponto de restauração.",
      "Advanced": "Esta é uma alteração avançada. Leia a descrição com atenção. Primeiro é criado um ponto de restauração.",
      "irreversible": "Isso não pode ser desfeito. O Zanrei não consegue reverter, e não dá para contar com um ponto de restauração para isso."
    }
  },
  "games": {
    "rescan": "Procurar de novo",
    "add": "Adicionar jogo",
    "scanning": "Procurando jogos…",
    "empty": "Nenhum jogo encontrado ainda. Adicione um manualmente ou instale um jogo pela Steam, Epic, GOG, Xbox, Ubisoft, EA, Battle.net ou Riot.",
    "yourGames": "Seus jogos",
    "optionsOn_many": "{{count}} opções ativadas",
    "optionsOn_one": "{{count}} opção ativada",
    "optionsOn_other": "{{count}} opções ativadas",
    "found_many": "{{count}} jogos encontrados: {{launchers}}",
    "found_one": "{{count}} jogo encontrado: {{launchers}}",
    "found_other": "{{count}} jogos encontrados: {{launchers}}",
    "removeFromList": "Remover da lista",
    "boostTitle": "Game Boost",
    "boostDesc": "Enquanto um jogo está aberto, o Zanrei muda o Windows para o plano de energia de alto desempenho e volta ao normal quando você sai.",
    "boostActive": "Ativo: {{game}} está em execução.",
    "boostWaiting": "Aguardando um jogo iniciar.",
    "boostOff": "Desativado.",
    "driver": "Driver",
    "driverCheck": "Verificar atualizações",
    "opt": {
      "gpu": {
        "name": "Usar a GPU de alto desempenho",
        "desc": "Diz ao Windows para rodar este jogo na sua placa de vídeo mais rápida."
      },
      "fso": {
        "name": "Desativar otimizações de tela inteira",
        "desc": "Pode reduzir travadinhas ou atraso de entrada em alguns jogos antigos."
      },
      "priority": {
        "name": "Iniciar com prioridade alta de CPU",
        "desc": "Dá ao jogo mais tempo de processador que aos programas em segundo plano."
      }
    }
  },
  "graphics": {
    "oldTitle": "Este driver tem mais de dois anos",
    "oldBody": "Drivers novos corrigem travamentos e adicionam suporte a jogos novos. Baixe o mais recente no site do fabricante.",
    "maker": "Fabricante",
    "driverDate": "Data do driver",
    "memory": "Memória de vídeo",
    "tuneTitle": "Ajustar o Windows para jogos",
    "tuneBody": "Agendamento de GPU, otimizações para jogos em janela e taxa de atualização variável ficam na página Jogos.",
    "openGaming": "Abrir Jogos"
  },
  "restore": {
    "entryTitle_many": "{{count}} configurações alteradas",
    "entryTitle_one": "{{count}} configuração alterada",
    "entryTitle_other": "{{count}} configurações alteradas",
    "manual": "Ponto de restauração manual",
    "empty": "Ainda não há pontos de restauração.",
    "create": "Criar ponto de restauração",
    "creating": "Criando…",
    "rollback": "Desfazer",
    "rolledBack": "Desfeito",
    "openSystem": "Abrir Restauração do Sistema do Windows",
    "confirmTitle": "Desfazer este ponto de restauração?",
    "confirmBody": "Todas as alterações salvas neste ponto serão revertidas.",
    "failed": "Algo deu errado",
    "deleteTitle": "Excluir este ponto de restauração?",
    "deleteBody": "O que ele alterou continua como está, mas o Zanrei não poderá mais desfazer. O ponto de restauração do Windows correspondente também é excluído.",
    "deleteAll": "Excluir todos",
    "deleteAllTitle": "Excluir todos os pontos de restauração?",
    "deleteAllBody": "Nada do que foi alterado é mexido, mas nada disso poderá mais ser desfeito pelo Zanrei. Os pontos de restauração do Windows correspondentes também são excluídos.",
    "deleted_many": "{{count}} pontos de restauração excluídos",
    "deleted_one": "{{count}} ponto de restauração excluído",
    "deleted_other": "{{count}} pontos de restauração excluídos",
    "windowsKept_many": "{{count}} pontos de restauração do Windows não puderam ser removidos. Remova-os em Proteção do Sistema se quiser que sumam.",
    "windowsKept_one": "{{count}} ponto de restauração do Windows não pôde ser removido. Remova-o em Proteção do Sistema se quiser que ele suma.",
    "windowsKept_other": "{{count}} pontos de restauração do Windows não puderam ser removidos. Remova-os em Proteção do Sistema se quiser que sumam."
  },
  "startup": {
    "count": "{{on}} de {{total}} iniciam com o Windows",
    "empty": "Nenhum programa de inicialização encontrado.",
    "system": "Componente do Windows",
    "scope": {
      "User": "Sua conta",
      "AllUsers": "Todos os usuários"
    },
    "note": "Desativar um programa só impede que ele inicie com o Windows. Ele continua instalado e você pode reativá-lo. Desative apenas o que você reconhece."
  },
  "disk": {
    "title": "Limpeza de disco",
    "desc": "Arquivos excluídos não passam pela Lixeira e não podem ser recuperados. O Zanrei mede primeiro e remove só o que você marcar.",
    "software": "Remover softwares",
    "nothing": "Nada para limpar agora.",
    "measure": "Medir de novo",
    "selected": "{{size}} selecionados",
    "run": "Excluir selecionados",
    "confirmTitle": "Excluir estes arquivos para sempre?",
    "confirmBody": "Isso não pode ser desfeito. Arquivos em uso são ignorados.",
    "done": "{{size}} liberados",
    "item": {
      "temp": {
        "name": "Arquivos temporários",
        "desc": "Arquivos de trabalho que os programas deixaram na sua pasta temporária."
      },
      "windows_temp": {
        "name": "Arquivos temporários do Windows",
        "desc": "Arquivos de trabalho deixados na pasta temporária do sistema."
      },
      "crash_dumps": {
        "name": "Despejos de memória e relatórios de erro",
        "desc": "Despejos de memória e relatórios que o Windows salvou após travamentos."
      },
      "update_cache": {
        "name": "Atualizações do Windows baixadas",
        "desc": "Arquivos de atualização que o Windows já instalou. O Windows baixa de novo se precisar."
      },
      "delivery_cache": {
        "name": "Cache da Otimização de Entrega",
        "desc": "Partes de atualizações guardadas para compartilhar com outros PCs."
      },
      "browser_cache": {
        "name": "Caches dos navegadores",
        "desc": "Caches de páginas do Edge, Chrome, Brave e Firefox. Feche o navegador antes. Os sites carregam um pouco mais devagar uma vez, enquanto o cache se enche de novo."
      },
      "recycle_bin": {
        "name": "Lixeira",
        "desc": "Tudo o que está na Lixeira, em todas as unidades."
      }
    }
  },
  "logs": {
    "copy": "Copiar",
    "copied": "Copiado para a área de transferência",
    "openFolder": "Abrir pasta",
    "clear": "Limpar",
    "filter": "Filtrar por nível",
    "empty": "Nada registrado ainda.",
    "level": {
      "all": "Tudo",
      "Info": "Informações",
      "Warn": "Avisos",
      "Error": "Erros"
    }
  },
  "settings": {
    "general": "Geral",
    "language": "Idioma",
    "automation": "Quanto o Zanrei faz sozinho",
    "background": "Segundo plano",
    "runInBackground": "Continuar rodando em segundo plano",
    "runInBackgroundDesc": "Fechar a janela esconde o Zanrei na bandeja em vez de encerrá-lo.",
    "startWithWindows": "Iniciar com o Windows",
    "startWithWindowsDesc": "Inicia discretamente na bandeja quando você entra no Windows.",
    "updates": "Atualizações",
    "version": "Versão {{version}}",
    "lastChecked": "Última verificação: {{when}}",
    "checkNow": "Verificar agora",
    "checking": "Verificando…",
    "autoUpdate": "Instalar atualizações automaticamente",
    "autoUpdateDesc": "O Zanrei baixa e instala as novas versões sozinho, nunca enquanto um jogo está aberto. Desative para ser consultado antes.",
    "updateAvailable": "A versão {{version}} está disponível",
    "updateTo": "Atualizar para {{version}}",
    "upToDate": "Você está atualizado.",
    "updateFailed": "Não foi possível verificar atualizações.",
    "install": "Instalar e reiniciar",
    "installing": "Instalando…",
    "tools": "Ferramentas",
    "quit": "Sair do Zanrei",
    "quitDesc": "Fecha o aplicativo por completo, inclusive o monitoramento em segundo plano."
  },
  "os": {
    "flavor": {
      "title": "{{name}} {{version}} detectado",
      "badgeHint": "{{name}} é um Windows modificado",
      "body": "Este PC usa um Windows modificado. Muitas configurações do Zanrei podem já estar ativas porque o {{name}} as aplicou, e cada chave mostra como o Windows está configurado agora.",
      "keep": "O Zanrei só altera o que o {{name}} deixou intocado, e toda alteração continua podendo ser desfeita em Restaurar.",
      "restore": "Pontos de restauração precisam da Proteção do Sistema. Se ela estiver desativada, o Zanrei a ativa na unidade do sistema antes de alterar qualquer coisa.",
      "own": "Altere as configurações que o {{name}} gerencia nas próprias ferramentas do {{name}}, não aqui, para que um não desfaça o outro.",
      "docs": "Documentação do {{name}}"
    },
    "win10": {
      "title": "O Windows 10 não recebe mais atualizações de segurança gratuitas",
      "body": "A Microsoft encerrou o suporte regular ao Windows 10 em 14 de outubro de 2025. O PC continua funcionando, mas novas falhas de segurança não são mais corrigidas de graça. Se ele roda o Windows 11, migrar é a escolha mais segura.",
      "guide": "Ler o guia",
      "microsoft": "Anúncio da Microsoft"
    }
  },
  "guide": {
    "tab": {
      "yourself": "Faça você mesmo",
      "fresh": "Começar do zero"
    },
    "link": {
      "nvidia": "Drivers NVIDIA",
      "amd": "Drivers AMD",
      "intel": "Drivers Intel",
      "atlasDrivers": "Guia de drivers",
      "crystaldiskinfo": "CrystalDiskInfo",
      "hwinfo": "HWiNFO",
      "atlasXmp": "Guia passo a passo",
      "atlasRebar": "Guia passo a passo",
      "site": "Site",
      "docs": "Guia de instalação",
      "github": "GitHub",
      "youtube": "Vídeos no YouTube",
      "win10Ended": "Fim do suporte ao Windows 10",
      "requirements": "Requisitos do Windows 11",
      "mediaHelp": "Instruções da Microsoft",
      "win11": "Baixar o Windows 11",
      "win10": "Baixar o Windows 10",
      "rufus": "Rufus"
    },
    "goto": {
      "graphics": "Abrir Gráficos",
      "startup": "Abrir Inicialização",
      "library": "Abrir Biblioteca"
    },
    "impact": {
      "big": "Grande efeito",
      "medium": "Efeito médio",
      "small": "Pequeno efeito"
    },
    "effort": {
      "easy": "Fácil",
      "medium": "Exige algum cuidado",
      "careful": "Tenha cuidado"
    },
    "yourself": {
      "intro": "O Zanrei pode mudar o que o Windows faz, mas alguns dos maiores ganhos estão fora do Windows: na BIOS, no hardware, nos drivers e dentro dos seus jogos. Estas etapas ficam por sua conta. Comece pelo topo; os primeiros grupos são os mais fáceis.",
      "honest": "Quanto cada uma ajuda depende do seu PC. Não fizemos medições, então os rótulos de efeito são a nossa avaliação, não uma medida."
    },
    "group": {
      "games": {
        "title": "Nos seus jogos",
        "desc": "Normalmente o caminho mais rápido para mais quadros."
      },
      "windows": {
        "title": "No Windows",
        "desc": "Configurações que o Zanrei não pode ou não deve mudar por você."
      },
      "drivers": {
        "title": "Drivers",
        "desc": "O software que permite ao Windows usar bem o seu hardware."
      },
      "hardware": {
        "title": "Hardware",
        "desc": "Exige uma chave de fenda, uma compra ou as duas coisas."
      },
      "bios": {
        "title": "Na BIOS",
        "desc": "Configurações do firmware do PC, antes de o Windows iniciar. Altere só as citadas aqui."
      }
    },
    "items": {
      "game_settings": {
        "title": "Reduza as configurações que mais custam quadros",
        "why": "O jeito mais rápido de ter mais FPS quase sempre está dentro do jogo, não no Windows.",
        "s1": "Coloque o jogo em Tela cheia (ou Sem bordas em jogos mais novos) na resolução nativa da sua tela.",
        "s2": "Se o jogo oferecer um upscaler (DLSS, FSR ou XeSS), ative e ajuste a escala de renderização para cerca de 75 a 85 por cento.",
        "s3": "Reduza primeiro Sombras, Neblina ou efeitos volumétricos, Reflexos e Distância de visão. Eles custam mais pela menor diferença visível. O anti-aliasing vem depois.",
        "s4": "Defina um limite de quadros (por exemplo, a taxa de atualização da sua tela) para que o PC não trabalhe no máximo sem ganho. Desative o V-Sync se o jogo parecer lento para responder.",
        "s5": "Mude uma coisa de cada vez e observe um contador de FPS (Steam: Configurações, Em jogo, Contador de FPS em jogo) para ver o que realmente ajudou."
      },
      "laptop_power": {
        "title": "Notebooks: ligue na tomada e escolha o modo de energia certo",
        "why": "Na bateria, o notebook segura bastante o processador e a placa de vídeo. Jogar fora da tomada pode custar boa parte do desempenho.",
        "s1": "Conecte o carregador que veio com o notebook.",
        "s2": "Windows 11: abra Configurações, Sistema, Energia e bateria e defina o Modo de energia como Melhor desempenho. Windows 10: clique no ícone da bateria na barra de tarefas e mova o controle para Melhor desempenho.",
        "s3": "O Game Boost do Zanrei também troca o plano de energia enquanto um jogo está aberto e o restaura depois."
      },
      "refresh_rate": {
        "title": "Coloque o monitor na taxa de atualização mais alta",
        "why": "Muitas telas vendidas como 120, 144 ou 240 Hz continuam em 60 Hz até você mudar. Jogos e a área de trabalho ficam mais fluidos na taxa real, e não custa nada.",
        "s1": "Abra Configurações, Sistema, Tela, Vídeo avançado.",
        "s2": "Escolha seu monitor e abra Escolher uma taxa de atualização.",
        "s3": "Escolha o valor mais alto e clique em Manter alterações.",
        "s4": "Se o valor mais alto não aparecer, tente outro cabo (DisplayPort ou um cabo HDMI mais novo) e instale o driver de vídeo."
      },
      "oem_software": {
        "title": "Remova os programas de teste e auxiliares do fabricante",
        "why": "PCs novos costumam vir com antivírus de teste (McAfee, Norton), ferramentas de \"otimização\" e aplicativos auxiliares que rodam o tempo todo. A página Limpeza do Zanrei remove os aplicativos que vêm com o Windows, mas não esses.",
        "s1": "Abra Configurações, Aplicativos, Aplicativos instalados.",
        "s2": "Procure antivírus de teste, ferramentas de \"booster\" ou \"otimizador\" e aplicativos auxiliares do fabricante que você nunca usa.",
        "s3": "Desinstale-os. A Segurança do Windows gratuita e integrada basta para a maioria das pessoas.",
        "s4": "Depois, confira a página Inicialização do Zanrei para ver o que sobrou.",
        "caution": "Mantenha os atualizadores de driver e firmware do fabricante se não souber o que fazem, e não remova seu único antivírus."
      },
      "browser": {
        "title": "Deixe o navegador mais leve",
        "why": "Num PC com pouca memória, o navegador costuma ser o que mais usa memória.",
        "s1": "Abra as configurações do navegador, procure Economia de memória (Chrome) ou Guias em suspensão (Edge) e ative.",
        "s2": "Abra a lista de extensões e remova as que você não usa. Cada uma roda em todas as guias.",
        "s3": "Feche as guias que você não está lendo. Salve-as nos favoritos.",
        "s4": "Não deixe um navegador com muitas guias aberto enquanto joga."
      },
      "overlays": {
        "title": "Desative as sobreposições que você não usa",
        "why": "As sobreposições do Discord, Steam, NVIDIA e Xbox se prendem a todo jogo. Cada uma custa um pouco e às vezes causa travadinhas ou travamentos.",
        "s1": "Discord: Configurações de usuário, Sobreposição de jogo, desative.",
        "s2": "Steam: Configurações, Em jogo, desative Ativar a sobreposição Steam em jogo (você ainda pode ativá-la por jogo).",
        "s3": "NVIDIA App ou GeForce Experience: Configurações, desative a sobreposição no jogo. A gravação da Xbox Game Bar está na página Jogos do Zanrei."
      },
      "gpu_driver": {
        "title": "Instale o driver de vídeo certo",
        "why": "Drivers novos corrigem bugs de jogos e muitas vezes deixam tudo mais rápido. Um driver muito antigo, ou o básico \"Adaptador de Vídeo Básico da Microsoft\", deixa muito desempenho sem uso.",
        "s1": "Abra a página Gráficos no Zanrei. Ela mostra sua placa, a idade do driver e um link para a página de download do fabricante.",
        "s2": "Baixe o driver para o seu modelo exato na NVIDIA, AMD ou Intel, não por uma ferramenta de \"atualização de drivers\".",
        "s3": "Execute o instalador. Na NVIDIA, escolha Personalizada e marque Executar uma instalação limpa. A AMD tem uma opção parecida de redefinição de fábrica.",
        "s4": "Reinicie o PC quando o instalador pedir.",
        "caution": "Em notebooks, o driver do fabricante do notebook é a escolha segura. O driver genérico do fabricante do chip às vezes se recusa a instalar ou desativa recursos."
      },
      "chipset": {
        "title": "Instale o driver do chipset",
        "why": "No começo o Windows usa drivers genéricos para a placa-mãe. O driver de chipset do fabricante traz o comportamento certo de energia e desempenho para o seu processador.",
        "s1": "Descubra o modelo da placa-mãe ou do notebook: pressione Win + R, digite msinfo32 e leia Produto da Placa Base (ou Modelo do sistema).",
        "s2": "Abra a página de suporte do fabricante da placa-mãe ou do notebook, ou da AMD ou Intel para o driver do chipset.",
        "s3": "Baixe o driver do chipset, instale e reinicie."
      },
      "disk_health": {
        "title": "Verifique se a unidade está saudável",
        "why": "Uma unidade com defeito faz o PC inteiro travar e congelar, e mais cedo ou mais tarde ela perde dados.",
        "s1": "Instale o CrystalDiskInfo (gratuito) e abra-o.",
        "s2": "Bom está tudo bem. Cuidado ou Ruim significa: faça backup agora e troque a unidade.",
        "s3": "Não rode ferramentas de reparo ou otimização numa unidade marcada como Cuidado ou Ruim até seus dados estarem seguros."
      },
      "cooling": {
        "title": "Limpe a poeira e verifique as temperaturas",
        "why": "Um processador ou placa de vídeo quente se desacelera para se proteger (thermal throttling), o que parece exatamente um PC lento. Notebooks antigos são as vítimas mais comuns.",
        "s1": "Instale o HWiNFO (gratuito), abra no modo Somente sensores e jogue ou trabalhe por dez minutos observando as temperaturas da CPU e da GPU.",
        "s2": "Temperaturas que ficam perto de 90 °C ou mais, ou frequências que caem sob carga, indicam throttling.",
        "s3": "Desligue o PC, tire da tomada e sopre a poeira das ventoinhas e saídas de ar com jatos curtos de ar comprimido. Segure cada ventoinha com um palito para que não gire rápido demais.",
        "s4": "Use uma superfície dura e plana ou um suporte para o notebook, nunca a cama ou o colo. Pasta térmica nova ajuda em PCs antigos, mas só se você se sentir à vontade para abrir o cooler.",
        "caution": "Abrir um notebook pode anular a garantia."
      },
      "dual_channel": {
        "title": "Use dois pentes de memória em dual channel",
        "why": "Dois pentes iguais dão ao processador o dobro da largura de banda de memória de um só. Com o vídeo integrado do processador, que divide essa memória, costuma ser o melhor upgrade pelo preço.",
        "s1": "Abra o Gerenciador de Tarefas, Desempenho, Memória. Slots usados: 1 de 2 ou 1 de 4 significa um único pente.",
        "s2": "Compre um segundo pente com o mesmo tamanho e velocidade do primeiro (o mesmo modelo, se puder).",
        "s3": "Encaixe-os nos slots que o manual da placa-mãe indica para dual channel, muitas vezes os slots 2 e 4 contando a partir do processador.",
        "s4": "Confira o Gerenciador de Tarefas de novo e ative o XMP ou EXPO (veja Na BIOS).",
        "caution": "Desligue o PC e tire da tomada antes de abri-lo. Muitos notebooks têm memória soldada, então pesquise seu modelo primeiro."
      },
      "ram_upgrade": {
        "title": "Adicione memória se ela vive quase cheia",
        "why": "Quando a memória acaba, o Windows usa o disco e tudo engasga. Nenhuma configuração substitui memória de verdade.",
        "s1": "Observe o medidor de memória na Visão geral do Zanrei enquanto trabalha ou joga. Acima de uns 85 por cento a maior parte do tempo significa que falta memória.",
        "s2": "Descubra o tipo e o máximo que seu PC aceita: pesquise seu modelo e \"upgrade de RAM\", ou use a página de compatibilidade do fabricante.",
        "s3": "8 GB é o mínimo prático hoje. 16 GB é confortável para jogos.",
        "caution": "Muitos notebooks finos não permitem upgrade."
      },
      "ssd": {
        "title": "Passe o Windows para um SSD",
        "why": "Se o Windows inicia de um disco rígido (HDD), nada mais que você faça chega perto disso. A inicialização, a abertura de programas e o carregamento de jogos ficam muito mais rápidos.",
        "s1": "Abra o Gerenciador de Tarefas, Desempenho, Disco. O tipo aparece ali, e a Visão geral do Zanrei também mostra.",
        "s2": "Escolha um SSD SATA ou NVMe compatível com seu PC (veja o manual do seu modelo). 256 GB bastam para o Windows e alguns programas.",
        "s3": "O jeito mais limpo é fazer backup, instalar o SSD e fazer uma instalação do zero (veja Começar do zero). Clonar o disco antigo também funciona, mas copia a bagunça junto.",
        "s4": "Mantenha o disco antigo como armazenamento extra ou retire-o.",
        "caution": "Faça backup primeiro. Uma instalação do zero apaga o disco onde é instalada."
      },
      "xmp": {
        "title": "Ative o XMP ou EXPO para a memória rodar na velocidade nominal",
        "why": "A memória muitas vezes é vendida com uma velocidade, mas roda mais devagar até um perfil ser ativado na BIOS. Isso pesa mais em PCs que usam o vídeo integrado do processador, que divide essa memória, e no AMD Ryzen.",
        "s1": "Abra o Gerenciador de Tarefas, Desempenho, Memória e anote a Velocidade. Compare com a velocidade impressa nos pentes (por exemplo, 3200 ou 6000).",
        "s2": "Reinicie o PC e pressione a tecla da BIOS durante a inicialização, geralmente Del ou F2. A tela do logotipo costuma mostrar qual.",
        "s3": "Procure a configuração chamada XMP (Intel), EXPO ou DOCP (AMD), ou AI Overclock Tuner. Geralmente fica na primeira tela de overclock ou tweaker.",
        "s4": "Escolha o Perfil 1, salve e saia (geralmente F10).",
        "s5": "De volta ao Windows, confira o Gerenciador de Tarefas de novo. A velocidade agora deve bater com a dos pentes.",
        "caution": "A maioria dos PCs inicia sem problemas. Se o seu não iniciar, desligue, segure o botão de energia por dez segundos e tente de novo. A maioria das placas volta a configurações seguras depois de uma falha na inicialização. Notebooks e muitos PCs de escritório nem têm essa configuração, e isso é normal."
      },
      "rebar": {
        "title": "Ative o Resizable BAR",
        "why": "Permite que o processador use toda a memória da placa de vídeo de uma vez. O ganho é pequeno e varia por jogo, mas é de graça onde há suporte (em geral placas de vídeo de 2020 em diante, com um processador compatível).",
        "s1": "Verifique o suporte: a ferramenta gratuita GPU-Z mostra um campo Resizable BAR, ou consulte a página do fabricante da placa de vídeo.",
        "s2": "Na BIOS, ative primeiro o Above 4G Decoding e depois o Re-Size BAR Support. Os nomes variam um pouco entre fabricantes.",
        "s3": "Salve, reinicie e confira de novo no GPU-Z.",
        "s4": "Para funcionar, o Windows precisa estar instalado em modo UEFI (não Legacy nem CSM).",
        "caution": "Atualize o driver de vídeo primeiro. Mudar configurações da BIOS que você não entende pode impedir o PC de iniciar, então altere só as citadas aqui."
      }
    },
    "fresh": {
      "title": "Por que começar do zero",
      "intro": "Começar do zero apaga a unidade do sistema e instala um Windows novo nela. Depois disso nada pode ser desfeito, mas um Windows limpo é o melhor ponto de partida que existe, e permite coisas que nenhum aplicativo consegue fazer num Windows em uso.",
      "gain": {
        "clean": "Sem restos: anos de programas instalados e removidos pela metade, drivers velhos, serviços em segundo plano e qualquer malware somem.",
        "bloat": "Sem bagunça do fabricante: você instala o Windows a partir da imagem da própria Microsoft, não da personalizada pelo fabricante.",
        "components": "Partes que não podem ser retiradas de um Windows em uso. Projetos como o AtlasOS aplicam suas mudanças logo após a instalação, antes que algo dependa dessas partes.",
        "layout": "Um layout de disco correto: UEFI moderno, o sistema na unidade mais rápida, nada sobrando de uma antiga configuração MBR.",
        "known": "Um estado conhecido. Fica mais fácil saber o que realmente mudou o desempenho quando tudo parte do mesmo ponto."
      },
      "warning": "Começar do zero é opcional. O Zanrei funciona no seu Windows atual, e tudo o que ele faz pode ser desfeito. Uma reinstalação não pode."
    },
    "atlas": {
      "title": "AtlasOS",
      "badge": "Para entusiastas",
      "intro": "Um projeto de código aberto (cerca de 22.000 estrelas no GitHub) que ajusta um Windows 11 recém-instalado para ter menos latência, menos processos em segundo plano e menos telemetria. Ele é aplicado com um pequeno instalador chamado AME Wizard após uma instalação limpa do Windows, e o playbook aplicado é de código aberto e pode ser lido por qualquer pessoa. É feito por outras pessoas e o Zanrei não tem vínculo com ele. A versão mais recente no momento em que isto foi escrito é a v0.5.0.",
      "fact": {
        "w11": "Exige Windows 11 (24H2 ou 25H2 no momento em que isto foi escrito). O Atlas não oferece mais suporte ao Windows 10.",
        "pro": "Use o Windows Pro ou Enterprise. O Windows Home não é compatível.",
        "revert": "Remover o Atlas significa reinstalar o Windows.",
        "security": "O Atlas deixa você escolher quanta segurança manter, por exemplo o Defender e o Windows Update. Leia a página de segurança dele antes de decidir.",
        "unofficial": "O Zanrei não fez medições do Atlas. Os resultados variam de PC para PC."
      },
      "videos": "Muita gente gravou testes de antes e depois, então pesquisar AtlasOS no YouTube mostra como ele se comporta em PCs como o seu. Trate qualquer vídeo isolado com cautela.",
      "others": "Existem projetos parecidos, por exemplo"
    },
    "win10": {
      "title": "Windows 10 ou 11?",
      "body": "A Microsoft parou de fornecer atualizações de segurança gratuitas para o Windows 10 em 14 de outubro de 2025. Se seu PC atende aos requisitos do Windows 11, instale o Windows 11. Se não atende, um Windows 10 limpo ainda funciona, mas mantenha o navegador atualizado, evite downloads arriscados e planeje trocar o PC. A página da Microsoft lista as opções pagas de atualizações estendidas."
    },
    "install": {
      "title": "Como reinstalar o Windows (10 ou 11)",
      "intro": "As etapas são as mesmas para os dois. Reserve de uma a duas horas e não desligue o PC durante a instalação.",
      "atlasNote": "Se quiser o AtlasOS, pare depois da primeira inicialização e siga o guia de instalação dele a partir daí. As etapas mudam entre versões, então use as atuais.",
      "step": {
        "backup": {
          "title": "Faça backup do que importa",
          "body": "Copie documentos, fotos, saves de jogos e favoritos do navegador para uma unidade externa ou para a nuvem. Anote as chaves de licença de programas pagos. Tudo na unidade do sistema será apagado."
        },
        "activation": {
          "title": "Verifique se o Windows está ativado",
          "body": "Abra Configurações, Sistema, Ativação. \"Ativado com uma licença digital\" significa que o Windows se ativa sozinho depois da reinstalação. Talvez você precise entrar com a mesma conta Microsoft."
        },
        "drivers": {
          "title": "Baixe os drivers antes",
          "body": "Em outro dispositivo, baixe o driver de rede (Wi-Fi ou Ethernet) da sua placa-mãe ou notebook e guarde num pendrive. Sem ele, o Windows novo pode ficar sem internet. Baixe também o driver de vídeo."
        },
        "media": {
          "title": "Obtenha o Windows na Microsoft",
          "body": "Use a Ferramenta de Criação de Mídia da Microsoft e escolha Criar mídia de instalação com um pendrive de pelo menos 8 GB (ele será apagado). Ou baixe o arquivo ISO e grave-o no pendrive com o Rufus."
        },
        "boot": {
          "title": "Inicie pelo pendrive",
          "body": "Reinicie e pressione a tecla do menu de inicialização quando o PC ligar, geralmente F12, F11, F8, Esc ou Del. A tela do logotipo do fabricante costuma mostrá-la. Escolha o pendrive, de preferência a entrada que começa com UEFI."
        },
        "setup": {
          "title": "Execute o instalador",
          "body": "Escolha o idioma e depois Instalar agora. \"Não tenho uma chave de produto\" serve se o Windows já estava ativado. Escolha a mesma edição de antes (Pro ou Home), aceite os termos de licença e escolha Personalizada: instalar apenas o Windows."
        },
        "drive": {
          "title": "Escolha a unidade",
          "body": "Selecione a unidade onde o Windows vai ficar. Para apagá-la por completo, exclua as partições dela, selecione o espaço não alocado e clique em Avançar. Não mexa nas unidades que guardam seus arquivos. Os tamanhos ajudam a diferenciá-las."
        },
        "firstrun": {
          "title": "Primeira inicialização",
          "body": "O Windows reinicia algumas vezes. Escolha sua região e teclado e conecte-se à rede, usando o driver do pendrive se precisar. O Windows 11 pede que você entre com uma conta Microsoft."
        },
        "update": {
          "title": "Atualize e instale os drivers",
          "body": "Rode o Windows Update até não sobrar nada, depois instale os drivers do chipset e de vídeo e reinicie."
        },
        "zanrei": {
          "title": "Depois instale o Zanrei",
          "body": "Execute a configuração do Zanrei. Ela cria um ponto de restauração, aplica as configurações adequadas ao seu PC e mostra o que falta fazer."
        }
      }
    }
  },
  "tweaks": {
    "telemetry": {
      "name": "Reduzir os dados de diagnóstico",
      "desc": "Pede ao Windows para enviar só os dados de diagnóstico mínimos obrigatórios e interrompe os pedidos de feedback."
    },
    "advertising_id": {
      "name": "Desativar o ID de publicidade",
      "desc": "Impede que os aplicativos usem um ID por usuário para personalizar anúncios."
    },
    "tailored_experiences": {
      "name": "Desativar experiências personalizadas",
      "desc": "Impede o Windows de usar seus dados de diagnóstico para sugerir dicas e anúncios."
    },
    "activity_history": {
      "name": "Desativar o histórico de atividades",
      "desc": "Impede o Windows de coletar e enviar os aplicativos e arquivos que você abre."
    },
    "suggestions": {
      "name": "Remover sugestões e anúncios",
      "desc": "Oculta aplicativos promovidos e dicas no Iniciar, em Configurações e na tela de bloqueio, e bloqueia instalações silenciosas de aplicativos."
    },
    "web_search": {
      "name": "Pesquisar só neste PC",
      "desc": "Remove os resultados da web da pesquisa do menu Iniciar, para ela ficar mais rápida e mais privada."
    },
    "consumer_features": {
      "name": "Bloquear a instalação de aplicativos promovidos",
      "desc": "Impede o Windows de instalar aplicativos patrocinados, como jogos, após a configuração ou atualizações."
    },
    "delivery_optimization": {
      "name": "Não enviar atualizações para outros PCs",
      "desc": "O Windows baixa as atualizações só da Microsoft em vez de compartilhá-las pela sua conexão."
    },
    "telemetry_tasks": {
      "name": "Desativar as tarefas agendadas de telemetria",
      "desc": "Desliga as tarefas em segundo plano que coletam dados de compatibilidade e uso."
    },
    "diagnostic_services": {
      "name": "Desativar os serviços de telemetria",
      "desc": "Interrompe os serviços Experiências de Usuário Conectado e Telemetria e de mensagens push. Vale depois de reiniciar."
    },
    "location": {
      "name": "Desativar os serviços de localização",
      "desc": "Bloqueia o acesso à localização para todos os aplicativos. Mapas e Localizar meu dispositivo não vão funcionar."
    },
    "background_apps": {
      "name": "Impedir aplicativos da Store em segundo plano",
      "desc": "Economiza memória e bateria em PCs antigos. Aplicativos da Store não atualizarão blocos nem notificações quando fechados."
    },
    "error_reporting": {
      "name": "Desativar o Relatório de Erros do Windows",
      "desc": "Impede que relatórios de travamento sejam coletados e enviados. Você perde o diagnóstico de travamentos integrado."
    },
    "windows_ai": {
      "name": "Desativar o Copilot e o Recall",
      "desc": "Desativa o botão do Copilot e a análise de dados por IA que tira capturas da sua tela."
    },
    "animations": {
      "name": "Reduzir as animações",
      "desc": "Desliga a maioria das animações de janelas e atrasos de menus para que PCs antigos pareçam mais rápidos. Saia da conta para aplicar."
    },
    "transparency": {
      "name": "Desativar os efeitos de transparência",
      "desc": "Remove o desfoque transparente das janelas e da barra de tarefas, o que poupa desempenho gráfico em placas antigas."
    },
    "startup_delay": {
      "name": "Remover o atraso de inicialização",
      "desc": "O Windows espera antes de abrir os programas de inicialização. Isso os abre logo depois de você entrar."
    },
    "edge_background": {
      "name": "Impedir o Edge de rodar em segundo plano",
      "desc": "Evita que o Edge pré-carregue e fique na memória depois de fechado. O Edge pode exibir o aviso \"Gerenciado pela sua organização\"."
    },
    "sysmain": {
      "name": "Desativar o SysMain (Superfetch)",
      "desc": "Para de pré-carregar aplicativos na memória. Ajuda em alguns sistemas, mas só é recomendado para SSDs; deixe ativado em discos rígidos."
    },
    "search_indexing": {
      "name": "Desativar a indexação da pesquisa",
      "desc": "Interrompe o indexador em segundo plano. Poupa atividade em discos rígidos antigos, mas a pesquisa de arquivos fica mais lenta."
    },
    "hibernation": {
      "name": "Desativar a hibernação",
      "desc": "Exclui o arquivo de hibernação e libera vários gigabytes. Também desativa a Inicialização Rápida."
    },
    "high_performance_plan": {
      "name": "Usar o plano de energia de alto desempenho",
      "desc": "Mantém o processador pronto em velocidade máxima. Gasta mais energia; não é ideal para notebooks na bateria."
    },
    "svchost_split": {
      "name": "Agrupar os serviços do Windows em menos processos",
      "desc": "Acima de 3,5 GB de RAM, o Windows roda cada serviço no próprio processo. Agrupá-los de novo economiza memória e dezenas de processos em segundo plano em PCs com 4 a 8 GB. Exige reiniciar."
    },
    "power_throttling": {
      "name": "Desativar a limitação de energia",
      "desc": "Impede o Windows de desacelerar programas em segundo plano para economizar energia. Pode ajudar desktops antigos; gasta mais bateria em notebooks. Exige reiniciar."
    },
    "multimedia_scheduler": {
      "name": "Dar prioridade aos jogos sobre mídia em segundo plano",
      "desc": "Reduz de 20 % para 10 % a parte do tempo de processador que o Windows reserva para multimídia em segundo plano, então mais vai para o jogo."
    },
    "foreground_priority": {
      "name": "Favorecer o programa que você está usando",
      "desc": "Dá à janela em primeiro plano fatias de tempo menores e o maior reforço de prioridade, para responder melhor num PC antigo e ocupado."
    },
    "vbs_off": {
      "name": "Desativar a integridade de memória (VBS)",
      "desc": "O Windows pode rodar partes de si mesmo dentro de uma máquina virtual por segurança. Em alguns PCs isso custa quadros nos jogos. Também remove uma camada de proteção contra malware: só para um PC usado principalmente para jogos. Exige reiniciar."
    },
    "game_mode": {
      "name": "Ativar o Modo de Jogo",
      "desc": "Permite que o Windows priorize o jogo em execução sobre tarefas em segundo plano."
    },
    "game_dvr": {
      "name": "Desativar a gravação de jogos em segundo plano",
      "desc": "Impede a Xbox Game Bar de gravar em segundo plano, o que custa quadros."
    },
    "windowed_optimizations": {
      "name": "Otimizações para jogos em janela",
      "desc": "Melhora a latência e habilita recursos como o HDR Automático em jogos sem bordas e em janela (Windows 11 22H2+)."
    },
    "vrr": {
      "name": "Taxa de atualização variável para jogos em janela",
      "desc": "Permite que monitores G-SYNC e FreeSync sincronizem em jogos em janela (Windows 11 22H2+). Exige um monitor compatível."
    },
    "hags": {
      "name": "Agendamento de GPU acelerado por hardware",
      "desc": "Deixa a placa de vídeo gerenciar a própria memória. Ajuda alguns jogos e prejudica outros. Exige um driver de GPU recente e reiniciar."
    },
    "fullscreen_optimizations": {
      "name": "Desativar otimizações de tela inteira em tudo",
      "desc": "Roda os jogos em tela inteira exclusiva de verdade. Alguns jogos respondem melhor, outros pioram. Você também pode definir isso por jogo."
    },
    "mouse_precision": {
      "name": "Desativar a aceleração do ponteiro",
      "desc": "Faz o cursor seguir sua mão na proporção 1:1, como a maioria dos jogos de tiro espera. Saia da conta para aplicar."
    },
    "sticky_keys": {
      "name": "Desativar os atalhos das Teclas de Aderência",
      "desc": "Impede a janela que aparece ao pressionar Shift cinco vezes ou segurá-la, o que pode interromper um jogo."
    },
    "file_extensions": {
      "name": "Mostrar extensões de arquivo",
      "desc": "Mostra .exe, .png e assim por diante, o que facilita perceber arquivos disfarçados."
    },
    "hidden_files": {
      "name": "Mostrar arquivos ocultos",
      "desc": "Mostra arquivos e pastas ocultos no Explorador de Arquivos."
    },
    "end_task": {
      "name": "Adicionar \"Finalizar tarefa\" ao menu da barra de tarefas",
      "desc": "Clique com o botão direito num aplicativo na barra de tarefas para fechá-lo mesmo travado (Windows 11 22H2+)."
    },
    "widgets": {
      "name": "Desativar Widgets e Notícias",
      "desc": "Remove o painel de widgets e o feed de notícias, que rodam processos em segundo plano."
    },
    "long_paths": {
      "name": "Permitir caminhos de arquivo muito longos",
      "desc": "Remove o limite de 260 caracteres nos caminhos para aplicativos compatíveis."
    },
    "no_auto_reboot": {
      "name": "Sem reinício automático com a conta conectada",
      "desc": "O Windows Update não reiniciará seu PC enquanto você estiver conectado."
    },
    "onedrive_policy": {
      "name": "Parar a sincronização de arquivos do OneDrive",
      "desc": "Desativa a sincronização de arquivos do OneDrive por política, sem desinstalá-lo."
    },
    "edge_debloat": {
      "name": "Remover avisos e anúncios do Edge",
      "desc": "Oculta a tela de primeira execução, o assistente de compras, as recomendações e as recompensas do Edge. O Edge pode exibir o aviso \"Gerenciado pela sua organização\"."
    },
    "remove_edge": {
      "name": "Remover o Microsoft Edge",
      "desc": "Desinstala o navegador Edge e impede o Windows de instalá-lo de novo. O runtime WebView2, de que aplicativos como o Zanrei precisam, é mantido. Isso não pode ser desfeito pelo Zanrei. Garanta antes que você tem outro navegador."
    },
    "bloat_apps": {
      "name": "Remover aplicativos pré-instalados",
      "desc": "Desinstala os aplicativos promocionais da Store que você marcar numa lista (Notícias, Clima, Paciência, Candy Crush e parecidos). Aplicativos que muita gente usa, como Spotify ou Vincular ao Celular, começam desmarcados. Xbox, Store, Fotos e Calculadora nunca aparecem. Isso não pode ser desfeito pelo Zanrei; reinstale o que sentir falta pela Microsoft Store."
    }
  }
} satisfies Translation<Locale>;
