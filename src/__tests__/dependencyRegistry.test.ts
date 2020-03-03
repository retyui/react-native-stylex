import { addDependency, getDependency } from "../dependencyRegistry";

it("should overwrite handler", () => {
  const name = "dark-mode";
  const handler = () => () => {};

  addDependency(name, handler);

  expect(getDependency(name)).toBe(handler);

  const newHandler = () => () => {};

  addDependency(name, newHandler);

  expect(getDependency(name)).not.toBe(newHandler);
});
