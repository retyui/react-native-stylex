import { renderHook, act } from "@testing-library/react-hooks";
import { createUseStylesWithoutTheme } from "./createUseStylesWithoutTheme";

import { addDependency } from "../dependencyRegistry";
import { onUse } from "../dependencyUsage";
import { createEventEmitter } from "../createEventEmitter";

const TEST_DEPENDENCY_KEY = `test_${Math.random()}`;

const { on, emit } = createEventEmitter(TEST_DEPENDENCY_KEY);

addDependency(TEST_DEPENDENCY_KEY, (handler) => on(handler));

const useStyles = createUseStylesWithoutTheme(() => {
  // simulate using a dependency
  onUse(TEST_DEPENDENCY_KEY);

  return {
    root: { color: "red" },
  };
});

it("should use the same styles object to reduce memory usage", () => {
  const { result } = renderHook(() => ({
    stl1: useStyles(),
    stl2: useStyles(),
  }));

  expect(result.current.stl1).toBe(result.current.stl2);
});

it("should update styles when dependency changed", () => {
  const { result } = renderHook(() => ({
    stl1: useStyles(),
    stl2: useStyles(),
  }));

  const initialResult = { ...result.current };

  act(() => {
    emit();
  });

  const updatedResult = { ...result.current };

  expect(initialResult.stl1).not.toBe(updatedResult.stl1);
  expect(initialResult.stl2).not.toBe(updatedResult.stl2);
});

it("should return the same style when component rerender", () => {
  const mockUseStyles = jest.fn(useStyles);

  const { result, rerender } = renderHook(() => mockUseStyles());

  const initialResult = result.current;

  rerender({});

  const updatedResult = result.current;

  expect(mockUseStyles).toHaveBeenCalledTimes(2);
  expect(initialResult).toBe(updatedResult);
});
