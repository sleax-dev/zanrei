import { Button, Checkbox, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle } from "@fluentui/react-components";
import { type ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function Confirm(props: {
  open: boolean;
  title: string;
  children: ReactNode;
  confirmLabel?: string;
  /** Set for changes that cannot be undone: the confirm button stays off until the user ticks the acknowledgement. */
  acknowledge?: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const [ticked, setTicked] = useState(false);
  useEffect(() => {
    if (!props.open) setTicked(false);
  }, [props.open]);
  return (
    <Dialog open={props.open} onOpenChange={(_, d) => !d.open && props.onClose()}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogContent>
            {props.children}
            {props.acknowledge && <Checkbox style={{ marginTop: 12 }} checked={ticked} onChange={(_, d) => setTicked(!!d.checked)} label={props.acknowledge} />}
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={props.onClose}>{t("common.cancel")}</Button>
            <Button
              appearance="primary"
              disabled={!!props.acknowledge && !ticked}
              onClick={() => {
                props.onClose();
                props.onConfirm();
              }}
            >
              {props.confirmLabel ?? t("common.confirm")}
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}
