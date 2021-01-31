import {useColorTransition} from 'react-native-stylex';

export const useAnimatedTextColor = () => ({
  color: useColorTransition(({palette}) => palette.text),
});
