import {useTheme} from 'react-native-stylex';
import {darkTheme} from '../theme';

const useIsDark = () => {
  const theme = useTheme();

  return theme === darkTheme;
};

export default useIsDark;
