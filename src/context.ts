import { createContext } from "react";

export const themeContext = createContext({});

export const {
  Provider: ThemeProvider,
  Consumer: ThemeConsumer,
} = themeContext;
