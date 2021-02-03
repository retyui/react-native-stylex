import { Dimensions } from "react-native";
import {
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  aspectRatio,
  minAspectRatio,
  maxAspectRatio,
} from "../media-query";

const mockStyle = { color: "black" };

const mockGetDimensions = (dimensions: any) => {
  Dimensions.get = () => dimensions;
};

describe("max*", () => {
  describe("maxHeight", () => {
    it("should return style when device height less than passed", () => {
      const dimensions = { height: 319 };

      mockGetDimensions(dimensions);

      expect(maxHeight(320, mockStyle)).toEqual(mockStyle);
    });

    it("should return null when device height more than passed value", () => {
      const dimensions = { height: 321 };

      mockGetDimensions(dimensions);

      expect(maxHeight(320, mockStyle)).toEqual(null);
    });

    it("should return null when device height equal a passed value", () => {
      const dimensions = { height: 321 };

      mockGetDimensions(dimensions);

      expect(maxHeight(320, mockStyle)).toEqual(null);
    });
  });

  describe("maxWidth", () => {
    it("should return style when device width less than passed", () => {
      const dimensions = { width: 319 };

      mockGetDimensions(dimensions);

      expect(maxWidth(320, mockStyle)).toEqual(mockStyle);
    });

    it("should return null when device width more than passed value", () => {
      const dimensions = { width: 321 };

      mockGetDimensions(dimensions);

      expect(maxWidth(320, mockStyle)).toEqual(null);
    });

    it("should return null when device width equal a passed value", () => {
      const dimensions = { width: 321 };

      mockGetDimensions(dimensions);

      expect(maxWidth(320, mockStyle)).toEqual(null);
    });
  });
});

describe("min*", () => {
  describe("minHeight", () => {
    it("should return null when device height less than passed", () => {
      const dimensions = { height: 319 };

      mockGetDimensions(dimensions);

      expect(minHeight(320, mockStyle)).toEqual(null);
    });

    it("should return style when device height more than passed value", () => {
      const dimensions = { height: 321 };

      mockGetDimensions(dimensions);

      expect(minHeight(320, mockStyle)).toEqual(mockStyle);
    });

    it("should return null when device height equal a passed value", () => {
      const dimensions = { height: 319 };

      mockGetDimensions(dimensions);

      expect(minHeight(320, mockStyle)).toEqual(null);
    });
  });

  describe("minWidth", () => {
    it("should return null when device width less than passed", () => {
      const dimensions = { width: 319 };

      mockGetDimensions(dimensions);

      expect(minWidth(320, mockStyle)).toEqual(null);
    });

    it("should return style when device width more than passed value", () => {
      const dimensions = { width: 321 };

      mockGetDimensions(dimensions);

      expect(minWidth(320, mockStyle)).toEqual(mockStyle);
    });

    it("should return null when device width equal a passed value", () => {
      const dimensions = { width: 319 };

      mockGetDimensions(dimensions);

      expect(minWidth(320, mockStyle)).toEqual(null);
    });
  });
});

describe("aspectRatio", () => {
  describe("equal", () => {
    it("should return null when device ratio less then passed", () => {
      const dimensions = { width: 100, height: 201 };

      mockGetDimensions(dimensions);

      expect(aspectRatio(1 / 2, mockStyle)).toEqual(null);
    });

    it("should return style when ratio equal", () => {
      const dimensions = { width: 100, height: 200 };

      mockGetDimensions(dimensions);

      expect(aspectRatio(1 / 2, mockStyle)).toEqual(mockStyle);
    });

    it("should return null when device ratio greater than passed", () => {
      const dimensions = { width: 100, height: 199 };

      mockGetDimensions(dimensions);

      expect(aspectRatio(1 / 2, mockStyle)).toEqual(null);
    });
  });

  describe("min", () => {
    it("should return null when device ratio less then passed", () => {
      const dimensions = { width: 100, height: 201 };

      mockGetDimensions(dimensions);

      expect(minAspectRatio(1 / 2, mockStyle)).toEqual(null);
    });

    it("should return style when ratio equal passed", () => {
      const dimensions = { width: 100, height: 200 };

      mockGetDimensions(dimensions);

      expect(minAspectRatio(1 / 2, mockStyle)).toEqual(mockStyle);
    });

    it("should return style when ratio greater than passed", () => {
      const dimensions = { width: 100, height: 199 };

      mockGetDimensions(dimensions);

      expect(minAspectRatio(1 / 2, mockStyle)).toEqual(mockStyle);
    });
  });

  describe("max", () => {
    it("should return style when device ratio less then passed", () => {
      const dimensions = { width: 100, height: 201 };

      mockGetDimensions(dimensions);

      expect(maxAspectRatio(1 / 2, mockStyle)).toEqual(mockStyle);
    });

    it("should return style when ratio equal passed", () => {
      const dimensions = { width: 100, height: 200 };

      mockGetDimensions(dimensions);

      expect(maxAspectRatio(1 / 2, mockStyle)).toEqual(mockStyle);
    });

    it("should return null when ratio greater than passed", () => {
      const dimensions = { width: 100, height: 199 };

      mockGetDimensions(dimensions);

      expect(maxAspectRatio(1 / 2, mockStyle)).toEqual(null);
    });
  });
});
