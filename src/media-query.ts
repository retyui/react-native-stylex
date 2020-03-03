import { ScaledSize } from "react-native";

import { getWindowDimensions } from "./dimensions/index";

export const createDimensionQueryHelper = <Value>(
  queryFunction: (options: { value: Value; dimensions: ScaledSize }) => boolean
) => <T>(value: Value, styles: T): null | T => {
  const isMatched = queryFunction({ value, dimensions: getWindowDimensions() });

  if (isMatched) {
    return styles;
  }

  return null;
};

export const maxHeight = createDimensionQueryHelper<number>(
  ({ value, dimensions }) => value >= dimensions.height
);

export const maxWidth = createDimensionQueryHelper<number>(
  ({ value, dimensions }) => value >= dimensions.width
);

export const minHeight = createDimensionQueryHelper<number>(
  ({ value, dimensions }) => value <= dimensions.height
);

export const minWidth = createDimensionQueryHelper<number>(
  ({ value, dimensions }) => value <= dimensions.width
);

export const minAspectRatio = createDimensionQueryHelper<number>(
  ({ value, dimensions: { width, height } }) => value <= width / height
);

export const maxAspectRatio = createDimensionQueryHelper<number>(
  ({ value, dimensions: { width, height } }) => value >= width / height
);

export const aspectRatio = createDimensionQueryHelper<number>(
  ({ value, dimensions: { width, height } }) => value === width / height
);
