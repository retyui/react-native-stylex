import { Dimensions, ScaledSize } from "react-native";

import "./init";

import { onUse } from "../dependencyUsage";

import { SCREEN_DEPENDENCY_KEY, WINDOW_DEPENDENCY_KEY } from "./consts";

const get = (dim: "window" | "screen") => Dimensions.get(dim);

export function getWindowDimensions(): ScaledSize {
  onUse(WINDOW_DEPENDENCY_KEY);

  return get("window");
}

export function getScreenDimensions(): ScaledSize {
  onUse(SCREEN_DEPENDENCY_KEY);

  return get("screen");
}
