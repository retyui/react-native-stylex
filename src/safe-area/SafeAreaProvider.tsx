import type { FC } from "react";
import {
  initialWindowMetrics,
  SafeAreaProvider as CoreSafeAreaProvider,
} from "react-native-safe-area-context";

import { StylexSaveAreaConsumer } from "./StylexSaveAreaConsumer";
import type { SafeAreaViewProps } from "./types";

export const SafeAreaProvider: FC<SafeAreaViewProps> = (props) => {
  return (
    <CoreSafeAreaProvider
      initialMetrics={props.initialMetrics || initialWindowMetrics}
      {...props}
    >
      {props.children}
      <StylexSaveAreaConsumer />
    </CoreSafeAreaProvider>
  );
};

SafeAreaProvider.displayName = "StylexSafeAreaProvider";
