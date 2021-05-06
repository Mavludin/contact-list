import React from "react";
import styles from "./AlertDialog.module.css";

import { useDispatch, useSelector } from "react-redux";
import { deleteData } from "../../../../store/actions";
import { selectContactList } from "../../../../store/reducer";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export const AlertDialog = ({ setDialogShow, dialogShow, selectedItemPos }) => {
  const contactList = useSelector(selectContactList);
  const dispatch = useDispatch();

  const completeDeleteing = () => {
    dispatch(deleteData(contactList[selectedItemPos]));
    setDialogShow(false);
  };

  return (
    <Dialog
      className={styles.dialog}
      open={dialogShow}
      keepMounted
      onClose={() => setDialogShow(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{`Удалить контакт: ${contactList[selectedItemPos].name}?`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Если вы удалите данный контакт, то его уже не вернуть!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogShow(false)} color="primary">
          Нет
        </Button>
        <Button onClick={completeDeleteing} color="primary">
          Да
        </Button>
      </DialogActions>
    </Dialog>
  );
};
