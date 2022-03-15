import "./App.css";
import { MantineProvider } from "@mantine/core";
import AppRoutes from "./AppRoutes";

const myTheme = {
  colorScheme: "light",
  primaryColor: "orange",
  defaultRadius: 0,
};

function App() {
  return (
    <MantineProvider theme={myTheme}>
      <AppRoutes />
    </MantineProvider>
  );
}

export default App;
