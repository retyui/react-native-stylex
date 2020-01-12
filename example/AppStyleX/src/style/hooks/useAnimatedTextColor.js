import {useColorTransition} from 'react-native-stylex';

const useAnimatedTextColor = () => {
  const animatedTextColorStyle = {
    color: useColorTransition(({palette}) => palette.text),
  };

  return animatedTextColorStyle;
};

export default useAnimatedTextColor;
