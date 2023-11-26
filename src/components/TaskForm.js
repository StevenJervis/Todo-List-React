import { useState } from "react";
import { ListItem, TextField, InputAdornment, IconButton } from "@mui/material";
import { Send } from "@mui/icons-material";

export default function TaskForm({ addTask }) {
  const [newTask, setNewTask] = useState("");

  const submitHandler = (e) => {
    if (newTask.length > 0) {
      addTask(newTask);
      setNewTask("");
    }
  };

  return (
    <ListItem>
      <form
        style={{ width: "100%" }}
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
      >
        <TextField
          margin="normal"
          id="standard-basic"
          label="Add New Task"
          fullWidth
          variant="filled"
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="submit" edge="end" type="submit">
                  <Send />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </ListItem>
  );
}
