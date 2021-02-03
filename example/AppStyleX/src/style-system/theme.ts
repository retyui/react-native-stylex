import {lightPalette, darkPalette} from './palette';
import {utils} from './utils';

export const lightTheme = {
  palette: lightPalette,
  utils,
};

export type Theme = typeof lightTheme;

export const darkTheme: Theme = {
  palette: darkPalette,
  utils,
};
