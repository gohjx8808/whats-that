import { createContext } from "react";

export type Mode = "dark" | "light";

interface themeContext {
  mode: Mode;
  setMode: () => void;
}

const initialValue: themeContext = {
  mode: "light",
  setMode: () => {},
};

const ThemeContext = createContext(initialValue);

export default ThemeContext;
