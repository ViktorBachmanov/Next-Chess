import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import GameCreateForm from "./GameCreateForm";
import GameDeleteForm from "./GameDeleteForm";

interface Props {
  isDialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  submitButtonLabel: string;
}

export default function GameDialog(props: Props) {
  //const [open, setOpen] = React.useState(false);
  /*
  const handleClickOpen = () => {
    props.setDialogOpen(true);
  };*/

  const handleClose = () => {
    props.setDialogOpen(false);
  };

  //const formId = props.title === "Новая партия" ? "createForm" : "deleteForm";
  const formId = "gameForm";
  const formEl =
    props.title === "Новая партия" ? (
      <GameCreateForm formId={formId} />
    ) : (
      <GameDeleteForm formId={formId} />
    );

  return (
    <div>
      <Dialog open={props.isDialogOpen}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>{formEl}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleClose} type="submit" form={formId}>
            {props.submitButtonLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
