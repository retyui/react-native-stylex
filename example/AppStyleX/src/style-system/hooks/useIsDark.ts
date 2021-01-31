import {useTheme} from 'react-native-stylex';
import {darkTheme} from '../theme';

export const useIsDark = (): boolean => {
  const theme = useTheme();

  return theme === darkTheme;
};
