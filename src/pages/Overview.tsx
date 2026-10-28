import { Button, ProgressBar, Spinner } from "@fluentui/react-components";
import { Rocket24Regular } from "@fluentui/react-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Confirm } from "../components/Confirm";
import { HardwareTiles } from "../components/Hardware";
import type { Page } from "../components/Shell";
import { CATEGORIES, type Category } from "../lib/api";
import { useApp } from "../state";

export function Overview({ onOpen }: { onOpen: (p: Page, c?: Category | "all") => void }) {
  const { t } = useTranslation();
  const { system, tweaks, settings, applyRecommended, applying, boost } = useApp();
  const [ask, setAsk] = useState(false);

  const todo = (tweaks ?? []).filter(
    (x) => x.recommended && x.risk !== "Advanced" && x.state !== "Applied" && x.state !== "Unavailable" && !settings.user_disabled.includes(x.id),
  );

  return (
    <div className="page">
      <div className="hero">
        <div>
          <h1>{tweaks === null ? t("overview.heroLoading") : todo.length ? t("overview.heroTodo", { count: todo.length }) : t("overview.heroDone")}</h1>
          <p>{todo.length ? t("overview.heroTodoDesc") : t("overview.heroDoneDesc")}</p>
        </div>
        <div className="actions">
          {todo.length > 0 && (
            <Button appearance="primary" size="large" icon={applying ? <Spinner size="tiny" /> : <Rocket24Regular />} disabled={applying} onClick={() => setAsk(true)}>
              {t("overview.apply")}
            </Button>
          )}
          <Button size="large" onClick={() => onOpen("optimize")}>{t("overview.review")}</Button>
        </div>
      </div>

      {system && <HardwareTiles info={system} />}

      <div>
        <div className="page-head"><h2 style={{ margin: 0, fontSize: 16 }}>{t("overview.categories")}</h2></div>
        <div className="cols" style={{ marginTop: 10 }}>
          {CATEGORIES.map((c) => {
            const list = (tweaks ?? []).filter((x) => x.category === c && x.state !== "Unavailable");
            const done = list.filter((x) => x.state === "Applied").length;
            return (
              <div key={c} className="card interactive" role="button" tabIndex={0} onClick={() => onOpen("optimize", c)} onKeyDown={(e) => e.key === "Enter" && onOpen("optimize", c)}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <b>{t(`optimize.category.${c}`)}</b>
                  <span className="pill">{done} / {list.length}</span>
                </div>
                <ProgressBar value={list.length ? done / list.length : 0} thickness="medium" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="card interactive" role="button" tabIndex={0} onClick={() => onOpen("games")} onKeyDown={(e) => e.key === "Enter" && onOpen("games")}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div>
            <b>{t("games.boostTitle")}</b>
            <div className="selectable" style={{ color: "var(--muted)", fontSize: 13, marginTop: 2 }}>
              {boost.active ? t("games.boostActive", { game: boost.game ?? "" }) : settings.game_boost ? t("games.boostWaiting") : t("games.boostOff")}
            </div>
          </div>
          <span className={`pill ${boost.active ? "accent" : ""}`}>{boost.active ? t("games.on") : settings.game_boost ? t("games.armed") : t("games.off")}</span>
        </div>
      </div>

      <Confirm open={ask} title={t("overview.confirmTitle", { count: todo.length })} confirmLabel={t("overview.apply")} onClose={() => setAsk(false)} onConfirm={() => void applyRecommended(true)}>
        <p>{t("overview.confirmBody")}</p>
        <ul style={{ margin: 0, paddingInlineStart: 20 }}>
          {todo.map((x) => <li key={x.id}>{t(`tweaks.${x.id}.name`)}</li>)}
        </ul>
      </Confirm>
    </div>
  );
}
