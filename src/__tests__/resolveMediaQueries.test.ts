import { maxHeight, maxWidth, minHeight, minWidth } from "../mediaQueryHelpers";
import resolveMediaQueries from "../resolveMediaQueries";

it("should overwrite color value", () => {
  const dimensions = { height: 9 };
  const styles = {
    root: {
      height: 1,
      color: "red",
      ...maxHeight(10, { color: "gold", width: 1 })
    }
  };

  expect(resolveMediaQueries(styles, dimensions).root).toEqual({
    height: 1,
    width: 1,
    color: "gold"
  });
});

it("should not overwrite color value", () => {
  const dimensions = { height: 11 };
  const styles = {
    root: {
      height: 1,
      color: "red",
      ...maxHeight(10, { color: "gold", width: 1 })
    }
  };

  expect(resolveMediaQueries(styles, dimensions).root).toEqual({
    height: 1,
    color: "red"
  });
});

it("should overwrite use the last width value", () => {
  const dimensions = { height: 9 };
  const styles = {
    root: {
      width: 1,
      ...maxHeight(10, { width: 2 }),
      ...maxHeight(10, { width: 3 }),
      ...maxHeight(10, { width: 4 })
    }
  };

  expect(resolveMediaQueries(styles, dimensions).root).toEqual({
    width: 4
  });
});
