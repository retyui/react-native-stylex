import type { Mode } from "react-native-dark-mode";

import { darkUiMode, lightUiMode } from "../dark-mode";
import { state } from "../dark-mode/state";

jest.mock("react-native-dark-mode", () => ({
  initialMode: "light",
  eventEmitter: { on: jest.fn() },
}));

const mockStyles = { color: "red" };

const mutateUiMode = (mode: Mode | null) => {
  // @ts-expect-error: for test only add null
  state.mode = mode;
};

describe("darkUiMode", () => {
  it("should return style when dark mode", () => {
    mutateUiMode("dark");

    expect(darkUiMode(mockStyles)).toEqual(mockStyles);
  });

  it("should return 'undefined' when light mode", () => {
    mutateUiMode("light");

    expect(darkUiMode(mockStyles)).toBeUndefined();
  });

  it("should return 'undefined' when unknown mode", () => {
    mutateUiMode(null);

    expect(darkUiMode(mockStyles)).toBeUndefined();
  });
});

describe("lightUiMode", () => {
  it("should return style when light mode", () => {
    mutateUiMode("light");

    expect(lightUiMode(mockStyles)).toEqual(mockStyles);
  });

  it("should return 'undefined' when dark mode", () => {
    mutateUiMode("dark");

    expect(lightUiMode(mockStyles)).toBeUndefined();
  });

  it("should return 'undefined' when unknown mode", () => {
    mutateUiMode(null);

    expect(lightUiMode(mockStyles)).toBeUndefined();
  });
});
