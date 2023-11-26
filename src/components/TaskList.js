import { useState, useEffect } from "react";
import { Box, Toolbar, Typography, Divider, List } from "@mui/material";
import TaskForm from "./TaskForm";
import TasklItem from "./TaskItem";

const initialTasks = () => {
  const data = JSON.parse(localStorage.getItem("tasks"));
  if (!data) return [];
  return data;
};

export default function TaskList({ allList }) {
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (task) => {
    setTasks((prevTask) => {
      return [
        ...prevTask,
        {
          name: task,
          id: crypto.randomUUID(),
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
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography
                variant="h4"
                style={{ color: "#7076FE" }}
                gutterBottom
              >
                {allList?.title}
              </Typography>
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
