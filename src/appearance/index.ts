import "./init";

// @ts-ignore
import { Appearance } from "react-native-appearance";

import { onUse } from "../dependencyUsage";

import { UI_MODE_DEPENDENCY_KEY } from "./consts";

export type ColorSchemeName = "light" | "dark";

export const appearance = <T>({
  dark,
  light
}: { [mode in ColorSchemeName]?: T }): T | undefined => {
  onUse(UI_MODE_DEPENDENCY_KEY);

  if (Appearance.getColorScheme() === "dark") {
    return dark;
  }

  return light;
};

export const darkAppearance = <T>(dark: T): T | undefined =>
  appearance<T>({ dark });

export const lightAppearance = <T>(light: T): T | undefined =>
  appearance<T>({ light });
