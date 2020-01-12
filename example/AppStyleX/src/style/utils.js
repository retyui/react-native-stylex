import Color from 'color';

export const utils = {
  fade: (color, alpha) =>
    Color(color)
      .alpha(alpha)
      .string(),
  isDark: color => Color(color).isDark(),
  lighten: (color, val) => Color(color).lighten(val),
  darken: (color, val) => Color(color).darken(val),
};
