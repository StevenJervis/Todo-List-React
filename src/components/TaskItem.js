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
  ListItemSecondaryAction,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

export default function TasklItem({ task, remove, toggle, update }) {
  const [updateTask, setUpdateTask] = useState(task?.name);
  const [isEditing, setIsEditing] = useState(false);

  const labelId = `checkbox-list-label-${task.id}`;

  const updateTaskHandler = () => {
    update(task.id, updateTask);
  };

  const editHandler = () => {
    setIsEditing(!isEditing);
  };

  return (
    <ListItem disablePadding>
      <ListItemButton role={undefined} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={task.completed && !isEditing}
            tabIndex={-1}
            disableRipple
            inputProps={{ "aria-labelledby": labelId }}
            onChange={toggle}
            disabled={isEditing}
          />
        </ListItemIcon>
        <ListItemText id={labelId}>
          {isEditing ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateTaskHandler();
              }}
            >
              <TextField
                value={updateTask}
                style={{
                  textDecoration:
                    task.completed && !isEditing ? "line-through" : "none",
                  color: "#4d4d4d",
                }}
                variant="standard"
                onChange={(e) => {
                  setUpdateTask(e.target.value);
                }}
                onBlur={editHandler}
              />
            </form>
          ) : (
            <>
              <Typography
                variant="h7"
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  color: "#4d4d4d",
                  fontSize: "16px",
                }}
              >
                {task.name}
              </Typography>
            </>
          )}
        </ListItemText>
        <ListItemSecondaryAction>
          {!task.completed && !isEditing ? (
            <Tooltip title={"Edit"}>
              <IconButton edge="end" aria-label="edit" onClick={editHandler}>
                <DriveFileRenameOutlineIcon />
              </IconButton>
            </Tooltip>
          ) : (
            []
          )}
          <Tooltip title={"Delete"}>
            <IconButton edge="end" aria-label="delete" onClick={remove}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItemButton>
    </ListItem>
  );
}
