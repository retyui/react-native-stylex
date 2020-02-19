import { Dimensions } from "react-native";

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

  return screen.width < screen.height ? portrait : landscape;
};
