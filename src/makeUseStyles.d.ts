import { StyleSheet } from "react-native";

export type MakeUseStylesFn<Theme extends {}> = <
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
>(
  getStyles:
    | ((theme: Theme) => T | StyleSheet.NamedStyles<T>)
    | (() => T | StyleSheet.NamedStyles<T>)
) => () => T;

export function makeUseStyles<
  Theme extends {},
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
>(
    getStyles:
    | ((theme: Theme) => T | StyleSheet.NamedStyles<T>)
    | (() => T | StyleSheet.NamedStyles<T>)
): () => T;
