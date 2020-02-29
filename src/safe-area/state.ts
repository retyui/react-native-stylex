// @ts-ignore
import { initialWindowSafeAreaInsets } from "react-native-safe-area-context";

export const state = {
  insets: initialWindowSafeAreaInsets || {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
};
