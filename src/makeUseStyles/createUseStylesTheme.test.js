import { renderHook, act } from "@testing-library/react-hooks";
import { createUseStylesTheme } from "./createUseStylesTheme";
import { ThemeProvider } from "../context";
import { createEventEmitter } from "../createEventEmitter";
import { addDependency } from "../dependencyRegistry";
import { onUse } from "../dependencyUsage";

it("should create styles using a theme", () => {
  const mockGetStyles = jest.fn(({ colors }) => ({
    root: { color: colors.red },
  }));

  const useStyles = createUseStylesTheme(mockGetStyles);
  const { result } = renderHook(() => useStyles(), {
    wrapper: ThemeProvider,
    initialProps: { value: { colors: { red: "red" } } },
  });

  expect(result.current).toEqual({
    root: { color: "red" },
  });
});

it("should create styles once", () => {
  const theme = { colors: { red: "red" } };
  const mockGetStyles = jest.fn(({ colors }) => ({
    root: { color: colors.red },
  }));

  const useStyles = createUseStylesTheme(mockGetStyles);

  renderHook(
    () => {
      useStyles();
      useStyles();
      useStyles();
    },
    {
      wrapper: ThemeProvider,
      initialProps: { value: theme },
    }
  );

  expect(mockGetStyles).toHaveBeenCalledTimes(1);
});

it("should not update styles when component rerender", () => {
  const theme = { colors: { red: "red" } };
  const mockGetStyles = jest.fn(({ colors }) => ({
    root: { color: colors.red },
  }));

  const useStyles = createUseStylesTheme(mockGetStyles);
  const { rerender } = renderHook(() => useStyles(), {
    wrapper: ThemeProvider,
    initialProps: { value: theme },
  });

  rerender({ value: theme, a: 1 });
  rerender({ value: theme, a: 2 });
  rerender({ value: theme, a: 3 });

  expect(mockGetStyles).toHaveBeenCalledTimes(1);
});

it("should use memoized styles when component rerender", () => {
  const theme = { colors: { red: "red" } };
  const mockGetStyles = jest.fn(({ colors }) => ({
    root: { color: colors.red },
  }));

  const useStyles = createUseStylesTheme(mockGetStyles);
  const { rerender, result } = renderHook(() => useStyles(), {
    wrapper: ThemeProvider,
    initialProps: { value: theme },
  });

  const initialStyles = result.current;

  rerender({ value: theme, a: 1 });
  rerender({ value: theme, a: 2 });
  rerender({ value: theme, a: 3 });

  const afterUpdateStyles = result.current;

  expect(afterUpdateStyles).toBe(initialStyles);
});

it("should update styles when theme was changed", () => {
  const initialTheme = { colors: { red: "red" } };
  const newTheme = { colors: { red: "white" } };

  const mockGetStyles = jest.fn(({ colors }) => ({
    root: { color: colors.red },
  }));

  const useStyles = createUseStylesTheme(mockGetStyles);
  const { rerender } = renderHook(() => useStyles(), {
    wrapper: ThemeProvider,
    initialProps: { value: initialTheme },
  });

  act(() => {
    rerender({ value: newTheme });
  });

  expect(mockGetStyles).toHaveBeenCalledTimes(2);
});

it("should update styles when dependency changed", () => {
  const theme = { colors: { red: "red" } };
  const TEST_DEPENDENCY_KEY = `test_${Math.random()}`;
  const { on, emit } = createEventEmitter(TEST_DEPENDENCY_KEY);
  const mockGetStyles = jest.fn(({ colors }) => {
    // simulate using a dependency
    onUse(TEST_DEPENDENCY_KEY);

    return {
      root: { color: colors.red },
    };
  });

  addDependency(TEST_DEPENDENCY_KEY, (handler) => on(handler));

  const useStyles = createUseStylesTheme(mockGetStyles);

  renderHook(() => useStyles(), {
    wrapper: ThemeProvider,
    initialProps: { value: theme },
  });

  act(() => {
    emit();
  });

  expect(mockGetStyles).toHaveBeenCalledTimes(2);
});
