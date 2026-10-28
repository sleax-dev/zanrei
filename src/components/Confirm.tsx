import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle } from "@fluentui/react-components";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

export function Confirm(props: {
  open: boolean;
  title: string;
  children: ReactNode;
  confirmLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  return (
    <Dialog open={props.open} onOpenChange={(_, d) => !d.open && props.onClose()}>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogContent>{props.children}</DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={props.onClose}>{t("common.cancel")}</Button>
            <Button
              appearance="primary"
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
