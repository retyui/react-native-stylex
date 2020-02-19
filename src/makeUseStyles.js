import { useMemo } from "react";
import { StyleSheet } from "react-native";

import useDimensions from "./useDimensions";
import { useTheme } from "./useTheme";

export const makeUseStyles = getStyles => {
  const hasThemeDependency = getStyles.length === 0;
  const useStyles = () => {
    const theme = useTheme();

    return useMemo(() => StyleSheet.create(getStyles(theme)), [
      // `windowDimensions` need to media query helpers (orientation, maxHeight. ...) update styles
      useDimensions().window,
      // Don't use `theme` as dependency when passed styled are not function
      hasThemeDependency ? theme : null
    ]);
  };

  return useStyles;
};
