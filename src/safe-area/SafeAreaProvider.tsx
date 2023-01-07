import React from "react";
import { SafeAreaProvider as CoreSafeAreaProvider, initialWindowMetrics,initialWindowSafeAreaInsets  } from "react-native-safe-area-context";

import { StylexSaveAreaConsumer } from "./StylexSaveAreaConsumer";
import { SafeAreaViewProps } from "./types";

export function SafeAreaProvider(props: SafeAreaViewProps): JSX.Element | null {
  return (
    <CoreSafeAreaProvider
        initialSafeAreaInsets={props.initialSafeAreaInsets || initialWindowSafeAreaInsets}
        initialMetrics={props.initialMetrics || initialWindowMetrics}
        {...props}>
      {props.children}
      <StylexSaveAreaConsumer />
    </CoreSafeAreaProvider>
  );
}
