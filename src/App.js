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
  const [value, setValue] = useLocalStorage({
    key: "color-scheme",
    defaultValue: colorScheme.colorScheme,
  });

  useEffect(() => {
    if (value === "light") {
      setColorScheme((scheme) => ({ ...scheme, colorScheme: "light" }));
    }
    if (value === "dark") {
      setColorScheme((scheme) => ({ ...scheme, colorScheme: "dark" }));
    }
  }, [value]);

  const toggleColorScheme = () => {
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
