/* eslint-disable react-hooks/rules-of-hooks */
import { makeUseStyles } from "./index";
{
  const useStyles = makeUseStyles(() => ({
    root: {
      // @ts-expect-error: invalid color value
      color: [],
    },
  }));
  const {
    _root,
    // @ts-expect-error: 'otherProps' not exist
    _otherProp,
  } = useStyles();
}
{
  const useStyles = makeUseStyles((theme) => ({
    root: {
      color: theme.color.red,
      // @ts-expect-error: 'blue' not exist in passed theme
      borderColor: theme.color.blue,
    },
  }));
  const {
    _root,
    // @ts-expect-error: 'otherProps' not exist
    _otherProp,
  } = useStyles();
}
