import "./init";

import { onUse } from "../dependencyUsage";

import { SAFE_AREA_DEPENDENCY_KEY } from "./consts";
import { EdgeInsets } from "./types";
import { state } from "./state";

export { StylexSaveAreaConsumer } from "./StylexSaveAreaConsumer";
export { SafeAreaProvider } from "./SafeAreaProvider";

export const getSafeArea = <T extends {}>(): EdgeInsets => {
  onUse(SAFE_AREA_DEPENDENCY_KEY);

  return state.insets;
};
