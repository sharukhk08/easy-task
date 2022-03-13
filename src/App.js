import "./App.css";
import { MantineProvider } from "@mantine/core";
import Login from "./views/Login";

const myTheme = {
  colorScheme: "light",
  primaryColor: "orange",
  defaultRadius: 0,
};

function App() {
  return (
    <MantineProvider theme={myTheme}>
      <Login />
    </MantineProvider>
  );
}

export default App;
