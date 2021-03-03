import { createBreakpoints } from "../media-query/breakpoints";
import { getWindowDimensions } from "../dimensions";

jest.mock("../dimensions", () => ({
  getWindowDimensions: jest.fn(),
}));

const mockWindowWidth = (width: number) => {
  const mockGetWindowDimensions = getWindowDimensions as jest.Mock;
  mockGetWindowDimensions.mockReturnValue({ width });
};

describe("createBreakpoints", () => {
  const config = {
    xs: 360,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  };
  const breakpoints = createBreakpoints(config);

  describe("down", () => {
    const getStyles = () => ({
      fontSize: 16,
      ...breakpoints.down("lg", { fontSize: 18 }),
      ...breakpoints.down("sm", { fontSize: 20 }),
    });

    it("should return small variant", () => {
      mockWindowWidth(0);
      expect(getStyles()).toEqual({ fontSize: 20 });
      mockWindowWidth(600);
      expect(getStyles()).toEqual({ fontSize: 20 });
    });

    it("should return large variant", () => {
      mockWindowWidth(601);
      expect(getStyles()).toEqual({ fontSize: 18 });
      mockWindowWidth(1280);
      expect(getStyles()).toEqual({ fontSize: 18 });
    });

    it("should return default variant", () => {
      mockWindowWidth(1281);
      expect(getStyles()).toEqual({ fontSize: 16 });
      mockWindowWidth(1920);
      expect(getStyles()).toEqual({ fontSize: 16 });
      mockWindowWidth(1921);
      expect(getStyles()).toEqual({ fontSize: 16 });
    });
  });

  describe("up", () => {
    const getStyles = () => ({
      fontSize: 20,
      ...breakpoints.up("sm", { fontSize: 18 }),
      ...breakpoints.up("lg", { fontSize: 16 }),
    });

    it("should return small variant", () => {
      mockWindowWidth(0);
      expect(getStyles()).toEqual({ fontSize: 20 });
      mockWindowWidth(599);
      expect(getStyles()).toEqual({ fontSize: 20 });
    });

    it("should return large variant", () => {
      mockWindowWidth(600);
      expect(getStyles()).toEqual({ fontSize: 18 });
      mockWindowWidth(1279);
      expect(getStyles()).toEqual({ fontSize: 18 });
    });

    it("should return default variant", () => {
      mockWindowWidth(1280);
      expect(getStyles()).toEqual({ fontSize: 16 });
      mockWindowWidth(1920);
      expect(getStyles()).toEqual({ fontSize: 16 });
      mockWindowWidth(1921);
      expect(getStyles()).toEqual({ fontSize: 16 });
    });
  });

  describe("only", () => {
    it("should work properly", () => {
      const getStyles = () => ({
        fontSize: 16,
        ...breakpoints.only("md", { fontSize: 20 }),
      });
      // window width : 0...xs...sm...md...lg...xl...∞
      //     fontSize : .............[20...20]...........

      mockWindowWidth(0);
      expect(getStyles()).toEqual({ fontSize: 16 });
      mockWindowWidth(config.md - 0.5);
      expect(getStyles()).toEqual({ fontSize: 16 });

      mockWindowWidth(config.md);
      expect(getStyles()).toEqual({ fontSize: 20 });
      mockWindowWidth(config.lg - 0.5);
      expect(getStyles()).toEqual({ fontSize: 20 });

      mockWindowWidth(config.lg);
      expect(getStyles()).toEqual({ fontSize: 16 });
    });

    it("should call up on last breakpoint", () => {
      const getStyles = () => ({
        fontSize: 16,
        ...breakpoints.only("xl", { fontSize: 20 }),
      });
      // window width : 0...xs...sm...md...lg...xl...∞
      //     fontSize : .......................[20.......

      mockWindowWidth(config.xl - 0.5);
      expect(getStyles()).toEqual({ fontSize: 16 });

      mockWindowWidth(config.xl);
      expect(getStyles()).toEqual({ fontSize: 20 });
      mockWindowWidth(config.xl + 0.5);
      expect(getStyles()).toEqual({ fontSize: 20 });
    });
  });

  describe("between", () => {
    const getStyles = () => ({
      fontSize: 16,
      ...breakpoints.between("sm", "lg", { fontSize: 20 }),
    });

    it("should work properly", () => {
      // window width : 0...xs...sm...md...lg...xl...∞
      //     fontSize : ........[20........20]...........

      mockWindowWidth(0);
      expect(getStyles()).toEqual({ fontSize: 16 });
      mockWindowWidth(config.sm - 0.5);
      expect(getStyles()).toEqual({ fontSize: 16 });

      mockWindowWidth(config.sm);
      expect(getStyles()).toEqual({ fontSize: 20 });
      mockWindowWidth(config.md);
      expect(getStyles()).toEqual({ fontSize: 20 });
      mockWindowWidth(config.lg - 0.5);
      expect(getStyles()).toEqual({ fontSize: 20 });

      mockWindowWidth(config.lg);
      expect(getStyles()).toEqual({ fontSize: 16 });
    });
  });
});
