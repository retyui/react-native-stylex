import { I18nManager } from "react-native";
import { addDependency } from "./dependencyRegistry";

const DEPENDENCY_KEY = "isRTL";

addDependency(DEPENDENCY_KEY, () => {
  // This hook don't have specific dynamic logic
  // We can't currently subscribe any events
  return I18nManager.isRTL;
});

type LayoutDirection<T> =
  | {
      rtl: T;
      ltr: T;
    }
  | {
      rtl: T;
      ltr: undefined;
    }
  | {
      rtl: undefined;
      ltr: T;
    };

export const i18n = <T extends {}>({
  rtl,
  ltr
}: LayoutDirection<T>): T | undefined => {
  if (I18nManager.isRTL) {
    return rtl;
  }

  return ltr;
};
