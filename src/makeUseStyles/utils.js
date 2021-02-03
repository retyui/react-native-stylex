import { optimizeDependencies } from "../dimensions/utils";
import { getUsing } from "../dependencyUsage";
import { getDependency } from "../dependencyRegistry";

import { useEffect, useRef, useState } from "react";

/* istanbul ignore next */
const noop = () => {};

export const useForceUpdate = (scope) => {
  const unsubscribeRef = useRef(noop);
  const setState = useState(false)[1];

  if (unsubscribeRef.current === noop) {
    const forceRerender = () => setState((flag) => !flag);

    scope.forceUpdate = scope.forceUpdate.concat(forceRerender);

    unsubscribeRef.current = () => {
      scope.forceUpdate = scope.forceUpdate.filter(
        (fn) => fn !== forceRerender
      );
    };
  }

  useEffect(
    () => () => {
      unsubscribeRef.current();
      unsubscribeRef.current = noop;
    },
    []
  );
};

export const getDependenciesKeys = () =>
  Object.keys(optimizeDependencies(getUsing())).sort();

export const subscribe = (dependenciesKeys, handler) => {
  if (dependenciesKeys.length === 0) {
    /* istanbul ignore next */
    return () => {};
  }

  const unsubscribeFns = dependenciesKeys
    .map(getDependency)
    .filter(
      /* istanbul ignore next */
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
    .map((onChange) => onChange(handler));

  return () => {
    unsubscribeFns.forEach((unsubscribe) => unsubscribe());
  };
};
