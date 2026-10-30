import type { DeepPartial, Locale } from "./en";

// Translated: the interface core. Anything missing here (newer screens, tweak descriptions) falls back to English.
export default {
  "common": {
    "next": "التالي",
    "back": "رجوع",
    "finish": "إنهاء",
    "retry": "إعادة المحاولة",
    "cancel": "إلغاء",
    "confirm": "تأكيد",
    "close": "إغلاق",
    "loading": "جارٍ التحميل…",
    "search": "بحث"
  },
  "setup": {
    "steps": {
      "welcome": "مرحبًا",
      "recommend": "موصى به",
      "done": "تم"
    },
    "scan": {
      "working": "جارٍ الفحص…"
    },
    "mode": {
      "title": "ما مقدار ما يفعله Zanrei؟",
      "desc": "يمكنك تغيير ذلك في أي وقت.",
      "manual": {
        "name": "يدوي",
        "desc": "لا يحدث شيء ما لم تختره."
      },
      "recommended": {
        "name": "موصى به",
        "desc": "يقترح Zanrei تحسينات آمنة وتؤكد أنت كل واحد منها."
      },
      "auto": {
        "name": "تلقائي",
        "desc": "يطبّق Zanrei التحسينات الآمنة بنفسه، وبعد إنشاء نقطة استعادة دائمًا."
      }
    },
    "done": {
      "title": "كل شيء جاهز",
      "start": "فتح Zanrei"
    }
  },
  "nav": {
    "overview": "نظرة عامة",
    "restore": "الاستعادة",
    "settings": "الإعدادات"
  },
  "boost": {
    "label": "تسريع الألعاب",
    "on": "مفعّل",
    "off": "متوقف"
  },
  "splash": {
    "tagline": "ويندوز مُحسَّن. كل تغيير يمكن التراجع عنه."
  },
  "titlebar": {
    "minimize": "تصغير",
    "close": "إغلاق",
    "closeToTray": "إغلاق (يستمر في العمل في الخلفية)"
  },
  "bloat": {
    "pick": "تُزال التطبيقات التي تحددها فقط. التطبيقات التي يستخدمها كثيرون تبقى غير محددة.",
    "mayUse": "قد تستخدمه",
    "none": "لا يوجد أي من التطبيقات القابلة للإزالة مثبتًا.",
    "remove_one": "إزالة {{count}} تطبيق",
    "remove_other": "إزالة {{count}} تطبيقات"
  },
  "overview": {
    "title": "جهازك",
    "cpu": "المعالج",
    "ram": "الذاكرة",
    "gpu": "الرسومات",
    "storage": "التخزين",
    "os": "النظام",
    "noGpu": "لم يتم العثور على بطاقة رسومات",
    "cores": "{{physical}} أنوية / {{logical}} مسارات",
    "tier": {
      "Legacy": "جهاز قديم",
      "Mainstream": "جهاز متوسط",
      "High": "جهاز عالي الأداء"
    }
  },
  "restore": {
    "empty": "لا توجد نقاط استعادة بعد.",
    "create": "إنشاء نقطة استعادة",
    "creating": "جارٍ الإنشاء…",
    "rollback": "تراجع",
    "rolledBack": "تم التراجع",
    "openSystem": "فتح استعادة النظام في Windows",
    "confirmTitle": "التراجع عن نقطة الاستعادة هذه؟",
    "confirmBody": "ستتم إعادة جميع التغييرات المحفوظة في هذه النقطة إلى حالتها السابقة.",
    "failed": "حدث خطأ ما"
  },
  "settings": {
    "language": "اللغة"
  }
} satisfies DeepPartial<Locale>;
