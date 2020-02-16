import { getMediaQueryKey } from "./customMediaQueryProp";
import { Dimensions } from "./types";

export const createDimensionQueryHelper = (
  queryFunction: (options: { value: number; dimensions: Dimensions }) => boolean
) => <StyleObject extends {}>(
  value: number,
  styles: StyleObject
  // @ts-ignore
): null | StyleObject => ({
  [getMediaQueryKey()]: (dimensions: Dimensions) => {
    const isMatched = queryFunction({ value, dimensions });

    if (isMatched) {
      return styles;
    }

    return null;
  }
});

export const maxHeight = createDimensionQueryHelper(
  ({ value, dimensions }) => value >= dimensions.height
);

export const maxWidth = createDimensionQueryHelper(
  ({ value, dimensions }) => value >= dimensions.width
);

export const minHeight = createDimensionQueryHelper(
  ({ value, dimensions }) => value <= dimensions.height
);

export const minWidth = createDimensionQueryHelper(
  ({ value, dimensions }) => value <= dimensions.width
);
