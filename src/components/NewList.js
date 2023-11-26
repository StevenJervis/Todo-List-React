import { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

export default function NewList({ addList }) {
  const [list, setList] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createHandler = (e) => {
    if (list.length > 0) {
      addList(list);
      handleClose();
    }
  };

  return (
    <>
      <Button
        variant="standard"
        onClick={() => {
          setList("");
          handleClickOpen();
        }}
        style={{
          color: "#b8cdf8",
          fontSize: "medium",
          fontWeight: "bold",
        }}
      >
        <AddIcon fontSize="medium" />
        ADD LIST
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ textAlign: "center" }}>
          Create New List
        </DialogTitle>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createHandler();
          }}
        >
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="New List"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setList(e.target.value);
              }}
              value={list}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
