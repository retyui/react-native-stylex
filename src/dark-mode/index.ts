import "./init";

import { onUse } from "../dependencyUsage";

import { UI_MODE_DEPENDENCY_KEY } from "./consts";
import { state } from "./state";

export type UiType = "dark" | "light";

export function uiMode<T>({
  dark,
  light,
}: { [mode in UiType]?: T }): T | undefined {
  onUse(UI_MODE_DEPENDENCY_KEY);

  if (state.mode === "dark") {
    return dark;
  }

  if (state.mode === "light") {
    return light;
  }

  return undefined;
}

export const darkUiMode = <T>(dark: T): T | undefined => uiMode<T>({ dark });

export const lightUiMode = <T>(light: T): T | undefined => uiMode<T>({ light });
