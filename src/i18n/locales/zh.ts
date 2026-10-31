import type { Locale, Translation } from "./en";

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
    "remove": "移除",
    "search": "搜索",
    "delete": "删除"
  },
  "boost": {
    "label": "游戏加速",
    "on": "开",
    "off": "关"
  },
  "splash": {
    "tagline": "为你调校的 Windows。每项更改都可撤销。",
    "loading": "正在启动 Zanrei…"
  },
  "setup": {
    "progress": "第 {{current}} 步，共 {{total}} 步",
    "steps": {
      "welcome": "欢迎",
      "recommend": "推荐",
      "done": "完成"
    },
    "welcome": {
      "title": "欢迎使用 Zanrei",
      "body": "Zanrei 会根据你实际使用的电脑调整 Windows，而且每项更改都可以撤销。",
      "p1": "在第一次更改之前，会先创建一个 Windows 还原点。",
      "p2": "在开启任何设置之前，你都能看到它的作用。",
      "p3": "不会向任何地方发送数据。无需账户。",
      "language": "语言",
      "start": "开始"
    },
    "scan": {
      "working": "正在扫描…"
    },
    "recommend": {
      "title": "为你的电脑推荐",
      "found_other": "有 {{count}} 项设置适合它。",
      "alreadyOn": "另有 {{count}} 项已经设置好了。",
      "pc": "你的电脑",
      "safety": "会先创建还原点。你可以在“还原”页面撤销所有更改。",
      "failed": "Zanrei 无法完成某项更改，因此已停止。其他内容均未改动。",
      "skip": "跳过，我自己选择",
      "applying": "正在应用 {{done}}/{{total}}…",
      "apply_other": "应用 {{count}} 项设置"
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
      "applied_other": "已应用 {{count}} 项设置。",
      "nothing": "未做任何更改。",
      "autoNote": "从现在起，Zanrei 会自动应用新的安全建议。你关闭的项目会保持关闭。可在“设置”中更改。",
      "manualNote": "Zanrei 会提出改进建议，并等待你的同意。可在“设置”中更改。",
      "start": "打开 Zanrei"
    }
  },
  "nav": {
    "label": "主菜单",
    "countLabel": "已开启 {{on}}/{{total}}",
    "newErrors_other": "{{count}} 个新错误",
    "overview": "概览",
    "privacy": "隐私",
    "performance": "性能",
    "startup": "启动项",
    "gaming": "游戏",
    "windows": "Windows",
    "cleanup": "清理",
    "library": "游戏库",
    "graphics": "显卡",
    "guide": "指南",
    "restore": "还原",
    "logs": "日志",
    "settings": "设置",
    "group": {
      "optimize": "优化",
      "games": "游戏",
      "tools": "工具"
    }
  },
  "pageDesc": {
    "privacy": "阻止 Windows 收集和共享超出需要的数据。",
    "performance": "让老旧或负载繁重的电脑感觉更快。",
    "startup": "选择哪些程序随 Windows 启动。启动项越少，开机越快，可用内存越多。",
    "gaming": "玩游戏时更少打扰、更低开销。",
    "windows": "对 Windows 外观和行为的小调整。",
    "cleanup": "释放磁盘空间，移除你没要求安装的软件。已删除的文件和已移除的程序无法恢复。",
    "library": "Zanrei 会找到你已安装的游戏，并针对每个游戏调整 Windows。",
    "graphics": "你的显卡及其驱动程序。",
    "restore": "Zanrei 的每项更改都保存在这里，并且可以撤销。不再需要的还原点可以删除。",
    "guide": "只有你自己才能完成的事，例如 BIOS 设置、硬件和驱动步骤，以及如何用干净的 Windows 重新开始。",
    "logs": "Zanrei 做了什么，以及哪里出了问题。寻求帮助时请分享这些内容。",
    "settings": "Zanrei 的启动、更新和运行方式。"
  },
  "titlebar": {
    "minimize": "最小化",
    "close": "关闭",
    "closeToTray": "关闭(在后台继续运行)"
  },
  "toast": {
    "applied_other": "已应用 {{count}} 项设置",
    "nothingToApply": "没有可应用的内容了",
    "viewLog": "查看日志"
  },
  "restart": {
    "Explorer": "需要重启文件资源管理器才能完成更改。",
    "SignOut": "注销并重新登录以完成更改。",
    "Reboot": "重启 Windows 以完成更改。",
    "because": "原因：{{names}}",
    "explorerButton": "重启资源管理器",
    "rebootButton": "立即重启",
    "signOutButton": "立即注销",
    "signOutTitle": "注销 Windows？",
    "signOutBody": "你将立即被注销。请先保存工作。",
    "confirmTitle": "重启 Windows？",
    "confirmBody": "Windows 将在 {{seconds}} 秒后重启。请先保存工作。在此之前你可以取消。",
    "countdown": "{{seconds}} 秒后重启…"
  },
  "overview": {
    "title": "你的电脑",
    "loading": "正在检查你的电脑…",
    "tier": {
      "Legacy": "老旧电脑",
      "Mainstream": "主流电脑",
      "High": "高性能电脑"
    },
    "build": "版本 {{build}}",
    "os": "系统",
    "cpu": "处理器",
    "ram": "内存",
    "gpu": "显卡",
    "storage": "存储",
    "noGpu": "未检测到显卡",
    "cores": "{{physical}} 核 / {{logical}} 线程",
    "freeOf": "可用 {{free}}，共 {{total}}",
    "summaryTodo_other": "有 {{count}} 项推荐设置已准备就绪。",
    "summaryDone": "所有推荐项都已开启。",
    "apply": "应用 {{count}} 项",
    "safetyNote": "会先创建还原点，每项更改都可以撤销。"
  },
  "live": {
    "title": "当前状态",
    "desc": "优化生效时这些数字会变化。重启后可以对比一下。",
    "cpu": "处理器",
    "ram": "已用内存",
    "ramTotal": "/ {{total}}",
    "processes": "运行中的进程",
    "startup": "启动程序"
  },
  "bloat": {
    "pick": "只会删除你勾选的应用。常用的应用默认不勾选。",
    "mayUse": "你可能在用",
    "none": "没有安装可删除的应用。",
    "remove_other": "删除 {{count}} 个应用"
  },
  "optimize": {
    "forThisPc": "为这台电脑推荐",
    "more": "更多选项",
    "applyAll": "全部应用（{{count}} 项）",
    "empty": "没有匹配项。",
    "apply": "应用",
    "irreversible": "无法撤销",
    "acknowledge": "我明白此操作无法撤销",
    "partial": "部分已应用",
    "unavailable": "此电脑不可用",
    "category": {
      "Privacy": "隐私",
      "Performance": "性能",
      "Gaming": "游戏",
      "Interface": "界面",
      "System": "系统",
      "Cleanup": "清理"
    },
    "risk": {
      "Safe": "安全",
      "Moderate": "中等",
      "Advanced": "高级"
    },
    "needs": {
      "Explorer": "会重启资源管理器",
      "SignOut": "需要注销",
      "Reboot": "需要重启"
    },
    "confirm": {
      "Safe": "这是一项低风险的更改。",
      "Moderate": "这会改变 Windows 的行为。之后可以再关闭，并且会先创建还原点。",
      "Advanced": "这是一项高级更改。请仔细阅读说明。会先创建还原点。",
      "irreversible": "此操作无法撤销。Zanrei 无法恢复它，也不能指望还原点来恢复。"
    }
  },
  "games": {
    "rescan": "重新扫描",
    "add": "添加游戏",
    "scanning": "正在查找游戏…",
    "empty": "还没有找到游戏。可以手动添加，或通过 Steam、Epic、GOG、Xbox、Ubisoft、EA、Battle.net 或 Riot 安装游戏。",
    "yourGames": "你的游戏",
    "optionsOn_other": "已开启 {{count}} 个选项",
    "found_other": "找到 {{count}} 个游戏：{{launchers}}",
    "removeFromList": "从列表中移除",
    "boostTitle": "Game Boost",
    "boostDesc": "游戏运行期间，Zanrei 会把 Windows 切换到高性能电源计划，退出游戏后再切换回来。",
    "boostActive": "已启用：{{game}} 正在运行。",
    "boostWaiting": "等待游戏启动。",
    "boostOff": "已关闭。",
    "driver": "驱动程序",
    "driverCheck": "检查更新",
    "opt": {
      "gpu": {
        "name": "使用高性能 GPU",
        "desc": "让 Windows 在你最快的显卡上运行这个游戏。"
      },
      "fso": {
        "name": "禁用全屏优化",
        "desc": "可减少部分老游戏的卡顿或输入延迟。"
      },
      "priority": {
        "name": "以高 CPU 优先级启动",
        "desc": "让游戏获得比后台程序更多的处理器时间。"
      }
    }
  },
  "graphics": {
    "oldTitle": "此驱动程序已超过两年",
    "oldBody": "新驱动能修复崩溃并支持新游戏。请从制造商处下载最新版本。",
    "maker": "制造商",
    "driverDate": "驱动日期",
    "memory": "显存",
    "tuneTitle": "为游戏调整 Windows",
    "tuneBody": "GPU 调度、窗口化游戏优化和可变刷新率都在“游戏”页面。",
    "openGaming": "打开“游戏”"
  },
  "restore": {
    "entryTitle_other": "更改了 {{count}} 项设置",
    "manual": "手动还原点",
    "empty": "还没有还原点。",
    "create": "创建还原点",
    "creating": "正在创建…",
    "rollback": "撤销",
    "rolledBack": "已撤销",
    "openSystem": "打开 Windows 系统还原",
    "confirmTitle": "撤销此还原点？",
    "confirmBody": "此还原点中保存的所有更改都将被还原。",
    "failed": "出了点问题",
    "deleteTitle": "删除此还原点？",
    "deleteBody": "它所做的更改会保持原样，但 Zanrei 将无法再撤销。对应的 Windows 还原点也会被删除。",
    "deleteAll": "全部删除",
    "deleteAllTitle": "删除所有还原点？",
    "deleteAllBody": "已更改的内容不会被改动，但都无法再通过 Zanrei 撤销。对应的 Windows 还原点也会被删除。",
    "deleted_other": "已删除 {{count}} 个还原点",
    "windowsKept_other": "有 {{count}} 个 Windows 还原点无法移除。如需删除，请在“系统保护”中移除。"
  },
  "startup": {
    "count": "{{on}}/{{total}} 个随 Windows 启动",
    "empty": "未找到启动程序。",
    "system": "Windows 组件",
    "scope": {
      "User": "你的账户",
      "AllUsers": "所有用户"
    },
    "note": "关闭一个程序只会让它不再随 Windows 启动。它仍然保持安装，你可以随时重新开启。只关闭你认识的程序。"
  },
  "disk": {
    "title": "磁盘清理",
    "desc": "删除的文件不经过回收站，无法恢复。Zanrei 会先测量，只移除你勾选的内容。",
    "software": "移除软件",
    "nothing": "目前没有需要清理的内容。",
    "measure": "重新测量",
    "selected": "已选 {{size}}",
    "run": "删除所选",
    "confirmTitle": "永久删除这些文件？",
    "confirmBody": "此操作无法撤销。正在使用的文件会被跳过。",
    "done": "已释放 {{size}}",
    "item": {
      "temp": {
        "name": "临时文件",
        "desc": "程序留在你的临时文件夹中的工作文件。"
      },
      "windows_temp": {
        "name": "Windows 临时文件",
        "desc": "留在系统临时文件夹中的工作文件。"
      },
      "crash_dumps": {
        "name": "崩溃转储和错误报告",
        "desc": "Windows 在崩溃后保存的内存转储和报告。"
      },
      "update_cache": {
        "name": "已下载的 Windows 更新",
        "desc": "Windows 已经安装过的更新文件。如果需要，Windows 会重新下载。"
      },
      "delivery_cache": {
        "name": "传递优化缓存",
        "desc": "为与其他电脑共享而保留的更新片段。"
      },
      "browser_cache": {
        "name": "浏览器缓存",
        "desc": "Edge、Chrome、Brave 和 Firefox 的网页缓存。请先关闭浏览器。缓存重新填满前，网站首次加载会稍慢一些。"
      },
      "recycle_bin": {
        "name": "回收站",
        "desc": "所有驱动器上回收站中的全部内容。"
      }
    }
  },
  "logs": {
    "copy": "复制",
    "copied": "已复制到剪贴板",
    "openFolder": "打开文件夹",
    "clear": "清空",
    "filter": "按级别筛选",
    "empty": "暂无日志。",
    "level": {
      "all": "全部",
      "Info": "信息",
      "Warn": "警告",
      "Error": "错误"
    }
  },
  "settings": {
    "general": "常规",
    "language": "语言",
    "automation": "Zanrei 自动处理的程度",
    "background": "后台",
    "runInBackground": "在后台保持运行",
    "runInBackgroundDesc": "关闭窗口时，Zanrei 会隐藏到系统托盘，而不是退出。",
    "startWithWindows": "随 Windows 启动",
    "startWithWindowsDesc": "登录时在系统托盘中静默启动。",
    "updates": "更新",
    "version": "版本 {{version}}",
    "lastChecked": "上次检查：{{when}}",
    "checkNow": "立即检查",
    "checking": "正在检查…",
    "autoUpdate": "自动安装更新",
    "autoUpdateDesc": "Zanrei 会自动下载并安装新版本，但绝不在游戏运行时进行。关闭后会先询问你。",
    "updateAvailable": "有新版本 {{version}} 可用",
    "updateTo": "更新到 {{version}}",
    "upToDate": "已是最新版本。",
    "updateFailed": "无法检查更新。",
    "install": "安装并重启",
    "installing": "正在安装…",
    "tools": "工具",
    "quit": "退出 Zanrei",
    "quitDesc": "完全关闭应用，包括后台监视。"
  },
  "os": {
    "flavor": {
      "title": "检测到 {{name}} {{version}}",
      "badgeHint": "{{name}} 是修改版 Windows",
      "body": "这台电脑运行的是修改版 Windows。Zanrei 的许多设置可能已经开启，因为 {{name}} 应用过它们；每个开关都会显示 Windows 当前的设置状态。",
      "keep": "Zanrei 只更改 {{name}} 没有动过的内容，而且每项更改仍可在“还原”中撤销。",
      "restore": "还原点需要“系统保护”。如果它处于关闭状态，Zanrei 会在做任何更改前为系统盘开启它。",
      "own": "{{name}} 管理的设置请在 {{name}} 自己的工具中更改，而不是在这里，以免两者互相撤销。",
      "docs": "{{name}} 文档"
    },
    "win10": {
      "title": "Windows 10 已不再获得免费安全更新",
      "body": "Microsoft 已于 2025 年 10 月 14 日结束对 Windows 10 的常规支持。电脑仍能继续使用，但新发现的安全问题不再免费修复。如果它能运行 Windows 11，升级是更安全的选择。",
      "guide": "阅读指南",
      "microsoft": "Microsoft 公告"
    }
  },
  "guide": {
    "tab": {
      "yourself": "自己动手",
      "fresh": "全新开始"
    },
    "link": {
      "nvidia": "NVIDIA 驱动",
      "amd": "AMD 驱动",
      "intel": "Intel 驱动",
      "atlasDrivers": "驱动指南",
      "crystaldiskinfo": "CrystalDiskInfo",
      "hwinfo": "HWiNFO",
      "atlasXmp": "分步指南",
      "atlasRebar": "分步指南",
      "site": "网站",
      "docs": "安装指南",
      "github": "GitHub",
      "youtube": "YouTube 视频",
      "win10Ended": "Windows 10 支持已结束",
      "requirements": "Windows 11 系统要求",
      "mediaHelp": "Microsoft 的说明",
      "win11": "下载 Windows 11",
      "win10": "下载 Windows 10",
      "rufus": "Rufus"
    },
    "goto": {
      "graphics": "打开“显卡”",
      "startup": "打开“启动项”",
      "library": "打开“游戏库”"
    },
    "impact": {
      "big": "效果大",
      "medium": "效果中等",
      "small": "效果小"
    },
    "effort": {
      "easy": "简单",
      "medium": "需要细心",
      "careful": "务必小心"
    },
    "yourself": {
      "intro": "Zanrei 可以改变 Windows 的行为，但一些最大的提升在 Windows 之外：在 BIOS、硬件、驱动程序和你的游戏里。这些步骤需要你自己完成。从上往下开始，前面几组最简单。",
      "honest": "每一项能帮多少取决于你的电脑。我们没有做过基准测试，所以效果标签只是我们的判断，并非测量结果。"
    },
    "group": {
      "games": {
        "title": "在游戏中",
        "desc": "通常是提升帧数最快的方法。"
      },
      "windows": {
        "title": "在 Windows 中",
        "desc": "Zanrei 无法或不应替你更改的设置。"
      },
      "drivers": {
        "title": "驱动程序",
        "desc": "让 Windows 正确使用你的硬件的软件。"
      },
      "hardware": {
        "title": "硬件",
        "desc": "需要一把螺丝刀、一次购买，或两者都要。"
      },
      "bios": {
        "title": "在 BIOS 中",
        "desc": "电脑固件中的设置，在 Windows 启动之前生效。只更改这里列出的项目。"
      }
    },
    "items": {
      "game_settings": {
        "title": "调低最耗帧数的画面设置",
        "why": "提升 FPS 最快的方法几乎总在游戏里，而不是在 Windows 里。",
        "s1": "以屏幕的原生分辨率把游戏设为全屏（新游戏可选无边框）。",
        "s2": "如果游戏提供超分辨率技术（DLSS、FSR 或 XeSS），请开启它，并把渲染比例设为约 75% 到 85%。",
        "s3": "先调低阴影、雾或体积效果、反射和视距。它们开销最大，但视觉差异最小。接下来是抗锯齿。",
        "s4": "设置帧率上限（例如屏幕的刷新率），避免电脑毫无收益地满载运行。如果游戏感觉操作迟滞，请关闭垂直同步。",
        "s5": "每次只改一项，并观察 FPS 计数器（Steam：设置、游戏中、游戏中帧率计数器），看看真正起作用的是什么。"
      },
      "laptop_power": {
        "title": "笔记本：接上电源并选择正确的电源模式",
        "why": "使用电池时，笔记本会大幅限制处理器和显卡。拔掉电源玩游戏可能会损失相当大的性能。",
        "s1": "接上笔记本附带的充电器。",
        "s2": "Windows 11：打开“设置”、“系统”、“电源和电池”，把“电源模式”设为“最佳性能”。Windows 10：点击任务栏上的电池图标，把滑块移到“最佳性能”。",
        "s3": "Zanrei 的 Game Boost 也会在游戏运行时切换电源计划，结束后再恢复。"
      },
      "refresh_rate": {
        "title": "把显示器设为最高刷新率",
        "why": "很多标称 120、144 或 240 Hz 的屏幕，在你更改之前一直以 60 Hz 运行。以真实刷新率运行时，游戏和桌面都会更流畅，而且不花一分钱。",
        "s1": "打开“设置”、“系统”、“屏幕”、“高级显示”。",
        "s2": "选择你的显示器，然后打开“选择刷新率”。",
        "s3": "选择最高的数值，然后点击“保留更改”。",
        "s4": "如果没有最高数值，请换一根线（DisplayPort 或更新的 HDMI 线），并安装显卡驱动。"
      },
      "oem_software": {
        "title": "移除厂商的试用软件和多余辅助程序",
        "why": "新电脑常常预装试用版杀毒软件（McAfee、Norton）、“电脑加速”工具和一直在运行的辅助应用。Zanrei 的“清理”页面会移除 Windows 自带的应用，但不包括这些。",
        "s1": "打开“设置”、“应用”、“安装的应用”。",
        "s2": "找出试用版杀毒软件、“加速”或“优化”工具，以及你从不使用的厂商辅助应用。",
        "s3": "卸载它们。内置的免费“Windows 安全中心”对大多数人来说已经足够。",
        "s4": "之后在 Zanrei 的“启动项”页面检查还有没有残留。",
        "caution": "如果不清楚厂商的驱动和固件更新程序是做什么的，请保留它们；也不要移除你唯一的杀毒软件。"
      },
      "browser": {
        "title": "让浏览器更轻量",
        "why": "在内存较小的电脑上，浏览器通常是占用内存最多的程序。",
        "s1": "打开浏览器设置，搜索“节省内存”（Chrome）或“睡眠标签页”（Edge）并开启。",
        "s2": "打开扩展列表，移除你不用的扩展。每个扩展都会在每个标签页中运行。",
        "s3": "关闭你不在看的标签页，改用书签保存。",
        "s4": "玩游戏时不要开着有大量标签页的浏览器。"
      },
      "overlays": {
        "title": "关闭不用的游戏内覆盖层",
        "why": "Discord、Steam、NVIDIA 和 Xbox 的覆盖层会挂入每个游戏。每个都会占用一点性能，有时还会导致卡顿或崩溃。",
        "s1": "Discord：用户设置、游戏内覆盖，将其关闭。",
        "s2": "Steam：设置、游戏中，关闭“在游戏中启用 Steam 界面”（仍可针对单个游戏开启）。",
        "s3": "NVIDIA App 或 GeForce Experience：设置，关闭游戏内覆盖。Xbox Game Bar 的录制在 Zanrei 的“游戏”页面中处理。"
      },
      "gpu_driver": {
        "title": "安装正确的显卡驱动",
        "why": "新驱动能修复游戏问题，常常还能提速。过旧的驱动，或者基础的“Microsoft 基本显示适配器”，会让很多性能白白浪费。",
        "s1": "在 Zanrei 中打开“显卡”页面。它会显示你的显卡、驱动的使用时长，以及制造商下载页面的链接。",
        "s2": "从 NVIDIA、AMD 或 Intel 官网下载与你确切型号对应的驱动，而不是使用“驱动更新”工具。",
        "s3": "运行安装程序。NVIDIA 请选择“自定义”，然后勾选“执行清洁安装”。AMD 也有类似的恢复出厂设置选项。",
        "s4": "安装程序要求时重启电脑。",
        "caution": "笔记本电脑使用笔记本厂商提供的驱动最稳妥。芯片厂商的通用驱动有时无法安装，或会关闭某些功能。"
      },
      "chipset": {
        "title": "安装芯片组驱动",
        "why": "Windows 起初会为主板使用通用驱动。厂商的芯片组驱动能为你的处理器带来正确的电源和性能表现。",
        "s1": "查找主板或笔记本型号：按 Win + R，输入 msinfo32，查看“主板产品”（或“系统型号”）。",
        "s2": "打开主板或笔记本厂商的支持页面，或者 AMD、Intel 的芯片组驱动页面。",
        "s3": "下载芯片组驱动，安装后重启。"
      },
      "disk_health": {
        "title": "检查硬盘是否健康",
        "why": "出现故障的硬盘会让整台电脑卡住、冻结，迟早还会丢失数据。",
        "s1": "安装 CrystalDiskInfo（免费）并打开。",
        "s2": "“良好”表示没问题。“警告”或“损毁”意味着：立即备份并更换硬盘。",
        "s3": "在数据安全之前，不要对标记为“警告”或“损毁”的硬盘运行修复或优化工具。"
      },
      "cooling": {
        "title": "清理灰尘并检查温度",
        "why": "处理器或显卡过热时会自行降速以保护自己（过热降频），看起来就和电脑变慢一模一样。老笔记本最常见。",
        "s1": "安装 HWiNFO（免费），以“仅传感器”模式打开，然后玩游戏或工作十分钟，同时观察 CPU 和 GPU 温度。",
        "s2": "如果温度一直在 90 °C 左右或更高，或者负载时频率下降，就说明发生了降频。",
        "s3": "关闭电脑、拔掉电源，用压缩空气短促地吹掉风扇和出风口的灰尘。用牙签按住每个风扇，避免它转得太快。",
        "s4": "把笔记本放在坚硬平整的表面或支架上，不要放在床上或腿上。更换新的导热硅脂对老电脑有帮助，但前提是你有把握拆开散热器。",
        "caution": "拆开笔记本可能会导致失去保修。"
      },
      "dual_channel": {
        "title": "使用两根内存条组成双通道",
        "why": "两根相同的内存条能为处理器提供单根两倍的内存带宽。对于共用这部分内存的处理器集成显卡来说，这往往是最划算的升级。",
        "s1": "打开任务管理器、性能、内存。“已使用的插槽：1/2”或“1/4”表示只有一根内存条。",
        "s2": "购买第二根与第一根容量和频率相同的内存条（尽量同型号）。",
        "s3": "把它们插在主板说明书中标明的双通道插槽里，通常是从处理器一侧数起的第 2 和第 4 个插槽。",
        "s4": "再次查看任务管理器，然后开启 XMP 或 EXPO（见“在 BIOS 中”）。",
        "caution": "打开机箱前请先关机并拔掉电源。很多笔记本的内存是焊死的，请先查一下你的型号。"
      },
      "ram_upgrade": {
        "title": "如果内存几乎总是满的，就加内存",
        "why": "内存用完时，Windows 会改用磁盘，一切都会卡顿。没有任何设置能代替真正的内存。",
        "s1": "在工作或玩游戏时观察 Zanrei“概览”中的内存表。如果大多数时间都高于约 85%，就说明内存不够。",
        "s2": "查清你的电脑支持的内存类型和最大容量：搜索你的型号加“内存升级”，或查看厂商的兼容性页面。",
        "s3": "如今 8 GB 是实用的最低配置，16 GB 玩游戏比较舒适。",
        "caution": "很多轻薄笔记本无法升级内存。"
      },
      "ssd": {
        "title": "把 Windows 迁移到 SSD",
        "why": "如果 Windows 从机械硬盘（HDD）启动，你做的其他任何事都比不上这一步。开机、打开程序和加载游戏都会快得多。",
        "s1": "打开任务管理器、性能、磁盘，那里会显示类型，Zanrei 的“概览”也会列出。",
        "s2": "选择你的电脑支持的 SATA 或 NVMe SSD（查看你型号的说明书）。256 GB 足够装 Windows 和一些程序。",
        "s3": "最干净的方式是先备份、装上 SSD，然后全新安装（见“全新开始”）。克隆旧硬盘也可以，但会把旧盘上的杂乱也一起复制过去。",
        "s4": "把旧硬盘留作额外存储，或者拆下来。",
        "caution": "请先备份。全新安装会抹掉所安装的那块硬盘。"
      },
      "xmp": {
        "title": "开启 XMP 或 EXPO，让内存以标称频率运行",
        "why": "内存通常以某个频率出售，但在 BIOS 中开启配置文件之前会以更低的频率运行。这对使用处理器集成显卡（共用这部分内存）的电脑和 AMD Ryzen 影响最大。",
        "s1": "打开任务管理器、性能、内存，记下“速度”。与内存条上印的频率（例如 3200 或 6000）对比。",
        "s2": "重启电脑，在启动时按进入 BIOS 的键，通常是 Del 或 F2。开机画面上常会显示是哪个键。",
        "s3": "找到名为 XMP（Intel）、EXPO 或 DOCP（AMD），或 AI Overclock Tuner 的设置。它通常在第一个超频或 Tweaker 页面上。",
        "s4": "选择 Profile 1，然后保存并退出（通常是 F10）。",
        "s5": "回到 Windows 后再次查看任务管理器。现在速度应与内存条上的标称值一致。",
        "caution": "大多数电脑都能正常启动。如果你的电脑无法启动，请关机，按住电源键十秒，然后再试。大多数主板在启动失败后会恢复到安全设置。笔记本和很多办公电脑根本没有这个设置，这很正常。"
      },
      "rebar": {
        "title": "开启 Resizable BAR",
        "why": "它让处理器能一次性访问显卡的全部显存。提升不大且因游戏而异，但在支持的平台上是免费的（大约是 2020 年以后的显卡，并搭配兼容的处理器）。",
        "s1": "检查是否支持：免费工具 GPU-Z 会显示 Resizable BAR 字段，或者查看显卡厂商的页面。",
        "s2": "在 BIOS 中先开启 Above 4G Decoding，再开启 Re-Size BAR Support。不同厂商的名称略有不同。",
        "s3": "保存、重启，然后在 GPU-Z 中再次检查。",
        "s4": "Windows 必须以 UEFI 模式安装（而不是 Legacy 或 CSM）才能生效。",
        "caution": "请先更新显卡驱动。更改你不了解的 BIOS 设置可能导致电脑无法启动，所以只改这里列出的项目。"
      }
    },
    "fresh": {
      "title": "为什么要全新开始",
      "intro": "全新开始会抹掉系统盘并安装新的 Windows。之后无法撤销任何操作，但干净的 Windows 是最好的起点，而且能做到任何应用在运行中的 Windows 上都做不到的事。",
      "gain": {
        "clean": "没有残留：多年来安装过和没删干净的程序、旧驱动、后台服务以及任何恶意软件都会消失。",
        "bloat": "没有厂商杂物：你用的是 Microsoft 自己的系统镜像，而不是厂商定制过的版本。",
        "components": "运行中的 Windows 无法移除的部分。AtlasOS 等项目会在安装完成后立即应用更改，在任何东西依赖这些部分之前。",
        "layout": "正确的磁盘布局：现代 UEFI，系统装在最快的硬盘上，不留旧 MBR 配置的任何残余。",
        "known": "已知的状态。当一切从同一个起点开始时，更容易看出到底是什么改变了性能。"
      },
      "warning": "全新开始是可选的。Zanrei 可以在你现在的 Windows 上工作，它做的一切都可以撤销。重装系统则无法撤销。"
    },
    "atlas": {
      "title": "AtlasOS",
      "badge": "面向爱好者",
      "intro": "一个开源项目（GitHub 上约 22,000 颗星），用于调整全新安装的 Windows 11，以降低延迟、减少后台进程和遥测。它在干净安装 Windows 后，通过一个名为 AME Wizard 的小型安装程序应用，所应用的 playbook 是开源的，任何人都能阅读。它由其他人开发，Zanrei 与其没有关联。撰写本文时的最新版本是 v0.5.0。",
      "fact": {
        "w11": "需要 Windows 11（撰写本文时为 24H2 或 25H2）。Atlas 已不再支持 Windows 10。",
        "pro": "请使用 Windows 专业版或企业版。不支持 Windows 家庭版。",
        "revert": "移除 Atlas 意味着要重装 Windows。",
        "security": "Atlas 允许你选择保留多少安全功能，例如 Defender 和 Windows 更新。做决定前请阅读它的安全说明页面。",
        "unofficial": "Zanrei 没有对 Atlas 做过基准测试。不同电脑的结果会有所不同。"
      },
      "videos": "很多人录制过前后对比测试，所以在 YouTube 上搜索 AtlasOS，可以看到它在类似你的电脑上的表现。对任何单个视频都要谨慎看待。",
      "others": "也有类似的项目，例如"
    },
    "win10": {
      "title": "Windows 10 还是 11？",
      "body": "Microsoft 已于 2025 年 10 月 14 日停止为 Windows 10 提供免费安全更新。如果你的电脑满足 Windows 11 的要求，请安装 Windows 11。如果不满足，全新的 Windows 10 仍可运行，但请保持浏览器更新、避免有风险的下载，并计划更换电脑。Microsoft 的页面列出了付费的扩展更新选项。"
    },
    "install": {
      "title": "如何重装 Windows（10 或 11）",
      "intro": "两者的步骤相同。预留一到两个小时，安装期间不要关机。",
      "atlasNote": "如果你想用 AtlasOS，请在第一次启动后停下，从那里开始按照它自己的安装指南操作。它的步骤会随版本变化，请使用最新的说明。",
      "step": {
        "backup": {
          "title": "备份重要内容",
          "body": "把文档、照片、游戏存档和浏览器书签复制到外置硬盘或云存储。记下付费程序的许可证密钥。系统盘上的所有内容都会被抹掉。"
        },
        "activation": {
          "title": "检查 Windows 是否已激活",
          "body": "打开“设置”、“系统”、“激活”。“已使用数字许可证激活”表示重装后 Windows 会自动激活。你可能需要用同一个 Microsoft 账户登录。"
        },
        "drivers": {
          "title": "先下载驱动",
          "body": "在另一台设备上，下载你的主板或笔记本的网卡驱动（Wi-Fi 或以太网）并存到 U 盘里。没有它，新装的 Windows 可能无法上网。也请下载显卡驱动。"
        },
        "media": {
          "title": "从 Microsoft 获取 Windows",
          "body": "使用 Microsoft 的媒体创建工具，选择“创建安装介质”，并准备一个至少 8 GB 的 U 盘（会被清空）。也可以下载 ISO 文件，用 Rufus 写入 U 盘。"
        },
        "boot": {
          "title": "从 U 盘启动",
          "body": "重启，在电脑启动时按启动菜单键，常见的是 F12、F11、F8、Esc 或 Del。厂商的开机画面通常会显示。选择 U 盘，最好选以 UEFI 开头的那一项。"
        },
        "setup": {
          "title": "运行安装程序",
          "body": "选择语言，然后点击“现在安装”。如果 Windows 之前已激活，选择“我没有产品密钥”即可。选择与之前相同的版本（专业版或家庭版），接受许可条款，然后选择“自定义：仅安装 Windows”。"
        },
        "drive": {
          "title": "选择硬盘",
          "body": "选择要安装 Windows 的硬盘。要彻底清空它，请删除它的分区，选中未分配的空间，然后点击“下一步”。不要动存放你文件的硬盘。可以根据容量来区分它们。"
        },
        "firstrun": {
          "title": "首次启动",
          "body": "Windows 会重启几次。选择你的地区和键盘并连接网络，必要时使用 U 盘中的驱动。Windows 11 会要求你用 Microsoft 账户登录。"
        },
        "update": {
          "title": "更新并安装驱动",
          "body": "反复运行 Windows 更新直到没有剩余更新，然后安装芯片组和显卡驱动并重启。"
        },
        "zanrei": {
          "title": "然后安装 Zanrei",
          "body": "运行 Zanrei 的设置向导。它会创建还原点，应用适合你电脑的设置，并显示还剩哪些事要做。"
        }
      }
    }
  },
  "tweaks": {
    "telemetry": {
      "name": "减少诊断数据",
      "desc": "要求 Windows 只发送最低限度的必需诊断数据，并停止反馈请求。"
    },
    "advertising_id": {
      "name": "关闭广告 ID",
      "desc": "阻止应用使用每个用户的 ID 来个性化广告。"
    },
    "tailored_experiences": {
      "name": "关闭量身定制的体验",
      "desc": "阻止 Windows 使用你的诊断数据来推荐提示和广告。"
    },
    "activity_history": {
      "name": "关闭活动历史记录",
      "desc": "阻止 Windows 收集并上传你打开的应用和文件。"
    },
    "suggestions": {
      "name": "移除建议和广告",
      "desc": "隐藏“开始”菜单、“设置”和锁屏中的推广应用和提示，并阻止静默安装应用。"
    },
    "web_search": {
      "name": "只在这台电脑上搜索",
      "desc": "从“开始”菜单搜索中移除网络结果，让搜索更快、更私密。"
    },
    "consumer_features": {
      "name": "阻止推广应用的安装",
      "desc": "阻止 Windows 在设置完成或更新后安装游戏等赞助应用。"
    },
    "delivery_optimization": {
      "name": "不向其他电脑上传更新",
      "desc": "Windows 只从 Microsoft 下载更新，而不是通过你的网络连接共享更新。"
    },
    "telemetry_tasks": {
      "name": "禁用遥测计划任务",
      "desc": "关闭收集兼容性和使用数据的后台任务。"
    },
    "diagnostic_services": {
      "name": "禁用遥测服务",
      "desc": "停止“已连接的用户体验和遥测”服务及推送消息服务。重启后生效。"
    },
    "location": {
      "name": "关闭定位服务",
      "desc": "禁止所有应用访问位置。“地图”和“查找我的设备”将无法使用。"
    },
    "background_apps": {
      "name": "禁止应用商店应用在后台运行",
      "desc": "在老电脑上节省内存和电量。应用商店应用关闭后将不再更新磁贴或通知。"
    },
    "error_reporting": {
      "name": "关闭 Windows 错误报告",
      "desc": "停止收集和发送崩溃报告。你会失去内置的崩溃诊断。"
    },
    "windows_ai": {
      "name": "关闭 Copilot 和 Recall",
      "desc": "禁用 Copilot 按钮，以及会截取你屏幕快照的 AI 数据分析。"
    },
    "animations": {
      "name": "减少动画",
      "desc": "关闭大部分窗口动画和菜单延迟，让老电脑感觉更快。注销后生效。"
    },
    "transparency": {
      "name": "关闭透明效果",
      "desc": "去掉窗口和任务栏的半透明模糊效果，可在老显卡上节省图形性能。"
    },
    "startup_delay": {
      "name": "移除启动延迟",
      "desc": "Windows 会在启动程序运行前等待一段时间。此项让它们在登录后立即启动。"
    },
    "edge_background": {
      "name": "禁止 Edge 在后台运行",
      "desc": "阻止 Edge 预加载，以及关闭后仍驻留内存。Edge 可能会显示“由你的组织管理”的提示。"
    },
    "sysmain": {
      "name": "关闭 SysMain（Superfetch）",
      "desc": "停止把应用预加载到内存中。在部分系统上有帮助，但只建议用于 SSD；机械硬盘请保持开启。"
    },
    "search_indexing": {
      "name": "关闭搜索索引",
      "desc": "停止后台索引器。能减少旧机械硬盘的磁盘活动，但文件搜索会变慢。"
    },
    "hibernation": {
      "name": "关闭休眠",
      "desc": "删除休眠文件，释放数 GB 空间。同时也会关闭快速启动。"
    },
    "high_performance_plan": {
      "name": "使用高性能电源计划",
      "desc": "让处理器随时保持全速待命。耗电更多；不适合使用电池的笔记本。"
    },
    "svchost_split": {
      "name": "把 Windows 服务合并到更少的进程中",
      "desc": "内存超过 3.5 GB 时，Windows 会让每个服务各自运行在独立进程中。重新合并后，在 4 到 8 GB 内存的电脑上可节省内存并减少数十个后台进程。需要重启。"
    },
    "power_throttling": {
      "name": "关闭电源节流",
      "desc": "阻止 Windows 为省电而降低后台程序的速度。可能对老台式机有帮助；笔记本会更耗电。需要重启。"
    },
    "multimedia_scheduler": {
      "name": "让游戏优先于后台多媒体",
      "desc": "把 Windows 为后台多媒体任务保留的处理器时间从 20% 降到 10%，让更多时间分给游戏。"
    },
    "foreground_priority": {
      "name": "优先照顾你正在使用的程序",
      "desc": "给前台窗口更短的时间片和最大的优先级提升，让它在繁忙的老电脑上反应更灵敏。"
    },
    "vbs_off": {
      "name": "关闭内存完整性（VBS）",
      "desc": "出于安全考虑，Windows 可以把自身的一部分运行在虚拟机中。在某些电脑上，这会降低游戏帧数。它还会移除一层防恶意软件的保护：只适合主要用来玩游戏的电脑。需要重启。"
    },
    "game_mode": {
      "name": "开启游戏模式",
      "desc": "让 Windows 优先处理你正在玩的游戏，而不是后台任务。"
    },
    "game_dvr": {
      "name": "关闭后台游戏录制",
      "desc": "阻止 Xbox Game Bar 在后台录制，这会消耗帧数。"
    },
    "windowed_optimizations": {
      "name": "窗口化游戏优化",
      "desc": "改善延迟，并在无边框和窗口化游戏中启用自动 HDR 等功能（Windows 11 22H2+）。"
    },
    "vrr": {
      "name": "窗口化游戏的可变刷新率",
      "desc": "让 G-SYNC 和 FreeSync 显示器在窗口化游戏中同步（Windows 11 22H2+）。需要支持的显示器。"
    },
    "hags": {
      "name": "硬件加速 GPU 计划",
      "desc": "让显卡自己管理显存。对部分游戏有帮助，对另一些则有负面影响。需要较新的 GPU 驱动并重启。"
    },
    "fullscreen_optimizations": {
      "name": "全局禁用全屏优化",
      "desc": "让游戏以真正的独占全屏运行。有些游戏响应更灵敏，有些则更差。你也可以针对单个游戏设置。"
    },
    "mouse_precision": {
      "name": "关闭指针加速",
      "desc": "让光标 1:1 跟随你的手，这是大多数射击游戏所期望的。注销后生效。"
    },
    "sticky_keys": {
      "name": "禁用粘滞键快捷方式",
      "desc": "阻止按五次或按住 Shift 时弹出的窗口，这可能会打断游戏。"
    },
    "file_extensions": {
      "name": "显示文件扩展名",
      "desc": "显示 .exe、.png 等扩展名，更容易识别伪装的文件。"
    },
    "hidden_files": {
      "name": "显示隐藏文件",
      "desc": "在文件资源管理器中显示隐藏的文件和文件夹。"
    },
    "end_task": {
      "name": "在任务栏菜单中添加“结束任务”",
      "desc": "右键单击任务栏上的应用即可将其关闭，即使它已无响应（Windows 11 22H2+）。"
    },
    "widgets": {
      "name": "关闭小组件和资讯",
      "desc": "移除小组件面板和资讯源，它们会运行后台进程。"
    },
    "long_paths": {
      "name": "允许超长文件路径",
      "desc": "为支持的应用取消 260 个字符的路径长度限制。"
    },
    "no_auto_reboot": {
      "name": "登录期间不自动重启",
      "desc": "你登录期间，Windows 更新不会重启你的电脑。"
    },
    "onedrive_policy": {
      "name": "停止 OneDrive 同步文件",
      "desc": "通过策略关闭 OneDrive 文件同步，而不卸载它。"
    },
    "edge_debloat": {
      "name": "移除 Edge 的提示和广告",
      "desc": "隐藏 Edge 的首次运行页面、购物助手、推荐内容和奖励。Edge 可能会显示“由你的组织管理”的提示。"
    },
    "remove_edge": {
      "name": "移除 Microsoft Edge",
      "desc": "卸载 Edge 浏览器，并阻止 Windows 再次安装它。Zanrei 等应用所需的 WebView2 运行时会保留。此操作无法在 Zanrei 中撤销。请先确保你有另一个浏览器。"
    },
    "bloat_apps": {
      "name": "移除预装应用",
      "desc": "卸载你在列表中勾选的应用商店推广应用（资讯、天气、纸牌、Candy Crush 等）。Spotify、手机连接等常用应用默认不勾选。Xbox、应用商店、照片和计算器永远不会列出。此操作无法在 Zanrei 中撤销；如有需要，可从 Microsoft Store 重新安装。"
    }
  }
} satisfies Translation<Locale>;
