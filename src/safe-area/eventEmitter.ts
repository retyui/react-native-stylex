import { createEventEmitter } from "../createEventEmitter";
import { SAFE_AREA_DEPENDENCY_KEY } from "./consts";

export const { emit, on } = createEventEmitter(SAFE_AREA_DEPENDENCY_KEY);
