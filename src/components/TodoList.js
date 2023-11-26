import { useState, useEffect } from "react";
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import NewList from "./NewList";
import TaskList from "./TaskList";

const initialTodos = () => {
  const data = JSON.parse(localStorage.getItem("lists"));
  if (!data) return [];
  return data;
};

export default function TodoList() {
  const [lists, setLists] = useState(initialTodos);
  const [currentList, setCurrentList] = useState({});

  const addList = (list) => {
    setLists((prevList) => {
      return [
        ...prevList,
        {
          title: list,
          id: crypto.randomUUID(),
        },
      ];
    });
  };

  const theme = useTheme();
  const screenSize = useMediaQuery(theme.breakpoints.down("md"));
  const drawerWidth = screenSize ? 0.3 : 0.25;

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#4b556b",
            color: "#f9f9f9",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <NewList addList={addList} />
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            ml: 1,
          }}
        >
          {lists.map((list) => {
            return (
              <ListItem key={list.id} disablePadding>
                <ListItemButton
                  onClick={() => {
                    setCurrentList(list);
                  }}
                  selected={currentList === list.id}
                >
                  <ListItemText id={list.id} sx={{ ml: 0.5 }}>
                    <Typography
                      variant="body2"
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      {list.title}
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      {currentList && <TaskList allList={currentList} />}
    </>
  );
}
