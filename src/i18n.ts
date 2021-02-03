import { I18nManager } from "react-native";

type LayoutDirectionType = "rtl" | "ltr";

export function i18n<T>({
  rtl,
  ltr,
}: { [direction in LayoutDirectionType]?: T }): T | undefined {
  if (I18nManager.isRTL) {
    return rtl;
  }

  return ltr;
}

export const rtl = <T>(styles: T): T | undefined => i18n<T>({ rtl: styles });

export const ltr = <T>(styles: T): T | undefined => i18n<T>({ ltr: styles });
