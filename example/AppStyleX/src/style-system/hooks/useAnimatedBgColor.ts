import {useColorTransition} from 'react-native-stylex';

export const useAnimatedBgColor = () => ({
  backgroundColor: useColorTransition(({palette}) => palette.bg),
});
