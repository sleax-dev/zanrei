import type { DeepPartial, Locale } from "./en";

// Translated: the interface core. Anything missing here (newer screens, tweak descriptions) falls back to English.
export default {
  "common": {
    "next": "下一步",
    "back": "上一步",
    "finish": "完成",
    "retry": "重试",
    "cancel": "取消",
    "confirm": "确认",
    "close": "关闭",
    "loading": "正在加载…",
    "search": "搜索"
  },
  "setup": {
    "steps": {
      "welcome": "欢迎",
      "recommend": "推荐",
      "done": "完成"
    },
    "scan": {
      "working": "正在扫描…"
    },
    "mode": {
      "title": "让 Zanrei 做多少？",
      "desc": "你可以随时更改。",
      "manual": {
        "name": "手动",
        "desc": "除非你选择，否则不会执行任何操作。"
      },
      "recommended": {
        "name": "推荐",
        "desc": "Zanrei 建议安全的优化，由你逐项确认。"
      },
      "auto": {
        "name": "自动",
        "desc": "Zanrei 自动应用安全的优化，并且始终先创建还原点。"
      }
    },
    "done": {
      "title": "一切就绪",
      "start": "打开 Zanrei"
    }
  },
  "nav": {
    "overview": "概览",
    "restore": "还原",
    "settings": "设置"
  },
  "boost": {
    "label": "游戏加速",
    "on": "开",
    "off": "关"
  },
  "splash": {
    "tagline": "为你调校的 Windows。每项更改都可撤销。"
  },
  "titlebar": {
    "minimize": "最小化",
    "close": "关闭",
    "closeToTray": "关闭(在后台继续运行)"
  },
  "bloat": {
    "pick": "只会删除你勾选的应用。常用的应用默认不勾选。",
    "mayUse": "你可能在用",
    "none": "没有安装可删除的应用。",
    "remove_one": "删除 {{count}} 个应用",
    "remove_other": "删除 {{count}} 个应用"
  },
  "overview": {
    "title": "你的电脑",
    "cpu": "处理器",
    "ram": "内存",
    "gpu": "显卡",
    "storage": "存储",
    "os": "系统",
    "noGpu": "未检测到显卡",
    "cores": "{{physical}} 核 / {{logical}} 线程",
    "tier": {
      "Legacy": "老旧电脑",
      "Mainstream": "主流电脑",
      "High": "高性能电脑"
    }
  },
  "restore": {
    "empty": "还没有还原点。",
    "create": "创建还原点",
    "creating": "正在创建…",
    "rollback": "撤销",
    "rolledBack": "已撤销",
    "openSystem": "打开 Windows 系统还原",
    "confirmTitle": "撤销此还原点？",
    "confirmBody": "此还原点中保存的所有更改都将被还原。",
    "failed": "出了点问题"
  },
  "settings": {
    "language": "语言"
  }
} satisfies DeepPartial<Locale>;
