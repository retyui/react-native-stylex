import { renderHook } from "@testing-library/react-native";

import { ThemeProvider } from "../context";
import { useTheme } from "../useTheme";

it("should throw an error when context value wasn't passed", () => {
  expect(() => {
    renderHook(() => useTheme());
  }).toThrow();
});

it("should not throw an error", () => {
  const theme = { test: "theme" };

  expect(() => {
    renderHook(() => useTheme(), {
      wrapper: (p) => <ThemeProvider {...p} value={theme} />,
    });
  }).not.toThrow();
});
