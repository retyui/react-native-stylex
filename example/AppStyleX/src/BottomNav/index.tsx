import React from 'react';
import {Animated} from 'react-native';
import {useColorTransition} from 'react-native-stylex';

import {useAnimatedBgColor} from '../style-system/hooks/useAnimatedBgColor';
import {useAnimatedTextColor} from '../style-system/hooks/useAnimatedTextColor';

import {useStyles} from './styles';

export const BottomNav = () => {
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
      <Animated.View style={[styles.nextButton, bgStyle]}>
        <Animated.Text style={[styles.nextButtonText, textStyle]}>
          →
        </Animated.Text>
      </Animated.View>
    </>
  );
};
