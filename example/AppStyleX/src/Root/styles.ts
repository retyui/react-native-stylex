import {makeUseStyles} from 'react-native-stylex';

export const useStyles = makeUseStyles(() => ({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 16,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  },
}));
