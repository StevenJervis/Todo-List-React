import { CssBaseline, Box, createTheme, ThemeProvider } from "@mui/material";
import Header from "./Header";
import TodoList from "./TodoList";

function App() {
  const theme = createTheme({
    palette: {
      background: {
        default: "#f9f9f9", // Set default background color to #f9f9f9
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header />
        <TodoList />
      </Box>
    </ThemeProvider>
  );
}

export default App;
