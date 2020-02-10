import { maxHeight, maxWidth, minHeight, minWidth } from "../mediaQueryHelpers";

const mockStyle = { color: "black" };

const applyDimensions = (dynamicStyles: {}, dimensions: {}) =>
  Object.values(dynamicStyles)[0](dimensions);

describe("max*", () => {
  describe("maxHeight", () => {
    it("should return style when device height less than passed", () => {
      const dimensions = { height: 319 };

      expect(applyDimensions(maxHeight(320, mockStyle), dimensions)).toEqual(
        mockStyle
      );
    });

    it("should return null when device height more than passed value", () => {
      const dimensions = { height: 321 };

      expect(applyDimensions(maxHeight(320, mockStyle), dimensions)).toEqual(
        null
      );
    });

    it("should return null when device height equal a passed value", () => {
      const dimensions = { height: 320 };

      expect(applyDimensions(maxHeight(320, mockStyle), dimensions)).toEqual(
        null
      );
    });
  });

  describe("maxWidth", () => {
    it("should return style when device width less than passed", () => {
      const dimensions = { width: 319 };

      expect(applyDimensions(maxWidth(320, mockStyle), dimensions)).toEqual(
        mockStyle
      );
    });

    it("should return null when device width more than passed value", () => {
      const dimensions = { width: 321 };

      expect(applyDimensions(maxWidth(320, mockStyle), dimensions)).toEqual(
        null
      );
    });

    it("should return null when device width equal a passed value", () => {
      const dimensions = { width: 320 };

      expect(applyDimensions(maxWidth(320, mockStyle), dimensions)).toEqual(
        null
      );
    });
  });
});

describe("min*", () => {
  describe("minHeight", () => {
    it("should return null when device height less than passed", () => {
      const dimensions = { height: 319 };

      expect(applyDimensions(minHeight(320, mockStyle), dimensions)).toEqual(
        null
      );
    });

    it("should return style when device height more than passed value", () => {
      const dimensions = { height: 321 };

      expect(applyDimensions(minHeight(320, mockStyle), dimensions)).toEqual(
        mockStyle
      );
    });

    it("should return null when device height equal a passed value", () => {
      const dimensions = { height: 320 };

      expect(applyDimensions(minHeight(320, mockStyle), dimensions)).toEqual(
        null
      );
    });
  });

  describe("minWidth", () => {
    it("should return null when device width less than passed", () => {
      const dimensions = { width: 319 };

      expect(applyDimensions(minWidth(320, mockStyle), dimensions)).toEqual(
        null
      );
    });

    it("should return style when device width more than passed value", () => {
      const dimensions = { width: 321 };

      expect(applyDimensions(minWidth(320, mockStyle), dimensions)).toEqual(
        mockStyle
      );
    });

    it("should return null when device width equal a passed value", () => {
      const dimensions = { width: 320 };

      expect(applyDimensions(minWidth(320, mockStyle), dimensions)).toEqual(
        null
      );
    });
  });
});
