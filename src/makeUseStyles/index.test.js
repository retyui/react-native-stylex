import { createUseStylesWithoutTheme } from "./createUseStylesWithoutTheme";
import { createUseStylesTheme } from "./createUseStylesTheme";
import { makeUseStyles } from "./index";

jest.mock("./createUseStylesWithoutTheme");
jest.mock("./createUseStylesTheme");

afterEach(() => {
  jest.clearAllMocks();
});

it("should invoke 'createUseStylesWithoutTheme' when pass function without first argument", () => {
  const withoutThemeDeps = () => ({});

  makeUseStyles(withoutThemeDeps);

  expect(createUseStylesWithoutTheme).toHaveBeenCalledTimes(1);
  expect(createUseStylesTheme).toHaveBeenCalledTimes(0);
});

it("should invoke 'createUseStylesTheme' when pass function with first argument", () => {
  const withThemeDeps = (theme) => ({});

  makeUseStyles(withThemeDeps);

  expect(createUseStylesWithoutTheme).toHaveBeenCalledTimes(0);
  expect(createUseStylesTheme).toHaveBeenCalledTimes(1);
});
