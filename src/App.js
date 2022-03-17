import "./App.css";
import AppRoutes from "./AppRoutes";
import { useEffect, useState } from "react";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

const myTheme = {
  colorScheme: "light",
  primaryColor: "orange",
  defaultRadius: 0,
};

function App() {
  // const [colorScheme, setColorScheme] = useLocalStorage({
  //   key: "mantine-color-scheme",
  //   defaultValue: "light",
  // });

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

  // useHotkeys("ctrl+shift+c", toggleColorScheme);
  console.log(colorScheme, "colorScheme");
  console.log(myTheme, "myTheme");
  console.log(value, "value");

  // useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme.colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={colorScheme}>
        <AppRoutes />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;
