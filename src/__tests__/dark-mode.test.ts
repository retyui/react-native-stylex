import { state } from "../dark-mode/state";
import { darkUiMode, lightUiMode } from "../dark-mode/index";

const mockStyles = { color: "red" };

const mutateUiMode = (mode: null | "dark" | "light") => (state.mode = mode);

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

