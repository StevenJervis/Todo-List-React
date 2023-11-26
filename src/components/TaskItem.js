import { useState } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  Typography,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

export default function TasklItem({ task, remove, toggle, update }) {
  const [newTask, setNewTask] = useState("");

  const labelId = `checkbox-list-label-${task.id}`;

  const taskUpdate = (e) => {
    update(task.id, "test");
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="comments" onClick={remove}>
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton role={undefined} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={task.completed}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
            onChange={toggle}
          />
        </ListItemIcon>
        <ListItemText id={labelId}>
          {/* <Typography
            variant="h7"
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              color: "#4d4d4d",
            }}
          >
            {task.name}
          </Typography>
          <IconButton edge="end" aria-label="comments" onClick={taskUpdate}>
            <DriveFileRenameOutlineIcon />
          </IconButton> */}
          <TextField
            value={task.name}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              color: "#4d4d4d",
              width: "100%",
            }}
            variant="standard"
            // onChange={(event) => {
            //   setOriginalListName(event.target.value);
            // }}
            // onBlur={(event) => {
            //   void updateList(data.id, event.target.value);
            // }}
          />
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
}
