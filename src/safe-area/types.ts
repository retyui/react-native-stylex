import {SafeAreaProviderProps} from "react-native-safe-area-context";

export interface EdgeInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface SafeAreaViewProps extends SafeAreaProviderProps { }
