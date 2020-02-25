import { Dimensions } from "react-native";
import { useDimensions } from "./useDimensions";
import { addDependency } from "./dependencyRegistry";
import { onUse } from "./dependencyUsage";

const DEPENDENCY_KEY = "screenDimension";

addDependency(DEPENDENCY_KEY, () => useDimensions().screen);

type OrientationType<T> =
  | {
      portrait: T;
      landscape: T;
    }
  | {
      portrait: T;
      landscape: undefined;
    }
  | {
      portrait: undefined;
      landscape: T;
    };

export const orientation = <T extends {}>({
  portrait,
  landscape
}: OrientationType<T>): T | undefined => {
  const screen = Dimensions.get("screen");

  onUse(DEPENDENCY_KEY);

  return screen.width < screen.height ? portrait : landscape;
};
