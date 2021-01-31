import { getScreenDimensions } from "./dimensions";

type OrientationType = "portrait" | "landscape";

export function orientation<T>(
  spec: { [orientation in OrientationType]?: T }
): T | undefined {
  const { height, width } = getScreenDimensions();

  return width <= height ? spec.portrait : spec.landscape;
}

export const portraitOrientation = <T>(portraitStyles: T): T | undefined =>
  orientation<T>({ portrait: portraitStyles });

export const landscapeOrientation = <T>(landscapeStyles: T): T | undefined =>
  orientation<T>({ landscape: landscapeStyles });
