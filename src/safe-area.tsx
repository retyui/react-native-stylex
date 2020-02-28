import {
  initialWindowSafeAreaInsets,
  SafeAreaProvider as CoreSafeAreaProvider,
  useSafeArea
  // @ts-ignore
} from "react-native-safe-area-context";

import { addDependency } from "./dependencyRegistry";
import { onUse } from "./dependencyUsage";
import * as React from "react";

export interface EdgeInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface SafeAreaViewProps {
  children?: React.ReactNode;
  initialSafeAreaInsets?: EdgeInsets | null;
}

const DEPENDENCY_KEY = "react-native-safe-area-context";

addDependency(DEPENDENCY_KEY, () => useSafeArea());

const state = {
  insets: initialWindowSafeAreaInsets || {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
};

export const getSafeArea = <T extends {}>(): EdgeInsets => {
  onUse(DEPENDENCY_KEY);

  return state.insets;
};

export const StylexSaveAreaConsumer = () => {
  const insets = useSafeArea();

  state.insets = insets;

  return null;
};

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
