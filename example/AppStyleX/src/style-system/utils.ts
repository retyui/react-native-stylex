import Color from 'color';

export const utils = {
  isDark: (color: string): boolean => Color(color).isDark(),
  fade: (color: string, alpha: number): string =>
    Color(color).alpha(alpha).string(),
  lighten: (color: string, val: number): string =>
    Color(color).lighten(val).string(),
  darken: (color: string, val: number): string =>
    Color(color).darken(val).string(),
};
