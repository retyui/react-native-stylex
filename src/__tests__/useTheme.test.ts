import { renderHook } from "@testing-library/react-hooks";
import { useTheme } from "../useTheme";
import { ThemeProvider } from "../context";

it("should throw an error when context value wasn't passed", () => {
  expect(() => {
    const { result } = renderHook(() => useTheme());

    // trigger invoking passed hook
    result.current;
  }).toThrow();
});

it("should not throw an error", () => {
  const theme = { test: "theme" };

  expect(() => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
      initialProps: { value: theme },
    });

    // trigger invoking passed hook
    result.current;
  }).not.toThrow();
});
