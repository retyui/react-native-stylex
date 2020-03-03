import { Dimensions, ScaledSize } from "react-native";

import { createEventEmitter } from "../createEventEmitter";
import { addDependency } from "../dependencyRegistry";
import { SCREEN_DEPENDENCY_KEY, WINDOW_DEPENDENCY_KEY } from "./consts";

const { get, addEventListener } = Dimensions;

const state = { window: get("window"), screen: get("screen") };

const windowEventEmitter = createEventEmitter(WINDOW_DEPENDENCY_KEY);
const screenEventEmitter = createEventEmitter(SCREEN_DEPENDENCY_KEY);

const isNotEqual = ({ width, height }: ScaledSize, b: ScaledSize) =>
  width !== b.width || height !== b.height;

addDependency(WINDOW_DEPENDENCY_KEY, (handler: () => void) =>
  windowEventEmitter.on(handler)
);

addDependency(SCREEN_DEPENDENCY_KEY, (handler: () => void) =>
  screenEventEmitter.on(handler)
);

addEventListener("change", ({ window, screen }) => {
  if (isNotEqual(screen, state.screen)) {
    state.screen = screen;

    screenEventEmitter.emit();
  }

  if (isNotEqual(window, state.window)) {
    state.window = window;

    windowEventEmitter.emit();
  }
});
