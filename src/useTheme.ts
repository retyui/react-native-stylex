import { useContext } from "react";

import { themeContext } from "./context";

// @ts-ignore
const useTheme = <T>(): T => useContext(themeContext);

export default useTheme;
