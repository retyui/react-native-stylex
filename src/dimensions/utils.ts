import { SCREEN_DEPENDENCY_KEY, WINDOW_DEPENDENCY_KEY } from "./consts";

export const optimizeDependencies = (
  keys: Record<string, boolean>
): Record<string, boolean> => {
  if (keys[WINDOW_DEPENDENCY_KEY] && keys[SCREEN_DEPENDENCY_KEY]) {
    delete keys[SCREEN_DEPENDENCY_KEY];
  }

  return keys;
};
