import { useMemo } from "react";
import { StyleSheet } from "react-native";

import resolveMediaQueries from "./resolveMediaQueries";
import useDimensions from "./useDimensions";
import useTheme from "./useTheme";

const makeUseStyles = styles => {
  const useStyles = () => {
    const isDynamic = typeof styles === "function";
    const theme = useTheme();
    const { window: windowDimensions } = useDimensions();

    return useMemo(
      () =>
        StyleSheet.create(
          resolveMediaQueries(
            isDynamic ? styles(theme) : styles,
            windowDimensions
          )
        ),
      [
        // do not use theme as dependency when passed styled are not function
        isDynamic ? theme : null, 
        windowDimensions
      ]
    );
  };

  return useStyles;
};

export default makeUseStyles;
