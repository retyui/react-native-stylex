// @ts-ignore
import { initialWindowMetrics as metrics } from "react-native-safe-area-context";

const defaultInsets = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

export const state = {
  insets: (metrics && metrics.insets) || defaultInsets,
};
