import type { DeepPartial, Locale } from "./en";

// Translated: the interface core. Anything missing here (newer screens, tweak descriptions) falls back to English.
export default {
  "common": {
    "next": "Далее",
    "back": "Назад",
    "finish": "Готово",
    "retry": "Повторить",
    "cancel": "Отмена",
    "confirm": "Подтвердить",
    "close": "Закрыть",
    "loading": "Загрузка…",
    "search": "Поиск"
  },
  "setup": {
    "scan": {
      "working": "Сканирование…"
    },
    "mode": {
      "title": "Сколько должен делать Zanrei?",
      "desc": "Это можно изменить в любой момент.",
      "manual": {
        "name": "Вручную",
        "desc": "Ничего не происходит, пока вы сами не выберете."
      },
      "recommended": {
        "name": "Рекомендуемый",
        "desc": "Zanrei предлагает безопасные улучшения, а вы подтверждаете каждое."
      },
      "auto": {
        "name": "Автоматический",
        "desc": "Zanrei сам применяет безопасные улучшения, всегда после создания точки восстановления."
      }
    },
    "done": {
      "title": "Всё готово",
      "start": "Открыть Zanrei"
    }
  },
  "nav": {
    "overview": "Обзор",
    "restore": "Восстановление",
    "settings": "Настройки"
  },
  "titlebar": {
    "background": "Свернуть в фон"
  },
  "overview": {
    "title": "Ваш ПК",
    "cpu": "Процессор",
    "ram": "Память",
    "gpu": "Графика",
    "storage": "Накопители",
    "os": "Система",
    "noGpu": "Видеокарта не обнаружена",
    "cores": "Ядер: {{physical}} / потоков: {{logical}}",
    "tier": {
      "Legacy": "Старый ПК",
      "Mainstream": "ПК среднего уровня",
      "High": "Высокопроизводительный ПК"
    }
  },
  "restore": {
    "empty": "Точек восстановления пока нет.",
    "create": "Создать точку восстановления",
    "creating": "Создание…",
    "rollback": "Отменить",
    "rolledBack": "Отменено",
    "openSystem": "Открыть восстановление системы Windows",
    "confirmTitle": "Отменить эту точку восстановления?",
    "confirmBody": "Все изменения, сохранённые в этой точке, будут отменены.",
    "failed": "Что-то пошло не так"
  },
  "settings": {
    "language": "Язык"
  }
} satisfies DeepPartial<Locale>;
