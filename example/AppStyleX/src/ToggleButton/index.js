import React, {useEffect, useRef} from 'react';
import {Animated, View, TouchableWithoutFeedback, Text} from 'react-native';
import {useColorTransition} from 'react-native-stylex';

import useIsDark from '../style/hooks/useIsDark';

import useStyles, {ROOT_WIDTH} from './styles';

const {Value, spring} = Animated;
const HALF_ROOT_WIDTH = ROOT_WIDTH / 2;

const ToggleButton = ({onPress}) => {
  const styles = useStyles();
  const isDark = useIsDark();
  const bgStyle = {
    backgroundColor: useColorTransition(({palette}) => palette.bg),
  };
  const animatedOffset = useRef(new Value(0));
  const animatedStyle = {
    transform: [
      {
        translateX: animatedOffset.current.interpolate({
          inputRange: [0, 1],
          outputRange: [0, HALF_ROOT_WIDTH],
        }),
      },
    ],
  };

  useEffect(() => {
    spring(animatedOffset.current, {
      toValue: isDark ? 1 : 0,
      duration: 250,
    }).start();
  }, [isDark]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.root}>
        <Animated.View style={[styles.activeBg, animatedStyle, bgStyle]} />
        <View style={styles.labelsRoot}>
          <Text
            style={[
              styles.labelText,
              styles.lightLabelText,
              !isDark && styles.activeLabelText,
            ]}>
            Light
          </Text>
          <Text
            style={[
              styles.labelText,
              styles.darkLabelText,
              isDark && styles.activeLabelText,
            ]}>
            Dark
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ToggleButton;
