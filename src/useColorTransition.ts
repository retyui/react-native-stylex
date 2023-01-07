import { useEffect, useMemo, useRef } from "react";
import { Animated } from "react-native";
import { DefaultTheme } from "./DefaultTheme";
import { useTheme } from "./useTheme";

const { Value, timing } = Animated;

const INITIAL_VALUE = 0;
const defaultOptions = { duration: 250 };

export function useColorTransition<Theme = DefaultTheme>(
  colorGetterFn: (theme: Theme) => string,
  options = defaultOptions
): Animated.AnimatedInterpolation<string> {
  const theme = useTheme<Theme>();
  const currentColor = colorGetterFn(theme);
  const animatedValue = useRef(new Value(INITIAL_VALUE));
  const colors = useRef({
    toValue: INITIAL_VALUE,
    prev: currentColor,
    current: currentColor,
  });

  if (currentColor !== colors.current.current) {
    colors.current = {
      toValue: colors.current.toValue === 0 ? 1 : 0,
      prev: colors.current.current,
      current: currentColor,
    };
  }

  const { toValue, prev, current } = colors.current;

  useEffect(() => {
    timing(animatedValue.current, {
      toValue,
      useNativeDriver: false,
      ...options,
    }).start();
  }, [toValue]);

  return useMemo(() => {
    const outputRange = toValue === 1 ? [prev, current] : [current, prev];

    return animatedValue.current.interpolate({
      inputRange: [0, 1],
      outputRange,
    });
  }, [prev, current]);
}
