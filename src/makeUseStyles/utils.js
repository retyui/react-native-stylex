import { useEffect, useRef, useState } from "react";

import { getDependency } from "../dependencyRegistry";
import { getUsing } from "../dependencyUsage";
import { optimizeDependencies } from "../dimensions/utils";

/* istanbul ignore next */
const noop = () => {};

export const useForceUpdate = (scope) => {
  "use no memo";
  const unsubscribeRef = useRef(noop);
  const setState = useState(0)[1];

  if (unsubscribeRef.current === noop) {
    const forceRerender = () => setState((val) => val + 1);

    // eslint-disable-next-line react-hooks/immutability
    scope.forceUpdate = scope.forceUpdate.concat(forceRerender);

    unsubscribeRef.current = () => {
      // eslint-disable-next-line react-hooks/immutability
      scope.forceUpdate = scope.forceUpdate.filter(
        (fn) => fn !== forceRerender,
      );
    };
  }

  useEffect(
    () => () => {
      unsubscribeRef.current();
      unsubscribeRef.current = noop;
    },
    [],
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
                `[react-native-stylex] Could not find onChange handler for ${dependencyName}!`,
              );
            }

            return !!onChange;
          }
        : Boolean,
    )
    .map((onChange) => onChange(handler));

  return () => {
    unsubscribeFns.forEach((unsubscribe) => unsubscribe());
  };
};
