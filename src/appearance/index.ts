import "./init";

import { Appearance } from "react-native";

import { onUse } from "../dependencyUsage";

import { UI_MODE_DEPENDENCY_KEY } from "./consts";

export type ColorSchemeName = "light" | "dark" | "default";

export function appearance<T>({
  dark,
  light,
  default: defaultScheme,
}: { [mode in ColorSchemeName]?: T }): T | undefined {
  onUse(UI_MODE_DEPENDENCY_KEY);

  // Note: getColorScheme() will always return light when debugging with Chrome.
  if (Appearance.getColorScheme() === "light") {
    return light;
  }

  if (Appearance.getColorScheme() === "dark") {
    return dark;
  }

  return defaultScheme;
}

export const darkAppearance = <T>(dark: T): T | undefined =>
  appearance<T>({ dark });

export const lightAppearance = <T>(light: T): T | undefined =>
  appearance<T>({ light });

export const noPreferenceAppearance = <T>(defaultScheme: T): T | undefined =>
  appearance<T>({ default: defaultScheme });
