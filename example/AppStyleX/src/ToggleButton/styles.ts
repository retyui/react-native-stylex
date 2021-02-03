import {makeUseStyles} from 'react-native-stylex';
import {StyleSheet, Platform} from 'react-native';

export const ROOT_WIDTH = 280;

export const useStyles = makeUseStyles(({palette, utils}) => ({
  root: {
    marginTop: 36,
    alignSelf: 'center',
    height: 60,
    borderRadius: 60,
    width: ROOT_WIDTH,
    backgroundColor: utils.isDark(palette.bg)
      ? utils.lighten(palette.bg, 0.3)
      : utils.darken(palette.bg, 0.3),
  },
  activeBg: {
    width: '50%',
    height: '100%',
    borderRadius: 60,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: palette.bg,

    shadowColor: palette.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  labelsRoot: {
    ...StyleSheet.absoluteFillObject,
    // Hack for Android
    elevation: 5,
  },
  labelText: {
    position: 'absolute',
    height: '100%',
    width: '50%',
    top: 0,

    fontSize: 20,
    fontWeight: '700',
    color: utils.fade(palette.text, 0.5),
    textAlign: 'center',
    ...Platform.select({
      web: {
        lineHeight: 60,
      },
      default: {
        lineHeight: 55,
      },
    }),
  },
  lightLabelText: {
    left: 0,
  },
  darkLabelText: {
    right: 0,
  },
  activeLabelText: {
    color: palette.text,
  },
}));
