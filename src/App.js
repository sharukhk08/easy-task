import "./App.css";
import AppRoutes from "./AppRoutes";
import { useEffect, useState } from "react";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";

const myTheme = {
  colorScheme: "light",
  primaryColor: "orange",
  defaultRadius: 0,
};

function App() {
  const [colorScheme, setColorScheme] = useState(myTheme);
  const toggleColorScheme = () => {
    console.log(colorScheme.colorScheme);
    //  check if color scheme is light or dark
    if (colorScheme.colorScheme === "light") {
      setColorScheme({
        ...colorScheme,
        colorScheme: "dark",
      });
      setValue("dark");
    }
    if (colorScheme.colorScheme === "dark") {
      setColorScheme({
        ...colorScheme,
        colorScheme: "light",
      });
      setValue("light");
    }
  };
  const [value, setValue] = useLocalStorage({
    key: "color-scheme",
    defaultValue: colorScheme.colorScheme,
  });

  useEffect(() => {
    if (value === "light") {
      setColorScheme({
        ...colorScheme,
        colorScheme: "light",
      });
    }
    if (value === "dark") {
      setColorScheme({
        ...colorScheme,
        colorScheme: "dark",
      });
    }
  }, []);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme.colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={colorScheme}>
        <ModalsProvider>
          <NotificationsProvider>
            <AppRoutes />
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
