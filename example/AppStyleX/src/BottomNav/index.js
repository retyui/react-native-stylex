import React from 'react';
import {Animated} from 'react-native';
import {useColorTransition} from 'react-native-stylex';

import useAnimatedBgColor from '../style/hooks/useAnimatedBgColor';
import useAnimatedTextColor from '../style/hooks/useAnimatedTextColor';

import useStyles from './styles';

const BottomNav = () => {
  const styles = useStyles();
  const bgStyle = useAnimatedBgColor();
  const textStyle = useAnimatedTextColor();
  const skipAnimatedStyle = {
    color: useColorTransition(({palette, utils}) =>
      utils.fade(palette.text, 0.5),
    ),
  };

  return (
    <>
      <Animated.Text style={[styles.skipBtn, skipAnimatedStyle]}>
        Skip
      </Animated.Text>
      <Animated.Text style={[styles.nextButton, bgStyle, textStyle]}>
        →
      </Animated.Text>
    </>
  );
};

export default BottomNav;
