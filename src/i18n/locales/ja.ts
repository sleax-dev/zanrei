import type { DeepPartial, Locale } from "./en";

// Translated: the interface core. Anything missing here (newer screens, tweak descriptions) falls back to English.
export default {
  "common": {
    "next": "次へ",
    "back": "戻る",
    "finish": "完了",
    "retry": "再試行",
    "cancel": "キャンセル",
    "confirm": "確認",
    "close": "閉じる",
    "loading": "読み込み中…",
    "search": "検索"
  },
  "setup": {
    "steps": {
      "welcome": "ようこそ",
      "recommend": "おすすめ",
      "done": "完了"
    },
    "scan": {
      "working": "スキャン中…"
    },
    "mode": {
      "title": "Zanreiにどこまで任せますか？",
      "desc": "いつでも変更できます。",
      "manual": {
        "name": "手動",
        "desc": "あなたが選ばない限り何も実行されません。"
      },
      "recommended": {
        "name": "おすすめ",
        "desc": "Zanreiが安全な改善を提案し、あなたが1つずつ確認します。"
      },
      "auto": {
        "name": "自動",
        "desc": "Zanreiが安全な改善を自動で適用します。常に復元ポイントを作成してから実行します。"
      }
    },
    "done": {
      "title": "準備完了",
      "start": "Zanreiを開く"
    }
  },
  "nav": {
    "overview": "概要",
    "restore": "復元",
    "settings": "設定"
  },
  "splash": {
    "tagline": "Windowsを最適化。すべての変更は元に戻せます。"
  },
  "titlebar": {
    "minimize": "最小化",
    "close": "閉じる",
    "closeToTray": "閉じる(バックグラウンドで動作を続けます)"
  },
  "overview": {
    "title": "お使いのPC",
    "cpu": "プロセッサ",
    "ram": "メモリ",
    "gpu": "グラフィックス",
    "storage": "ストレージ",
    "os": "システム",
    "noGpu": "グラフィックスカードが見つかりません",
    "cores": "{{physical}}コア / {{logical}}スレッド",
    "tier": {
      "Legacy": "古いPC",
      "Mainstream": "標準的なPC",
      "High": "高性能PC"
    }
  },
  "restore": {
    "empty": "復元ポイントはまだありません。",
    "create": "復元ポイントを作成",
    "creating": "作成中…",
    "rollback": "元に戻す",
    "rolledBack": "元に戻しました",
    "openSystem": "Windowsのシステムの復元を開く",
    "confirmTitle": "この復元ポイントを元に戻しますか？",
    "confirmBody": "この復元ポイントに保存されたすべての変更が元に戻されます。",
    "failed": "問題が発生しました"
  },
  "settings": {
    "language": "言語"
  }
} satisfies DeepPartial<Locale>;
