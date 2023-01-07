import { minAspectRatio, minWidth, minHeight, maxWidth } from "./base";

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
    // @ts-expect-error: was removed
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
        matchFunction(
          breakpoints[breakpointName] as number,
          values[breakpointName]
        )
      ) || "default";

    return values[key] || null;
  };
}

function getNextByKey<TBreakpoints extends Record<string, number>>(
  breakpoints: TBreakpoints,
  key: keyof TBreakpoints
) {
  type Keys = keyof TBreakpoints;

  const breakpointsKeys: Array<Keys> = Object.keys(breakpoints).sort(
    (a: Keys, b: Keys) => breakpoints[a]!  - breakpoints[b]!
  );
  const index = breakpointsKeys.indexOf(key);
  const nextKey: Keys | undefined = breakpointsKeys[index + 1];

  return nextKey;
}

export function createBreakpoints<TBreakpoints extends Record<string, number>>(
  breakpoints: TBreakpoints
) {
  type Keys = keyof TBreakpoints;

  function up<T>(key: Keys, value: T): T | null {
    return minWidth<T>(breakpoints[key] as number, value);
  }

  function down<T>(key: Keys, value: T): T | null {
    return maxWidth<T>(breakpoints[key] as number, value);
  }

  function only<T>(key: Keys, value: T): T | null {
    const nextKey = getNextByKey<TBreakpoints>(breakpoints, key);

    if (nextKey !== undefined) {
      return minWidth(
        breakpoints[key] as number,
        maxWidth(breakpoints[nextKey]! - 0.05, value)
      );
    }

    return minWidth(breakpoints[key] as number, value);
  }

  function between<T>(start: Keys, end: Keys, value: T): T | null {
    return minWidth(
      breakpoints[start] as number,
      maxWidth(breakpoints[end]! - 0.05, value)
    );
  }

  return { up, down, only, between };
}
