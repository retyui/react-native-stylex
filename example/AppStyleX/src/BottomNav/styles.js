import {makeUseStyles} from 'react-native-stylex';

export default makeUseStyles({
  skipBtn: {
    position: 'absolute',
    left: 20,
    bottom: 30,
    fontSize: 20,
  },
  nextButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 48,
    height: 48,
    borderRadius: 48,
    fontSize: 36,
    lineHeight: 42,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
