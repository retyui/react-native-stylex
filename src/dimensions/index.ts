import "./init";

import { Dimensions, ScaledSize } from "react-native";

import { onUse } from "../dependencyUsage";
import { WINDOW_DEPENDENCY_KEY, SCREEN_DEPENDENCY_KEY } from "./consts";

const get = (dim: "window" | "screen") => Dimensions.get(dim);

export function getWindowDimensions(): ScaledSize {
  onUse(WINDOW_DEPENDENCY_KEY);

  return get("window");
}

export function getScreenDimensions(): ScaledSize {
  onUse(SCREEN_DEPENDENCY_KEY);

  return get("screen");
}
