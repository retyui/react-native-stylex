import { landscapeOrientation, portraitOrientation } from "../orientation";

import { Dimensions } from "react-native";

const mockStyle = { color: "black" };

const mockGetDimensions = (dimensions: any) => {
  Dimensions.get = () => dimensions;
};

describe("landscapeOrientation", () => {
  it("should return style when screen height less than width", () => {
    const dimensions = { height: 1, width: 2 };

    mockGetDimensions(dimensions);

    expect(landscapeOrientation(mockStyle)).toEqual(mockStyle);
  });

  it("should return 'undefined' when screen height equal width", () => {
    const dimensions = { height: 1, width: 1 };

    mockGetDimensions(dimensions);

    expect(landscapeOrientation(mockStyle)).toBeUndefined();
  });

  it("should return 'null' when screen height more than width", () => {
    const dimensions = { height: 2, width: 1 };

    mockGetDimensions(dimensions);

    expect(landscapeOrientation(mockStyle)).toBeUndefined();
  });
});

describe("portraitOrientation", () => {
  it("should return 'undefined' when screen height less than width", () => {
    const dimensions = { height: 1, width: 2 };

    mockGetDimensions(dimensions);

    expect(portraitOrientation(mockStyle)).toBeUndefined();
  });

  it("should return 'mockStyle' when screen height equal width", () => {
    const dimensions = { height: 1, width: 1 };

    mockGetDimensions(dimensions);

    expect(portraitOrientation(mockStyle)).toEqual(mockStyle);
  });

  it("should return 'mockStyle' when screen height more than width", () => {
    const dimensions = { height: 2, width: 1 };

    mockGetDimensions(dimensions);

    expect(portraitOrientation(mockStyle)).toEqual(mockStyle);
  });
});
