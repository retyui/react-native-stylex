import React from 'react';
import {Animated} from 'react-native';

import {useAnimatedBgColor} from '../style-system/hooks/useAnimatedBgColor';
import {useAnimatedTextColor} from '../style-system/hooks/useAnimatedTextColor';

import {ToggleButton} from '../ToggleButton';
import {BottomNav} from '../BottomNav';
import {Circle} from '../Circle';

import {useStyles} from './styles';

interface Props {
  toggleTheme: () => void;
}

// Concept: https://dribbble.com/shots/5846239-Light-dark-toggle-switch-InVision-Studio
export const Root = ({toggleTheme}: Props) => {
  const styles = useStyles();
  const bgStyle = useAnimatedBgColor();
  const textStyle = useAnimatedTextColor();

  return (
    <Animated.View style={[styles.root, bgStyle]}>
      <Circle />

      <Animated.Text style={[styles.title, textStyle]}>
        Choose a style
      </Animated.Text>
      <Animated.Text style={[styles.text, textStyle]}>
        Pop or subtle. Day or night.
      </Animated.Text>
      <Animated.Text style={[styles.text, textStyle]}>
        Customize your interface.
      </Animated.Text>

      <ToggleButton onPress={toggleTheme} />
      <BottomNav />
    </Animated.View>
  );
};
