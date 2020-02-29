import "./init";

import { Dimensions } from "react-native";

import { onUse } from "../dependencyUsage";
import { WINDOW_DEPENDENCY_KEY, SCREEN_DEPENDENCY_KEY } from "./consts";

const get = (dim: "window" | "screen") => Dimensions.get(dim);

export const getWindowDimensions = () => {
  onUse(WINDOW_DEPENDENCY_KEY);

  return get("window");
};

export const getScreenDimensions = () => {
  onUse(SCREEN_DEPENDENCY_KEY);

  return get("screen");
};

export const optimizeDependencies = (keys: Record<string, boolean>) => {
  if (keys[WINDOW_DEPENDENCY_KEY] && keys[SCREEN_DEPENDENCY_KEY]) {
    delete keys[SCREEN_DEPENDENCY_KEY];
  }

  return keys;
};
