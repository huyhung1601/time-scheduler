import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import React from "react";

interface IProps {
  open: boolean;
  className: string;
  children: React.ReactNode;
  onClose: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export const CustomDialog = (props: IProps) => {
  const { open, className, children, onClose, onSave, onCancel } = props;
  return (
    <Dialog className={className} open={open} onClose={onClose}>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onCancel}>
          Cancel
        </Button>
        <Button color="primary" onClick={onSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
