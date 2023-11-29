import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import {
  Box,
  Toolbar,
  Typography,
  Divider,
  List,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskForm from "./TaskForm";
import TasklItem from "./TaskItem";

const initialTasks = () => {
  const data = JSON.parse(localStorage.getItem("tasks"));
  if (!data) return [];
  return data;
};

export default function TaskList({ allList, updateListTitle, removeList }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [updateList, setUpdateList] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    if (allList?.title) {
      setUpdateList(allList?.title);
    }
  }, [allList?.title]);

  const removeAllListTasks = (listId) => {
    setTasks((prevTask) => {
      return prevTask.filter((t) => t.listId !== listId);
    });
  };

  const addTask = (task) => {
    setTasks((prevTask) => {
      return [
        ...prevTask,
        {
          name: task,
          id: uuid(),
          completed: false,
          listId: allList?.id,
        },
      ];
    });
  };

  const updateTask = (id, newName) => {
    setTasks((prevTask) => {
      return prevTask.map((task) => {
        if (task.id === id) {
          return { ...task, name: newName };
        } else {
          return task;
        }
      });
    });
  };

  const removeTask = (id) => {
    setTasks((prevTask) => {
      return prevTask.filter((t) => t.id !== id);
    });
  };

  const toggleTask = (id) => {
    setTasks((prevTask) => {
      return prevTask.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const filteredTasks = tasks.filter((t) => t.listId === allList?.id);

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Box sx={{ flex: 1 }}>
        {allList?.id ? (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <TextField
                value={updateList}
                variant="outlined"
                inputProps={{
                  style: {
                    color: "#7076FE",
                    fontSize: "24px",
                    fontWeight: "bold",
                  },
                }}
                onChange={(e) => {
                  setUpdateList(e.target.value);
                }}
                onBlur={(e) => {
                  e.preventDefault();
                  updateListTitle(allList?.id, updateList);
                }}
              />
              <IconButton
                edge="end"
                aria-label="delete"
                style={{ marginRight: 1 }}
                onClick={handleOpenDialog}
              >
                <DeleteIcon />
              </IconButton>
              <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>{"Confirm Deletion"}</DialogTitle>
                <form
                  onSubmit={() => {
                    removeList(allList?.id);
                    removeAllListTasks(allList?.id);
                    handleCloseDialog();
                  }}
                >
                  <DialogContent>
                    <DialogContentText>
                      Are you sure you want to delete this list?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button type="submit">Delete</Button>
                  </DialogActions>
                </form>
              </Dialog>
            </Box>
            <Divider />
            <List
              sx={{
                width: "100%",
                mx: "auto",
                mt: 2,
              }}
              disablePadding
            >
              <TaskForm addTask={addTask} />
              {filteredTasks.map((task) => {
                return (
                  <TasklItem
                    task={task}
                    key={task.id}
                    update={updateTask}
                    remove={() => removeTask(task.id)}
                    toggle={() => toggleTask(task.id)}
                  />
                );
              })}
            </List>
          </>
        ) : (
          <Typography variant="h4" style={{ color: "#7076FE" }} gutterBottom>
            No List Selected
          </Typography>
        )}
      </Box>
    </Box>
  );
}
