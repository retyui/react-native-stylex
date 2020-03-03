import { onUse, resetUsing, getUsing } from "../dependencyUsage";

it("should clear usage map", () => {
  onUse("a");
  onUse("a");
  onUse("b");

  expect(getUsing()).toEqual({ a: true, b: true });

  resetUsing();

  expect(getUsing()).toEqual({});
});
