import { Dimensions } from "react-native";
import { useDimensions } from "./useDimensions";
import { addDependency } from "./dependencyRegistry";
import { onUse } from "./dependencyUsage";

type OrientationType = "portrait" | "landscape";

const DEPENDENCY_KEY = "Dimensions.get('screen')";

addDependency(DEPENDENCY_KEY, () => useDimensions().screen);

export const orientation = <T extends {}>({
  portrait,
  landscape
}: { [platform in OrientationType]?: T }): T | undefined => {
  const screen = Dimensions.get("screen");

  onUse(DEPENDENCY_KEY);

  return screen.width < screen.height ? portrait : landscape;
};

export const portraitOrientation = <T extends {}>(portraitStyles: T) =>
  orientation<T>({ portrait: portraitStyles });

export const landscapeOrientation = <T extends {}>(landscapeStyles: T) =>
  orientation<T>({ landscape: landscapeStyles });
