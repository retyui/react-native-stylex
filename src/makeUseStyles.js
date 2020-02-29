import { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet } from "react-native";

import { getUsing, resetUsing } from "./dependencyUsage";
import { getDependency } from "./dependencyRegistry";
import { optimizeDependencies } from "./dimensions";
import { useTheme } from "./useTheme";

export const getDependenciesKeys = () =>
  Object.keys(optimizeDependencies(getUsing())).sort();

export const noop = () => {};

export const subscribe = (dependenciesKeys, handler) => {
  if (dependenciesKeys.length === 0) {
    return noop;
  }

  const unsubscribeFns = dependenciesKeys
    .map(getDependency)
    .filter(
      process.env.NODE_ENV !== "production"
        ? (onChange, index) => {
            const dependencyName = dependenciesKeys[index];

            if (!onChange) {
              console.warn(
                `[react-native-stylex] Could not find onChange handler for ${dependencyName}!`
              );
            }

            return !!onChange;
          }
        : Boolean
    )
    .map(onChange => onChange(handler));

  return () => {
    unsubscribeFns.forEach(unsubscribe => unsubscribe());
  };
};

export const makeUseStyles = getStyles => {
  const hasThemeDependency = getStyles.length === 0;
  const useStyles = () => {
    const theme = useTheme();
    const unsubscribeRef = useRef(noop);
    const [forceUpdateFlag, forceUpdate] = useState(false);

    useEffect(() => unsubscribeRef.current, []);

    return useMemo(() => {
      unsubscribeRef.current();
      resetUsing();

      const styles = StyleSheet.create(getStyles(theme));
      const keys = getDependenciesKeys();
      const handler = () => forceUpdate(flag => !flag);

      unsubscribeRef.current = subscribe(keys, handler);

      return styles;
    }, [
      // Don't use `theme` as dependency when passed styled are not function
      hasThemeDependency ? theme : null,
      forceUpdateFlag
    ]);
  };

  return useStyles;
};
