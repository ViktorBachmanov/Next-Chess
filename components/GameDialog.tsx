import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
    isDialogOpen: boolean
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    title: string
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

  return (
    <div>
   
      <Dialog open={props.isDialogOpen} onClose={handleClose}>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
