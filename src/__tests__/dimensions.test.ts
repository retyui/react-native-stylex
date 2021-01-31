import {
  WINDOW_DEPENDENCY_KEY,
  SCREEN_DEPENDENCY_KEY,
} from "../dimensions/consts";
import { optimizeDependencies } from "../dimensions/utils";

describe("optimizeDependencies", () => {
  it("should remove screen dependency when window dependency exist", () => {
    expect(
      optimizeDependencies({
        [WINDOW_DEPENDENCY_KEY]: true,
        [SCREEN_DEPENDENCY_KEY]: true,
      })
    ).toEqual({
      [WINDOW_DEPENDENCY_KEY]: true,
    });
  });

  it("should skip removing", () => {
    expect(
      optimizeDependencies({
        [WINDOW_DEPENDENCY_KEY]: true,
      })
    ).toEqual({
      [WINDOW_DEPENDENCY_KEY]: true,
    });

    expect(
      optimizeDependencies({
        [SCREEN_DEPENDENCY_KEY]: true,
      })
    ).toEqual({
      [SCREEN_DEPENDENCY_KEY]: true,
    });
  });
});
