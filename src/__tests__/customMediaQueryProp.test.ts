import { getMediaQueryKey, isMediaQueryProp } from "../customMediaQueryProp";

it("should return string literal", () => {
  expect(getMediaQueryKey()).toEqual(expect.any(String));
});

it("should work properly", () => {
  expect(isMediaQueryProp(getMediaQueryKey())).toBe(true);
  expect(isMediaQueryProp(`INVALID_KEY${getMediaQueryKey()}`)).toBe(false);
});
