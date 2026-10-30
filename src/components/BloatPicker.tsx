import { Button, Checkbox, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, Spinner } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { type BloatApp, api, errorText } from "../lib/api";
import { useApp } from "../state";

// Store package names → the names people know. Product names, so not translated.
const NAMES: Record<string, string> = {
  "Clipchamp.Clipchamp": "Clipchamp",
  "Microsoft.BingNews": "Microsoft News",
  "Microsoft.BingWeather": "Weather",
  "Microsoft.BingFinance": "Money",
  "Microsoft.BingSports": "Sports",
  "Microsoft.GetHelp": "Get Help",
  "Microsoft.Getstarted": "Tips",
  "Microsoft.Microsoft3DViewer": "3D Viewer",
  "Microsoft.MicrosoftOfficeHub": "Microsoft 365 (Office)",
  "Microsoft.MicrosoftSolitaireCollection": "Solitaire Collection",
  "Microsoft.MixedReality.Portal": "Mixed Reality Portal",
  "Microsoft.People": "People",
  "Microsoft.PowerAutomateDesktop": "Power Automate",
  "Microsoft.SkypeApp": "Skype",
  "Microsoft.Todos": "Microsoft To Do",
  "Microsoft.WindowsFeedbackHub": "Feedback Hub",
  "Microsoft.YourPhone": "Phone Link",
  "Microsoft.ZuneMusic": "Media Player",
  "Microsoft.ZuneVideo": "Movies & TV",
  "MicrosoftCorporationII.MicrosoftFamily": "Microsoft Family Safety",
  MicrosoftTeams: "Microsoft Teams",
  "king.com.CandyCrushSaga": "Candy Crush Saga",
  "king.com.CandyCrushSodaSaga": "Candy Crush Soda Saga",
  "SpotifyAB.SpotifyMusic": "Spotify",
  "Disney.37853FC22B2CE": "Disney+",
  "BytedancePte.Ltd.TikTok": "TikTok",
  "Facebook.Facebook": "Facebook",
};

/** Lists the removable apps that are installed and removes only the ones the person ticks. */
export function BloatPicker({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useTranslation();
  const { reloadTweaks, toast } = useApp();
  const [apps, setApps] = useState<BloatApp[] | null>(null);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [ticked, setTicked] = useState(false);
  const [working, setWorking] = useState(false);

  useEffect(() => {
    if (!open) return;
    setApps(null);
    setTicked(false);
    api.listBloatApps().then(
      (l) => {
        setApps(l);
        setPicked(new Set(l.filter((a) => a.suggested).map((a) => a.name)));
      },
      (e) => {
        toast(errorText(e), "error");
        onClose();
      },
    );
  }, [open]);

  const flip = (name: string, on: boolean) =>
    setPicked((p) => {
      const n = new Set(p);
      if (on) n.add(name);
      else n.delete(name);
      return n;
    });

  const remove = async () => {
    setWorking(true);
    try {
      await api.removeBloatApps([...picked]);
      onClose();
    } catch (e) {
      toast(`${t("tweaks.bloat_apps.name")}: ${errorText(e)}`, "error");
    } finally {
      setWorking(false);
      await reloadTweaks();
    }
  };

  const label = (n: string) => NAMES[n] ?? n;
  const sorted = apps ? [...apps].sort((a, b) => Number(b.suggested) - Number(a.suggested) || label(a.name).localeCompare(label(b.name))) : [];

  return (
    <Dialog open={open} onOpenChange={(_, d) => !d.open && !working && onClose()}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{t("tweaks.bloat_apps.name")}</DialogTitle>
          <DialogContent>
            {!apps && <Spinner size="small" />}
            {apps && apps.length === 0 && <p>{t("bloat.none")}</p>}
            {apps && apps.length > 0 && (
              <>
                <p>{t("bloat.pick")}</p>
                <div style={{ display: "flex", flexDirection: "column", maxHeight: 280, overflowY: "auto", margin: "8px 0" }}>
                  {sorted.map((a) => (
                    <Checkbox key={a.name} checked={picked.has(a.name)} onChange={(_, d) => flip(a.name, !!d.checked)}
                      label={a.suggested ? label(a.name) : `${label(a.name)} · ${t("bloat.mayUse")}`} />
                  ))}
                </div>
                <p><b>{t("optimize.confirm.irreversible")}</b></p>
                <Checkbox checked={ticked} onChange={(_, d) => setTicked(!!d.checked)} label={t("optimize.acknowledge")} />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" disabled={working} onClick={onClose}>{t("common.cancel")}</Button>
            {apps && apps.length > 0 && (
              <Button appearance="primary" disabled={!ticked || picked.size === 0 || working} icon={working ? <Spinner size="tiny" /> : undefined} onClick={() => void remove()}>
                {t("bloat.remove", { count: picked.size })}
              </Button>
            )}
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
