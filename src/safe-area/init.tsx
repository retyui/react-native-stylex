import { addDependency } from "../dependencyRegistry";

import { SAFE_AREA_DEPENDENCY_KEY } from "./consts";
import { on } from "./eventEmitter";

addDependency(SAFE_AREA_DEPENDENCY_KEY, (handler: () => void) => on(handler));
