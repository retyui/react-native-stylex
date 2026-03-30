import { createUseStylesTheme } from "./createUseStylesTheme";
import { createUseStylesWithoutTheme } from "./createUseStylesWithoutTheme";

export function makeUseStyles(getStyles) {
  const hasThemeDependency = getStyles.length === 1;

  if (!hasThemeDependency) {
    return createUseStylesWithoutTheme(getStyles);
  }

  return createUseStylesTheme(getStyles);
}
