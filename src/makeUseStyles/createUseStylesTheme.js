import { StyleSheet } from "react-native";

import { resetUsing } from "../dependencyUsage";
import { useTheme } from "../useTheme";

import { getDependenciesKeys, subscribe, useForceUpdate } from "./utils";

export function createUseStylesTheme(getStyles) {
  const scope = {
    styles: new WeakMap(),
    forceUpdate: [],
    unsubscribe: () => {},
  };

  function onUpdate() {
    // Clear all styles to recreate them after dependencies update
    scope.styles = new WeakMap();
    scope.forceUpdate.forEach((fn) => fn());
  }

  function initStyle(theme) {
    scope.unsubscribe();
    resetUsing();

    const style = StyleSheet.create(getStyles(theme));
    const keys = getDependenciesKeys();

    scope.unsubscribe = subscribe(keys, onUpdate);

    return style;
  }

  return function useStyles() {
    "use memo";
    const theme = useTheme();

    useForceUpdate(scope);

    if (!scope.styles.has(theme)) {
      scope.styles.set(theme, initStyle(theme));
    }

    return scope.styles.get(theme);
  };
}
