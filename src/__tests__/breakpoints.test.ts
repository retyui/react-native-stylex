import { createBreakpointsMatcher, maxWidth, minWidth } from "../media-query";
import { getWindowDimensions } from "../dimensions";

jest.mock("../dimensions", () => ({
  getWindowDimensions: jest.fn(),
}));

const mockGetWindowDimensions = getWindowDimensions as jest.Mock;

/*
 * To debug use analog on CSS: https://codepen.io/retyui/pen/dyOzKzV
 */

describe("createBreakpointsMatcher", () => {
  const breakpointsMaxWidth = createBreakpointsMatcher(
    {
      xxs: 100,
      xs: 200,
      s: 300,
      m: 400,
      l: 500,
    },
    maxWidth
  );

  const breakpointsMinWidth = createBreakpointsMatcher({
    xxs: 100,
    xs: 200,
    s: 300,
    m: 400,
    l: 500,
  });

  const values = {
    xxs: "xxs: 100",
    xs: "xs: 200",
    s: "s: 300",
    m: "m: 400",
    l: "l: 500",
    default: "default",
  };

  it("should return boundary values", () => {
    mockGetWindowDimensions.mockReturnValue({ width: 600 });

    expect({
      maxWidth: breakpointsMaxWidth(values),
      minWidth: breakpointsMinWidth(values),
    }).toEqual({
      maxWidth: "default",
      minWidth: "l: 500",
    });

    mockGetWindowDimensions.mockReturnValue({ width: 50 });

    expect({
      maxWidth: breakpointsMaxWidth(values),
      minWidth: breakpointsMinWidth(values),
    }).toEqual({
      maxWidth: "xxs: 100",
      minWidth: "default",
    });
  });

  it("should work properly", () => {
    mockGetWindowDimensions.mockReturnValue({ width: 450 });

    expect({
      maxWidth: breakpointsMaxWidth(values),
      minWidth: breakpointsMinWidth(values),
    }).toEqual({
      maxWidth: "l: 500",
      minWidth: "m: 400",
    });

    mockGetWindowDimensions.mockReturnValue({ width: 401 });

    expect({
      maxWidth: breakpointsMaxWidth(values),
      minWidth: breakpointsMinWidth(values),
    }).toEqual({
      maxWidth: "l: 500",
      minWidth: "m: 400",
    });

    mockGetWindowDimensions.mockReturnValue({ width: 400 });

    expect({
      maxWidth: breakpointsMaxWidth(values),
      minWidth: breakpointsMinWidth(values),
    }).toEqual({
      maxWidth: "m: 400",
      minWidth: "m: 400",
    });

    mockGetWindowDimensions.mockReturnValue({ width: 399 });

    expect({
      maxWidth: breakpointsMaxWidth(values),
      minWidth: breakpointsMinWidth(values),
    }).toEqual({
      maxWidth: "m: 400",
      minWidth: "s: 300",
    });
  });

  it("should return null when no default and it pass boundary values", () => {
    const { default: _, ...valuesWithoutDefault } = values;
    mockGetWindowDimensions.mockReturnValue({ width: 600 });

    expect({
      maxWidth: breakpointsMaxWidth(valuesWithoutDefault),
      minWidth: breakpointsMinWidth(valuesWithoutDefault),
    }).toEqual({
      maxWidth: null,
      minWidth: "l: 500",
    });

    mockGetWindowDimensions.mockReturnValue({ width: 50 });

    expect({
      maxWidth: breakpointsMaxWidth(valuesWithoutDefault),
      minWidth: breakpointsMinWidth(valuesWithoutDefault),
    }).toEqual({
      maxWidth: "xxs: 100",
      minWidth: null,
    });
  });
});

describe("docs test", () => {
  describe("maxWidth", () => {
    const applyBreakpoints = createBreakpointsMatcher(
      {
        xxs: 320,
        xs: 480,
        s: 640,
        m: 768,
        l: 1024,
        xl: 1200,
        xxl: 1920,
      },
      maxWidth
    );

    it("should work properly", () => {
      const values = { xxs: 20, xs: 18, default: 16 };

      mockGetWindowDimensions.mockReturnValue({ width: 0 });
      expect(applyBreakpoints(values)).toBe(20);

      mockGetWindowDimensions.mockReturnValue({ width: 320 });
      expect(applyBreakpoints(values)).toBe(20);

      mockGetWindowDimensions.mockReturnValue({ width: 321 });
      expect(applyBreakpoints(values)).toBe(18);

      mockGetWindowDimensions.mockReturnValue({ width: 480 });
      expect(applyBreakpoints(values)).toBe(18);

      mockGetWindowDimensions.mockReturnValue({ width: 481 });
      expect(applyBreakpoints(values)).toBe(16);

      mockGetWindowDimensions.mockReturnValue({ width: 999 });
      expect(applyBreakpoints(values)).toBe(16);
    });
  });

  describe("minWidth", () => {
    const applyBreakpoints = createBreakpointsMatcher(
      {
        xxs: 320,
        xs: 480,
        s: 640,
        m: 768,
        l: 1024,
        xl: 1200,
        xxl: 1920,
      },
      minWidth
    );

    it("should work properly", () => {
      const values = { xxs: 18, xs: 16, default: 20 };

      mockGetWindowDimensions.mockReturnValue({ width: 0 });
      expect(applyBreakpoints(values)).toBe(20);

      mockGetWindowDimensions.mockReturnValue({ width: 319 });
      expect(applyBreakpoints(values)).toBe(20);

      mockGetWindowDimensions.mockReturnValue({ width: 320 });
      expect(applyBreakpoints(values)).toBe(18);

      mockGetWindowDimensions.mockReturnValue({ width: 479 });
      expect(applyBreakpoints(values)).toBe(18);

      mockGetWindowDimensions.mockReturnValue({ width: 480 });
      expect(applyBreakpoints(values)).toBe(16);

      mockGetWindowDimensions.mockReturnValue({ width: 481 });
      expect(applyBreakpoints(values)).toBe(16);

      mockGetWindowDimensions.mockReturnValue({ width: 999 });
      expect(applyBreakpoints(values)).toBe(16);
    });
  });
});
