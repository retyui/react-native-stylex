import { createBreakpointsMatcher, maxWidth, minWidth } from "../media-query";
import { getWindowDimensions } from "../dimensions";

jest.mock("../dimensions", () => ({
  getWindowDimensions: jest.fn(),
}));

const mockWindowWidth = (width: number) => {
  const mockGetWindowDimensions = getWindowDimensions as jest.Mock;
  mockGetWindowDimensions.mockReturnValue({ width });
};

/*
 * To debug use analog on CSS: https://codepen.io/retyui/pen/dyOzKzV
 */
describe("createBreakpointsMatcher", () => {
  const config = {
    xxs: 100,
    xs: 200,
    s: 300,
    m: 400,
    l: 500,
  };
  const breakpointsMaxWidth = createBreakpointsMatcher(config, maxWidth);
  const breakpointsMinWidth = createBreakpointsMatcher(config);

  const values = {
    xxs: "xxs: 100",
    xs: "xs: 200",
    s: "s: 300",
    m: "m: 400",
    l: "l: 500",
    default: "default",
  };

  it("should return boundary values", () => {
    mockWindowWidth(600);

    expect({
      maxWidth: breakpointsMaxWidth(values),
      minWidth: breakpointsMinWidth(values),
    }).toEqual({
      maxWidth: "default",
      minWidth: "l: 500",
    });

    mockWindowWidth(50);

    expect({
      maxWidth: breakpointsMaxWidth(values),
      minWidth: breakpointsMinWidth(values),
    }).toEqual({
      maxWidth: "xxs: 100",
      minWidth: "default",
    });
  });

  it("should work properly", () => {
    mockWindowWidth(450);

    expect({
      maxWidth: breakpointsMaxWidth(values),
      minWidth: breakpointsMinWidth(values),
    }).toEqual({
      maxWidth: "l: 500",
      minWidth: "m: 400",
    });

    mockWindowWidth(401);

    expect({
      maxWidth: breakpointsMaxWidth(values),
      minWidth: breakpointsMinWidth(values),
    }).toEqual({
      maxWidth: "l: 500",
      minWidth: "m: 400",
    });

    mockWindowWidth(400);

    expect({
      maxWidth: breakpointsMaxWidth(values),
      minWidth: breakpointsMinWidth(values),
    }).toEqual({
      maxWidth: "m: 400",
      minWidth: "m: 400",
    });

    mockWindowWidth(399);

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
    mockWindowWidth(600);

    expect({
      maxWidth: breakpointsMaxWidth(valuesWithoutDefault),
      minWidth: breakpointsMinWidth(valuesWithoutDefault),
    }).toEqual({
      maxWidth: null,
      minWidth: "l: 500",
    });

    mockWindowWidth(50);

    expect({
      maxWidth: breakpointsMaxWidth(valuesWithoutDefault),
      minWidth: breakpointsMinWidth(valuesWithoutDefault),
    }).toEqual({
      maxWidth: "xxs: 100",
      minWidth: null,
    });
  });
});

describe("docs examples", () => {
  const config = {
    xxs: 320,
    xs: 480,
    s: 640,
    m: 768,
    l: 1024,
    xl: 1200,
    xxl: 1920,
  };
  describe("maxWidth", () => {
    const applyBreakpoints = createBreakpointsMatcher(config, maxWidth);

    it("should work properly", () => {
      const values = { xxs: 20, xs: 18, default: 16 };

      mockWindowWidth(0);
      expect(applyBreakpoints(values)).toBe(20);

      mockWindowWidth(320);
      expect(applyBreakpoints(values)).toBe(20);

      mockWindowWidth(321);
      expect(applyBreakpoints(values)).toBe(18);

      mockWindowWidth(480);
      expect(applyBreakpoints(values)).toBe(18);

      mockWindowWidth(481);
      expect(applyBreakpoints(values)).toBe(16);

      mockWindowWidth(999);
      expect(applyBreakpoints(values)).toBe(16);
    });
  });

  describe("minWidth", () => {
    const applyBreakpoints = createBreakpointsMatcher(config, minWidth);

    it("should work properly", () => {
      const values = { xxs: 18, xs: 16, default: 20 };

      mockWindowWidth(0);
      expect(applyBreakpoints(values)).toBe(20);

      mockWindowWidth(319);
      expect(applyBreakpoints(values)).toBe(20);

      mockWindowWidth(320);
      expect(applyBreakpoints(values)).toBe(18);

      mockWindowWidth(479);
      expect(applyBreakpoints(values)).toBe(18);

      mockWindowWidth(480);
      expect(applyBreakpoints(values)).toBe(16);

      mockWindowWidth(481);
      expect(applyBreakpoints(values)).toBe(16);

      mockWindowWidth(999);
      expect(applyBreakpoints(values)).toBe(16);
    });
  });
});
