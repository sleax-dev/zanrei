//! The tweaks. Values were cross-checked against widely used open-source projects (winutil, Win11Debloat,
//! Windows10Debloater; all MIT) and Microsoft's policy documentation. Names and descriptions live in the UI
//! translations under `tweaks.<id>`.

use super::{Action, Category, Restart, Risk, Tweak};
use crate::platform::{
    Hive::{Hkcu, Hklm},
    RegKey, RegValue,
};
use crate::system::Tier::{High, Legacy, Mainstream};
use std::sync::OnceLock;

/// Pre-installed Store apps that are safe to remove. Xbox, Store, Photos, Calculator and the like are deliberately absent.
pub const BLOAT_APPS: &[&str] = &[
    "Clipchamp.Clipchamp",
    "Microsoft.BingNews",
    "Microsoft.BingWeather",
    "Microsoft.BingFinance",
    "Microsoft.BingSports",
    "Microsoft.GetHelp",
    "Microsoft.Getstarted",
    "Microsoft.Microsoft3DViewer",
    "Microsoft.MicrosoftOfficeHub",
    "Microsoft.MicrosoftSolitaireCollection",
    "Microsoft.MixedReality.Portal",
    "Microsoft.People",
    "Microsoft.PowerAutomateDesktop",
    "Microsoft.SkypeApp",
    "Microsoft.Todos",
    "Microsoft.WindowsFeedbackHub",
    "Microsoft.YourPhone",
    "Microsoft.ZuneMusic",
    "Microsoft.ZuneVideo",
    "MicrosoftCorporationII.MicrosoftFamily",
    "MicrosoftTeams",
    "king.com.CandyCrushSaga",
    "king.com.CandyCrushSodaSaga",
    "SpotifyAB.SpotifyMusic",
    "Disney.37853FC22B2CE",
    "BytedancePte.Ltd.TikTok",
    "Facebook.Facebook",
];

fn dword(h: crate::platform::Hive, path: &str, name: &str, apply: u32, revert: Option<u32>) -> Action {
    Action::Reg {
        key: RegKey::new(h, path, name),
        apply: RegValue::Dword(apply),
        revert: revert.map(RegValue::Dword),
    }
}

fn string(h: crate::platform::Hive, path: &str, name: &str, apply: &str, revert: Option<&str>) -> Action {
    Action::Reg {
        key: RegKey::new(h, path, name),
        apply: RegValue::String(apply.into()),
        revert: revert.map(|r| RegValue::String(r.into())),
    }
}

fn service(name: &str, stock_start: u32) -> Action {
    dword(
        Hklm,
        &format!(r"SYSTEM\CurrentControlSet\Services\{name}"),
        "Start",
        4,
        Some(stock_start),
    )
}

fn t(
    id: &'static str,
    category: Category,
    risk: Risk,
    restart: Restart,
    recommended: &'static [crate::system::Tier],
    actions: Vec<Action>,
) -> Tweak {
    Tweak {
        id,
        category,
        risk,
        restart,
        min_build: 0,
        recommended,
        reversible: true,
        default_applied: false,
        actions,
    }
}

const ALL: &[crate::system::Tier] = &[Legacy, Mainstream, High];
const NONE: &[crate::system::Tier] = &[];
const WIN11_22H2: u32 = 22621;

pub fn catalog() -> &'static [Tweak] {
    static CATALOG: OnceLock<Vec<Tweak>> = OnceLock::new();
    CATALOG.get_or_init(build)
}

fn build() -> Vec<Tweak> {
    use Category::*;
    use Restart as R;
    use Risk::*;

    const CDM: &str = r"Software\Microsoft\Windows\CurrentVersion\ContentDeliveryManager";
    const EDGE: &str = r"SOFTWARE\Policies\Microsoft\Edge";
    const PRIV: &str = r"SOFTWARE\Policies\Microsoft\Windows";
    const EXPLORER_ADV: &str = r"Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced";
    const GAME_CFG: &str = r"System\GameConfigStore";
    const GPU_PREFS: &str = r"Software\Microsoft\DirectX\UserGpuPreferences";

    let suggestions = [
        "SubscribedContent-310093Enabled",
        "SubscribedContent-338387Enabled",
        "SubscribedContent-338388Enabled",
        "SubscribedContent-338389Enabled",
        "SubscribedContent-338393Enabled",
        "SubscribedContent-353694Enabled",
        "SubscribedContent-353696Enabled",
        "SystemPaneSuggestionsEnabled",
        "SilentInstalledAppsEnabled",
        "SoftLandingEnabled",
        "PreInstalledAppsEnabled",
        "OemPreInstalledAppsEnabled",
        "ContentDeliveryAllowed",
        "RotatingLockScreenOverlayEnabled",
    ]
    .iter()
    .map(|n| dword(Hkcu, CDM, n, 0, Some(1)))
    .collect();

    let telemetry_tasks = [
        r"\Microsoft\Windows\Application Experience\Microsoft Compatibility Appraiser",
        r"\Microsoft\Windows\Application Experience\ProgramDataUpdater",
        r"\Microsoft\Windows\Customer Experience Improvement Program\Consolidator",
        r"\Microsoft\Windows\Customer Experience Improvement Program\UsbCeip",
        r"\Microsoft\Windows\Feedback\Siuf\DmClient",
        r"\Microsoft\Windows\Feedback\Siuf\DmClientOnScenarioDownload",
        r"\Microsoft\Windows\Windows Error Reporting\QueueReporting",
    ]
    .into_iter()
    .map(Action::Task)
    .collect();

    let edge_annoyances = [
        ("HideFirstRunExperience", 1),
        ("ShowRecommendationsEnabled", 0),
        ("EdgeShoppingAssistantEnabled", 0),
        ("UserFeedbackAllowed", 0),
        ("PersonalizationReportingEnabled", 0),
        ("DefaultBrowserSettingsCampaignEnabled", 0),
        ("SpotlightExperiencesAndRecommendationsEnabled", 0),
        ("WalletDonationEnabled", 0),
        ("NewTabPageContentEnabled", 0),
    ]
    .iter()
    .map(|(n, v)| dword(Hklm, EDGE, n, *v, None))
    .collect();

    let remove_edge = Tweak {
        id: "remove_edge",
        category: Cleanup,
        risk: Advanced,
        restart: R::None,
        min_build: 0,
        recommended: NONE,
        reversible: true,
        default_applied: false,
        actions: vec![
            // Stops Edge Update from putting the browser back; WebView2 has its own id and is untouched.
            dword(
                Hklm,
                r"SOFTWARE\Policies\Microsoft\EdgeUpdate",
                "Install{56EB18F8-B008-4CBD-B6D2-8C97FE7E9062}",
                0,
                None,
            ),
            Action::RemoveEdge,
        ],
    };
    let bloat = Tweak {
        id: "bloat_apps",
        category: Cleanup,
        risk: Advanced,
        restart: R::None,
        min_build: 0,
        recommended: NONE,
        reversible: false,
        default_applied: false,
        actions: vec![Action::RemoveBloatApps],
    };

    let mut v = vec![
        // ---- Privacy
        t(
            "telemetry",
            Privacy,
            Safe,
            R::None,
            ALL,
            vec![
                dword(Hklm, &format!(r"{PRIV}\DataCollection"), "AllowTelemetry", 0, None),
                dword(
                    Hklm,
                    &format!(r"{PRIV}\DataCollection"),
                    "DoNotShowFeedbackNotifications",
                    1,
                    None,
                ),
            ],
        ),
        t(
            "advertising_id",
            Privacy,
            Safe,
            R::None,
            ALL,
            vec![dword(
                Hkcu,
                r"Software\Microsoft\Windows\CurrentVersion\AdvertisingInfo",
                "Enabled",
                0,
                None,
            )],
        ),
        t(
            "tailored_experiences",
            Privacy,
            Safe,
            R::None,
            ALL,
            vec![dword(
                Hkcu,
                r"Software\Microsoft\Windows\CurrentVersion\Privacy",
                "TailoredExperiencesWithDiagnosticDataEnabled",
                0,
                None,
            )],
        ),
        t(
            "activity_history",
            Privacy,
            Safe,
            R::None,
            ALL,
            vec![
                dword(Hklm, &format!(r"{PRIV}\System"), "PublishUserActivities", 0, None),
                dword(Hklm, &format!(r"{PRIV}\System"), "UploadUserActivities", 0, None),
            ],
        ),
        t("suggestions", Privacy, Safe, R::None, ALL, suggestions),
        t(
            "web_search",
            Privacy,
            Safe,
            R::Explorer,
            ALL,
            vec![
                dword(
                    Hkcu,
                    r"Software\Policies\Microsoft\Windows\Explorer",
                    "DisableSearchBoxSuggestions",
                    1,
                    None,
                ),
                dword(
                    Hkcu,
                    r"Software\Microsoft\Windows\CurrentVersion\Search",
                    "BingSearchEnabled",
                    0,
                    Some(1),
                ),
            ],
        ),
        t(
            "consumer_features",
            Privacy,
            Safe,
            R::SignOut,
            ALL,
            vec![dword(
                Hklm,
                &format!(r"{PRIV}\CloudContent"),
                "DisableWindowsConsumerFeatures",
                1,
                None,
            )],
        ),
        t(
            "delivery_optimization",
            Privacy,
            Safe,
            R::None,
            ALL,
            vec![dword(
                Hklm,
                &format!(r"{PRIV}\DeliveryOptimization"),
                "DODownloadMode",
                0,
                None,
            )],
        ),
        t("telemetry_tasks", Privacy, Moderate, R::None, NONE, telemetry_tasks),
        t(
            "diagnostic_services",
            Privacy,
            Moderate,
            R::Reboot,
            NONE,
            vec![service("DiagTrack", 2), service("dmwappushservice", 3)],
        ),
        t(
            "location",
            Privacy,
            Moderate,
            R::None,
            NONE,
            vec![dword(
                Hklm,
                &format!(r"{PRIV}\LocationAndSensors"),
                "DisableLocation",
                1,
                None,
            )],
        ),
        t(
            "background_apps",
            Privacy,
            Moderate,
            R::None,
            &[Legacy],
            vec![dword(
                Hkcu,
                r"Software\Microsoft\Windows\CurrentVersion\BackgroundAccessApplications",
                "GlobalUserDisabled",
                1,
                Some(0),
            )],
        ),
        t(
            "error_reporting",
            Privacy,
            Moderate,
            R::None,
            NONE,
            vec![dword(
                Hklm,
                r"SOFTWARE\Microsoft\Windows\Windows Error Reporting",
                "Disabled",
                1,
                None,
            )],
        ),
        Tweak {
            min_build: 22000,
            ..t(
                "windows_ai",
                Privacy,
                Moderate,
                R::SignOut,
                NONE,
                vec![
                    dword(
                        Hkcu,
                        r"Software\Policies\Microsoft\Windows\WindowsCopilot",
                        "TurnOffWindowsCopilot",
                        1,
                        None,
                    ),
                    dword(
                        Hklm,
                        &format!(r"{PRIV}\WindowsCopilot"),
                        "TurnOffWindowsCopilot",
                        1,
                        None,
                    ),
                    dword(
                        Hkcu,
                        r"Software\Policies\Microsoft\Windows\WindowsAI",
                        "DisableAIDataAnalysis",
                        1,
                        None,
                    ),
                    dword(Hklm, &format!(r"{PRIV}\WindowsAI"), "DisableAIDataAnalysis", 1, None),
                ],
            )
        },
        // ---- Performance
        t(
            "animations",
            Performance,
            Moderate,
            R::SignOut,
            &[Legacy],
            vec![
                Action::Reg {
                    key: RegKey::new(Hkcu, r"Control Panel\Desktop", "UserPreferencesMask"),
                    apply: RegValue::Binary(vec![0x90, 0x12, 0x07, 0x80, 0x10, 0x00, 0x00, 0x00]),
                    revert: Some(RegValue::Binary(vec![0x9e, 0x1e, 0x07, 0x80, 0x12, 0x00, 0x00, 0x00])),
                },
                string(Hkcu, r"Control Panel\Desktop", "MenuShowDelay", "0", Some("400")),
                dword(Hkcu, EXPLORER_ADV, "TaskbarAnimations", 0, Some(1)),
            ],
        ),
        t(
            "transparency",
            Performance,
            Safe,
            R::None,
            &[Legacy],
            vec![dword(
                Hkcu,
                r"Software\Microsoft\Windows\CurrentVersion\Themes\Personalize",
                "EnableTransparency",
                0,
                Some(1),
            )],
        ),
        t(
            "startup_delay",
            Performance,
            Safe,
            R::SignOut,
            ALL,
            vec![dword(
                Hkcu,
                r"Software\Microsoft\Windows\CurrentVersion\Explorer\Serialize",
                "StartupDelayInMSec",
                0,
                None,
            )],
        ),
        t(
            "edge_background",
            Performance,
            Safe,
            R::None,
            ALL,
            vec![
                dword(Hklm, EDGE, "StartupBoostEnabled", 0, None),
                dword(Hklm, EDGE, "BackgroundModeEnabled", 0, None),
            ],
        ),
        t(
            "sysmain",
            Performance,
            Moderate,
            R::Reboot,
            NONE,
            vec![service("SysMain", 2)],
        ),
        t(
            "search_indexing",
            Performance,
            Advanced,
            R::Reboot,
            NONE,
            vec![service("WSearch", 2)],
        ),
        t(
            "hibernation",
            Performance,
            Moderate,
            R::None,
            NONE,
            vec![Action::Hibernate],
        ),
        t(
            "high_performance_plan",
            Performance,
            Moderate,
            R::None,
            NONE,
            vec![Action::HighPerformancePlan],
        ),
        // ---- Gaming
        // Windows ships with Game Mode on, so a PC that never touched the values counts as "on".
        Tweak {
            default_applied: true,
            ..t(
                "game_mode",
                Gaming,
                Safe,
                R::None,
                ALL,
                vec![
                    dword(Hkcu, r"Software\Microsoft\GameBar", "AutoGameModeEnabled", 1, Some(0)),
                    dword(Hkcu, r"Software\Microsoft\GameBar", "AllowAutoGameMode", 1, Some(0)),
                ],
            )
        },
        t(
            "game_dvr",
            Gaming,
            Safe,
            R::None,
            &[Mainstream, High],
            vec![
                dword(Hkcu, GAME_CFG, "GameDVR_Enabled", 0, Some(1)),
                dword(
                    Hkcu,
                    r"Software\Microsoft\Windows\CurrentVersion\GameDVR",
                    "AppCaptureEnabled",
                    0,
                    Some(1),
                ),
            ],
        ),
        Tweak {
            min_build: WIN11_22H2,
            ..t(
                "windowed_optimizations",
                Gaming,
                Safe,
                R::None,
                &[Mainstream, High],
                vec![Action::RegKv {
                    key: RegKey::new(Hkcu, GPU_PREFS, "DirectXUserGlobalSettings"),
                    field: "SwapEffectUpgradeEnable",
                    value: "1",
                }],
            )
        },
        Tweak {
            min_build: WIN11_22H2,
            ..t(
                "vrr",
                Gaming,
                Safe,
                R::None,
                NONE,
                vec![Action::RegKv {
                    key: RegKey::new(Hkcu, GPU_PREFS, "DirectXUserGlobalSettings"),
                    field: "VRROptimizeEnable",
                    value: "1",
                }],
            )
        },
        t(
            "hags",
            Gaming,
            Moderate,
            R::Reboot,
            NONE,
            vec![dword(
                Hklm,
                r"SYSTEM\CurrentControlSet\Control\GraphicsDrivers",
                "HwSchMode",
                2,
                None,
            )],
        ),
        t(
            "fullscreen_optimizations",
            Gaming,
            Moderate,
            R::None,
            NONE,
            vec![
                dword(Hkcu, GAME_CFG, "GameDVR_FSEBehaviorMode", 2, None),
                dword(Hkcu, GAME_CFG, "GameDVR_HonorUserFSEBehaviorMode", 1, None),
                dword(Hkcu, GAME_CFG, "GameDVR_FSEBehavior", 2, None),
                dword(Hkcu, GAME_CFG, "GameDVR_DXGIHonorFSEWindowsCompatible", 1, None),
            ],
        ),
        t(
            "mouse_precision",
            Gaming,
            Safe,
            R::SignOut,
            NONE,
            vec![
                string(Hkcu, r"Control Panel\Mouse", "MouseSpeed", "0", Some("1")),
                string(Hkcu, r"Control Panel\Mouse", "MouseThreshold1", "0", Some("6")),
                string(Hkcu, r"Control Panel\Mouse", "MouseThreshold2", "0", Some("10")),
            ],
        ),
        t(
            "sticky_keys",
            Gaming,
            Safe,
            R::SignOut,
            NONE,
            vec![
                string(
                    Hkcu,
                    r"Control Panel\Accessibility\StickyKeys",
                    "Flags",
                    "506",
                    Some("510"),
                ),
                string(
                    Hkcu,
                    r"Control Panel\Accessibility\Keyboard Response",
                    "Flags",
                    "122",
                    Some("126"),
                ),
                string(
                    Hkcu,
                    r"Control Panel\Accessibility\ToggleKeys",
                    "Flags",
                    "58",
                    Some("62"),
                ),
            ],
        ),
        // ---- Interface
        t(
            "file_extensions",
            Interface,
            Safe,
            R::Explorer,
            NONE,
            vec![dword(Hkcu, EXPLORER_ADV, "HideFileExt", 0, Some(1))],
        ),
        t(
            "hidden_files",
            Interface,
            Safe,
            R::Explorer,
            NONE,
            vec![dword(Hkcu, EXPLORER_ADV, "Hidden", 1, Some(2))],
        ),
        Tweak {
            min_build: WIN11_22H2,
            ..t(
                "end_task",
                Interface,
                Safe,
                R::Explorer,
                NONE,
                vec![dword(
                    Hkcu,
                    &format!(r"{EXPLORER_ADV}\TaskbarDeveloperSettings"),
                    "TaskbarEndTask",
                    1,
                    None,
                )],
            )
        },
        t(
            "widgets",
            Interface,
            Safe,
            R::Explorer,
            &[Legacy],
            vec![
                dword(
                    Hklm,
                    r"SOFTWARE\Policies\Microsoft\Dsh",
                    "AllowNewsAndInterests",
                    0,
                    None,
                ),
                dword(Hklm, &format!(r"{PRIV}\Windows Feeds"), "EnableFeeds", 0, None),
            ],
        ),
        // ---- System
        t(
            "long_paths",
            System,
            Safe,
            R::SignOut,
            NONE,
            vec![dword(
                Hklm,
                r"SYSTEM\CurrentControlSet\Control\FileSystem",
                "LongPathsEnabled",
                1,
                Some(0),
            )],
        ),
        t(
            "no_auto_reboot",
            System,
            Safe,
            R::None,
            ALL,
            vec![dword(
                Hklm,
                &format!(r"{PRIV}\WindowsUpdate\AU"),
                "NoAutoRebootWithLoggedOnUsers",
                1,
                None,
            )],
        ),
        t(
            "onedrive_policy",
            System,
            Moderate,
            R::SignOut,
            NONE,
            vec![dword(
                Hklm,
                &format!(r"{PRIV}\OneDrive"),
                "DisableFileSyncNGSC",
                1,
                None,
            )],
        ),
        // ---- Cleanup
        t("edge_debloat", Cleanup, Safe, R::None, NONE, edge_annoyances),
    ];
    v.push(remove_edge);
    v.push(bloat);
    v
}
