import { makeUseStyles } from "./index";
{
  const useStyles = makeUseStyles(() => ({
    root: {
      // @ts-expect-error: invalid color value
      color: [],
    },
  }));
  const {
    root,
    // @ts-expect-error: 'otherProps' not exist
    otherProp,
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
    root,
    // @ts-expect-error: 'otherProps' not exist
    otherProp,
  } = useStyles();
}
