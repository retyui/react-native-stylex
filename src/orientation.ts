import { getScreenDimensions } from "./dimensions/index";

type OrientationType = "portrait" | "landscape";

export const orientation = <T extends {}>({
  portrait,
  landscape
}: { [orientation in OrientationType]?: T }): T | undefined => {
  const { height, width } = getScreenDimensions();

  return width <= height ? portrait : landscape;
};

export const portraitOrientation = <T extends {}>(portraitStyles: T) =>
  orientation<T>({ portrait: portraitStyles });

export const landscapeOrientation = <T extends {}>(landscapeStyles: T) =>
  orientation<T>({ landscape: landscapeStyles });
