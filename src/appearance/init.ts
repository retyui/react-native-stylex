// @ts-ignore
import { Appearance } from "react-native-appearance";

import { addDependency } from "../dependencyRegistry";
import { createEventEmitter } from "../createEventEmitter";

import { UI_MODE_DEPENDENCY_KEY } from "./consts";

const { on, emit } = createEventEmitter(UI_MODE_DEPENDENCY_KEY);

addDependency(UI_MODE_DEPENDENCY_KEY, (handler: () => void) => on(handler));

Appearance.addChangeListener(emit);
