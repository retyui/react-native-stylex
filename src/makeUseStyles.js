import { useMemo } from "react";
import { StyleSheet } from "react-native";

import resolveMediaQueries from "./resolveMediaQueries";
import useDimensions from "./useDimensions";
import useTheme from "./useTheme";

const makeUseStyles = styles => {
  const useStyles = () => {
    const { window: windowDimensions } = useDimensions();
    const theme = useTheme();

    return useMemo(
      () =>
        StyleSheet.create(
          resolveMediaQueries(
            typeof styles === "function" ? styles(theme) : styles,

            windowDimensions
          )
        ),
      [theme, windowDimensions]
    );
  };

  return useStyles;
};

export default makeUseStyles;
