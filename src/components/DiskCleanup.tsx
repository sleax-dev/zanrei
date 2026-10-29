import { Button, Checkbox } from "@fluentui/react-components";
import { ArrowClockwise20Regular, Delete20Regular } from "@fluentui/react-icons";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { api, type CleanupItem, errorText } from "../lib/api";
import { fmtBytes } from "../lib/format";
import { useApp } from "../state";
import { Confirm } from "./Confirm";
import { SkeletonRows } from "./Skeleton";

/** Measure first, then delete what the user ticks. Deleting is for good, so it asks. */
export function DiskCleanup() {
  const { t } = useTranslation();
  const { toast } = useApp();
  const [items, setItems] = useState<CleanupItem[] | null>(null);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [running, setRunning] = useState(false);
  const [ask, setAsk] = useState(false);

  const scan = useCallback(async () => {
    setItems(null);
    try {
      const found = await api.scanCleanup();
      setItems(found);
      // Everything starts ticked except the Recycle Bin: people keep things in it on purpose.
      setPicked(new Set(found.filter((i) => i.id !== "recycle_bin").map((i) => i.id)));
    } catch (e) {
      toast(errorText(e), "error");
      setItems([]);
    }
  }, [toast]);
  useEffect(() => void scan(), [scan]);

  const total = (items ?? []).filter((i) => picked.has(i.id)).reduce((n, i) => n + i.bytes, 0);

  const run = async () => {
    setRunning(true);
    try {
      const freed = await api.runCleanup([...picked]);
      toast(t("disk.done", { size: fmtBytes(freed) }), "success");
    } catch (e) {
      toast(errorText(e), "error");
    } finally {
      setRunning(false);
      await scan();
    }
  };

  return (
    <section className="stack">
      <div className="sect-head">
        <h2>{t("disk.title")}</h2>
        <div className="btn-row">
          <Button size="small" appearance="subtle" icon={<ArrowClockwise20Regular />} disabled={items === null || running} onClick={() => void scan()}>{t("disk.measure")}</Button>
          <Button size="small" appearance="primary" icon={<Delete20Regular />} disabled={running || total === 0} onClick={() => setAsk(true)}>
            {total > 0 ? `${t("disk.run")} · ${fmtBytes(total)}` : t("disk.run")}
          </Button>
        </div>
      </div>
      <p className="muted small" style={{ margin: 0 }}>{t("disk.desc")}</p>
      {items === null && <SkeletonRows count={4} status={t("common.loading")} />}
      {items?.length === 0 && <p className="muted">{t("disk.nothing")}</p>}
      {items && items.length > 0 && (
        <div className="rows">
          {items.map((i) => (
            <div className="row" key={i.id}>
              <div className="info">
                <div className="name">{t(`disk.item.${i.id}.name`)}</div>
                <div className="desc">{t(`disk.item.${i.id}.desc`)}</div>
              </div>
              <div className="ctl">
                <span className="size">{fmtBytes(i.bytes)}</span>
                <Checkbox
                  checked={picked.has(i.id)}
                  disabled={running}
                  aria-label={t(`disk.item.${i.id}.name`)}
                  onChange={(_, d) =>
                    setPicked((p) => {
                      const n = new Set(p);
                      if (d.checked) n.add(i.id);
                      else n.delete(i.id);
                      return n;
                    })
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <Confirm open={ask} title={t("disk.confirmTitle")} confirmLabel={t("common.delete")} onClose={() => setAsk(false)} onConfirm={() => void run()}>
        <p>{t("disk.confirmBody")}</p>
        <ul className="note-list plain">
          {(items ?? []).filter((i) => picked.has(i.id)).map((i) => <li key={i.id}>{t(`disk.item.${i.id}.name`)} · {fmtBytes(i.bytes)}</li>)}
        </ul>
      </Confirm>
    </section>
  );
}

