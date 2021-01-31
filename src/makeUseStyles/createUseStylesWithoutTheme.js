import { StyleSheet } from "react-native";
import { resetUsing } from "../dependencyUsage";
import { getDependenciesKeys, subscribe, useForceUpdate } from "./utils";

export function createUseStylesWithoutTheme(getStyles) {
  const scope = {
    style: null,
    forceUpdate: [],
    unsubscribe: () => {},
  };

  function onUpdate() {
    // Recreate style after dependencies update
    initStyle();
    scope.forceUpdate.forEach((fn) => fn());
  }

  function initStyle() {
    scope.unsubscribe();
    resetUsing();

    scope.style = StyleSheet.create(getStyles());

    const keys = getDependenciesKeys();

    scope.unsubscribe = subscribe(keys, onUpdate);
  }

  initStyle();

  function useStyles() {
    useForceUpdate(scope);

    return scope.style;
  }

  return useStyles;
}
