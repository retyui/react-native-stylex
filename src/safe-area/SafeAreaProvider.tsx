import * as React from "react";
// @ts-ignore
import { SafeAreaProvider as CoreSafeAreaProvider } from "react-native-safe-area-context";

import { StylexSaveAreaConsumer } from "./StylexSaveAreaConsumer";
import { SafeAreaViewProps } from "./types";

export const SafeAreaProvider = ({
  children,
  initialSafeAreaInsets
}: SafeAreaViewProps) => {
  return (
    <CoreSafeAreaProvider initialSafeAreaInsets={initialSafeAreaInsets}>
      {children}
      <StylexSaveAreaConsumer />
    </CoreSafeAreaProvider>
  );
};
