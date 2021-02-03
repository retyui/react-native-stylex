import { eventEmitter, Mode } from "react-native-dark-mode";

import { addDependency } from "../dependencyRegistry";
import { createEventEmitter } from "../createEventEmitter";

import { UI_MODE_DEPENDENCY_KEY } from "./consts";
import { state } from "./state";

const { on, emit } = createEventEmitter(UI_MODE_DEPENDENCY_KEY);

addDependency(UI_MODE_DEPENDENCY_KEY, (handler: () => void) => on(handler));

eventEmitter.on("currentModeChanged", (newMode: Mode) => {
  if (state.mode !== newMode) {
    state.mode = newMode;

    emit();
  }
});
