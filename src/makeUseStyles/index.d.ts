import { StyleSheet } from "react-native";
import { DefaultTheme } from "../DefaultTheme";

export function makeUseStyles<
  Theme extends DefaultTheme,
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
>(getStyles: (theme: Theme) => T | StyleSheet.NamedStyles<T>): () => T;
