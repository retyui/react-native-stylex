import { createContext } from "react";
import { DefaultTheme } from "./DefaultTheme";

export const themeContext = createContext<DefaultTheme | null>(null);

export const {
  Provider: ThemeProvider,
  Consumer: ThemeConsumer,
} = themeContext;
