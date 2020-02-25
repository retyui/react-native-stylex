import {
  eventEmitter,
  initialMode,
  useDarkModeContext
} from "react-native-dark-mode";

import { addDependency } from "./dependencyRegistry";

const state = { mode: initialMode };

eventEmitter.on("currentModeChanged", (newMode: string) => {
  state.mode = newMode;
});

const DEPENDENCY_KEY = "react-native-dark-mode";

addDependency(DEPENDENCY_KEY, () => useDarkModeContext());

type InterfaceStyle<T> =
  | {
      dark: T;
      light: T;
    }
  | {
      dark: T;
      light: undefined;
    }
  | {
      dark: undefined;
      light: T;
    };

export const uiMode = <T extends {}>({
  dark,
  light
}: InterfaceStyle<T>): T | undefined => {
  if (state.mode === "dark") {
    return dark;
  }

  if (state.mode === "light") {
    return light;
  }

  return undefined;
};
