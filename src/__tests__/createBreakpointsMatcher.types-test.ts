import { makeUseStyles } from "../index";
import { createBreakpointsMatcher } from "../media-query";

{
  const breakpoints = createBreakpointsMatcher({
    s: 100,
    m: 200,
    l: 300,
  });

  makeUseStyles(() => ({
    root: {
      position: breakpoints({
        l: "absolute",
        default: "relative",
      }),

      // @ts-expect-error - 'invalid value' is wrong value
      alignItems: breakpoints({
        l: "invalid value",
      }),
    },
  }));
}

{
  const breakpoints = createBreakpointsMatcher({
    s: 100,
    m: 200,
    l: 300,
  });

  const a1: string | undefined = breakpoints({ s: "1" });
  const a2: string | undefined = breakpoints({ s: "1", m: "2" });
  const a3: string | undefined = breakpoints({ s: "1", m: "2", l: "3" });
  const a4: string = breakpoints({
    s: "1",
    m: "2",
    l: "3",
    default: "0",
  });
}

{
  const breakpoints = createBreakpointsMatcher({
    s: 100,
    m: 200,
    l: 300,
  });

  // @ts-expect-error - 'number' is not 'string'
  const a1: string | undefined = breakpoints({ s: 1 });
  const a2 = breakpoints({
    s: 1,
    // @ts-expect-error - 'string' is not 'number'
    m: "2",
  });
}

{
  const breakpoints = createBreakpointsMatcher({
    s: 100,
    m: 200,
    l: 300,
  });

  // @ts-expect-error - can be 'undefined'
  const a1: string = breakpoints({ s: "1" });
  // @ts-expect-error - can be 'undefined'
  const a2: string = breakpoints({ s: "1", m: "2" });
  // @ts-expect-error - can be 'undefined'
  const a3: string = breakpoints({ s: "1", m: "2", l: "3" });

  // @ts-expect-error - 'undefined' is not 'string'
  const a4: undefined = breakpoints({
    s: "1",
    m: "2",
    l: "3",
    default: "0",
  });
}
