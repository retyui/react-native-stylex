import { isMediaQueryProp } from "./customMediaQueryProp";
import { Dimensions } from "./types";

const { entries } = Object;

const mergeAllStyles = (styleProp: {}, dimensions: Dimensions) =>
  entries(styleProp).reduce((acc, [key, value]) => {
    if (isMediaQueryProp(key)) {
      return {
        ...acc,
        // @ts-ignore
        ...value(dimensions)
      };
    }

    return {
      ...acc,
      [key]: value
    };
  }, {});

const resolveMediaQueries = (
  styles: { [key: string]: {} },
  dimensions: Dimensions
) =>
  entries(styles).reduce((acc, [key, styleProp]) => {
    // @ts-ignore
    acc[key] = mergeAllStyles(styleProp, dimensions);

    return acc;
  }, {});

export default resolveMediaQueries;
