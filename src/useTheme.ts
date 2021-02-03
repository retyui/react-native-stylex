import { useContext } from "react";

import { themeContext } from "./context";
import type { DefaultTheme } from "./DefaultTheme";

export const useTheme = <Theme = DefaultTheme>(): Theme => {
  const contextValue = useContext(themeContext);

  if (!contextValue) {
    throw new Error(
      "[react-native-stylex]: Please make sure that you wrapped your component with <ThemeProvider/>."
    );
  }

  return contextValue as Theme;
};
