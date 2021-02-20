import { minAspectRatio, minWidth, minHeight } from "./base";

interface BreakpointsMatcher<TBreakpoints> {
  <T>(values: { [mode in keyof TBreakpoints]?: T }): T | undefined;
  <T>(values: { [mode in keyof TBreakpoints]?: T } & { default: T }): T;
}

const orderByMin = [minWidth, minAspectRatio, minHeight];

const toOrderedBreakpointNames = <TBreakpoints extends Record<string, number>>(
  values: any,
  breakpoints: any,
  matchFunction: any
): Array<keyof TBreakpoints> => {
  const result = Object.keys(values)
    .filter((e) => e !== "default")
    .sort((a, b) => breakpoints[a] - breakpoints[b]);

  if (orderByMin.includes(matchFunction)) {
    return result.slice().reverse();
  }

  return result;
};

/*
 * To debug use analog on CSS: https://codepen.io/retyui/pen/dyOzKzV
 */
export function createBreakpointsMatcher<
  TBreakpoints extends Record<string, number>
>(
  breakpoints: TBreakpoints,
  matchFunction = minWidth
): BreakpointsMatcher<TBreakpoints> {
  return function breakpointsMatcher(values: any) {
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== "production") {
      const invalidKeys = Object.keys(values).filter((key) => {
        return key !== "default" && breakpoints[key] === undefined;
      });

      if (invalidKeys.length > 0) {
        console.warn(
          `[react-native-stylex]: Invalid values was passed to 'breakpointsMatcher' function

allowed keys: ${Object.keys(breakpoints).join(", ")}
unexpected keys: ${invalidKeys.join(", ")}
`
        );
      }
    }

    const orderedBreakpointNames = toOrderedBreakpointNames<TBreakpoints>(
      values,
      breakpoints,
      matchFunction
    );

    const key =
      orderedBreakpointNames.find((breakpointName) =>
        matchFunction(breakpoints[breakpointName], values[breakpointName])
      ) || "default";

    return values[key] || null;
  };
}
