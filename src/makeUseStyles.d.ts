import { StyleSheet } from "react-native";

export type MakeUseStylesFn<Theme extends {}> = <
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
>(
  styles:
    | ((theme: Theme) => T | StyleSheet.NamedStyles<T>)
    | T
    | StyleSheet.NamedStyles<T>
) => () => T;

declare function makeUseStyles<
  Theme extends {},
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
>(
  styles:
    | ((theme: Theme) => T | StyleSheet.NamedStyles<T>)
    | T
    | StyleSheet.NamedStyles<T>
): () => T;

export default makeUseStyles;
