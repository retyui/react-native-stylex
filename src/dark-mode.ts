import {
  eventEmitter,
  initialMode,
  useDarkModeContext
  // @ts-ignore
} from "react-native-dark-mode";

import { addDependency } from "./dependencyRegistry";
import { onUse } from "./dependencyUsage";

type UiType = "dark" | "light";

const DEPENDENCY_KEY = "react-native-dark-mode";

const state = { mode: initialMode };

addDependency(DEPENDENCY_KEY, () => useDarkModeContext());

eventEmitter.on("currentModeChanged", (newMode: string) => {
  state.mode = newMode;
});

export const uiMode = <T extends {}>({
  dark,
  light
}: { [platform in UiType]?: T }): T | undefined => {
  onUse(DEPENDENCY_KEY);

  if (state.mode === "dark") {
    return dark;
  }

  if (state.mode === "light") {
    return light;
  }

  return undefined;
};

export const darkUiMode = <T extends {}>(dark: T): T | undefined =>
  uiMode<T>({ dark });

export const lightUiMode = <T extends {}>(light: T): T | undefined =>
  uiMode<T>({ light });
