import React from "react";
import { SafeAreaProvider as CoreSafeAreaProvider } from "react-native-safe-area-context";

import { StylexSaveAreaConsumer } from "./StylexSaveAreaConsumer";
import { SafeAreaViewProps } from "./types";

export function SafeAreaProvider({
  children,
  initialSafeAreaInsets,
}: SafeAreaViewProps): JSX.Element | null {
  return (
    <CoreSafeAreaProvider initialSafeAreaInsets={initialSafeAreaInsets}>
      {children}
      <StylexSaveAreaConsumer />
    </CoreSafeAreaProvider>
  );
}
