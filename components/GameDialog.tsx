import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import GameCreateForm from "./GameCreateForm";
import GameDeleteForm from "./GameDeleteForm";
import LoginForm from "./LoginForm";

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
  const formId = "dialogForm";
  let formEl;
  switch (props.title) {
    case "Новая партия":
      formEl = <GameCreateForm formId={formId} handleClose={handleClose} />;
      break;
    case "Последняя партия":
      formEl = <GameDeleteForm formId={formId} handleClose={handleClose} />;
      break;
    case "Аутентификация":
      formEl = <LoginForm formId={formId} handleClose={handleClose} />;
      break;
  }

  return (
    <div>
      <Dialog open={props.isDialogOpen}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>{formEl}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button type="submit" form={formId}>
            {props.submitButtonLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
