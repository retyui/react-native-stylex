import { createUseStylesWithoutTheme } from "./createUseStylesWithoutTheme";
import { createUseStylesTheme } from "./createUseStylesTheme";

export function makeUseStyles(getStyles) {
  const hasThemeDependency = getStyles.length === 1;

  if (!hasThemeDependency) {
    return createUseStylesWithoutTheme(getStyles);
  }

  return createUseStylesTheme(getStyles);
}
