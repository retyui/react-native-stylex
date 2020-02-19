import { Dimensions, ScaledSize } from "react-native";

export const createDimensionQueryHelper = <Value>(
  queryFunction: (options: { value: Value; dimensions: ScaledSize }) => boolean
) => <StyleObject extends {}>(
  value: Value,
  styles: StyleObject
): null | StyleObject => {
  const dimensions: ScaledSize = Dimensions.get("window");
  const isMatched = queryFunction({ value, dimensions });

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
  ({ value, dimensions: { width, height } }) =>
      value <= width / height
);

export const maxAspectRatio = createDimensionQueryHelper<number>(
  ({ value, dimensions: { width, height } }) =>
    value >= width / height
);

export const aspectRatio = createDimensionQueryHelper<number>(
  ({ value, dimensions: { width, height } }) =>
    value === width / height
);
