import { I18nManager } from "react-native";

type LayoutDirectionType = "rtl" | "ltr";

export const i18n = <T extends {}>({
  rtl,
  ltr
}: { [direction in LayoutDirectionType]?: T }): T | undefined => {
  if (I18nManager.isRTL) {
    return rtl;
  }

  return ltr;
};

export const rtl = <T extends {}>(styles: T): T | undefined =>
  i18n<T>({ rtl: styles });

export const ltr = <T extends {}>(styles: T): T | undefined =>
  i18n<T>({ ltr: styles });
