import {makeUseStyles} from 'react-native-stylex';

export const useStyles = makeUseStyles(({palette}) => ({
  root: {
    alignSelf: 'center',
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 150,
    backgroundColor: palette.accent,
    marginBottom: 80,
  },
  overlay: {
    position: 'absolute',
    right: -20,
    top: -20,
    width: 145,
    height: 145,
    borderRadius: 150,
  },
}));
