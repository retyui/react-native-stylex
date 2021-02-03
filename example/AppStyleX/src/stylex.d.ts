import 'react-native-stylex';
import type {Theme} from './style-system/theme';

declare module 'react-native-stylex' {
  export interface DefaultTheme extends Theme {}
}
