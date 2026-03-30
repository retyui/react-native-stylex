import "./init";

import { onUse } from "../dependencyUsage";

import { SAFE_AREA_DEPENDENCY_KEY } from "./consts";
import { state } from "./state";
import { EdgeInsets } from "./types";

export { StylexSaveAreaConsumer } from "./StylexSaveAreaConsumer";
export { SafeAreaProvider } from "./SafeAreaProvider";

export function getSafeArea(): EdgeInsets {
  onUse(SAFE_AREA_DEPENDENCY_KEY);

  return state.insets;
}
