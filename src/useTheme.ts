import { useContext } from "react";

import { themeContext } from "./context";

// @ts-ignore
export const useTheme = <T>(): T => useContext(themeContext);
