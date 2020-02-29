import React, {useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';

import useIsDark from '../style/hooks/useIsDark';
import useAnimatedBgColor from '../style/hooks/useAnimatedBgColor';

import useStyles from './styles';

const {Value, timing} = Animated;

const Circle = () => {
  const styles = useStyles();
  const bgStyle = useAnimatedBgColor();
  const isDarkTheme = useIsDark();
  const animatedCircle = useRef(new Value(0));
  const animatedStyle = {
    transform: [
      {
        translateX: animatedCircle.current.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
        }),
      },
      {
        translateY: animatedCircle.current.interpolate({
          inputRange: [0, 1],
          outputRange: [-100, 0],
        }),
      },
      {
        scale: animatedCircle.current.interpolate({
          inputRange: [0, 1],
          outputRange: [0.01, 1],
        }),
      },
    ],
  };

  useEffect(() => {
    timing(animatedCircle.current, {
      useNativeDriver: false,
      toValue: isDarkTheme ? 1 : 0,
      duration: 250,
    }).start();
  }, [isDarkTheme]);

  return (
    <View style={styles.root}>
      <View style={styles.circle} />
      <Animated.View style={[styles.overlay, animatedStyle, bgStyle]} />
    </View>
  );
};

export default Circle;
