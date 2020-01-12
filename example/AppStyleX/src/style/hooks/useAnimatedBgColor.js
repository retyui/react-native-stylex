import {useColorTransition} from 'react-native-stylex';

const useAnimatedBgColor = () => {
  const animatedBackgroundStyle = {
    backgroundColor: useColorTransition(({palette}) => palette.bg),
  };

  return animatedBackgroundStyle;
};

export default useAnimatedBgColor;
