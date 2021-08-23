import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// props contains {dialogTitle, dialogMesage, openDialog, setOpenDialog, PositiveOnClick}
const TwoWayDialog = (props) => {

  const handleClose = () => {
    props.setOpenDialog(false);
  };

  const handlePositive = () => {
    props.PositiveOnClick();
    props.setOpenDialog(false);
  };


  return (
    <>
      <Dialog
        open={props.openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
              {props.dialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            いいえ
          </Button>
          <Button onClick={handlePositive} color="primary" autoFocus>
            はい
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TwoWayDialog;
