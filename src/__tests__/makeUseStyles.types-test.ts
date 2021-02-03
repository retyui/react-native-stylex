import { makeUseStyles } from "../makeUseStyles";

{
  const useStyles = makeUseStyles(() => ({
    root: {
      textAlign: "center",
    },
  }));

  const a: "center" = useStyles().root.textAlign;

  // @ts-expect-error: expect literal type
  const b: "not center" = useStyles().root.textAlign;
}

{
  interface Theme {
    color: string;
  }

  const useStyles = makeUseStyles(({ color }: Theme) => ({
    root: {
      color,
      textAlign: "center",
    },
  }));

  const a: "center" = useStyles().root.textAlign;

  // @ts-expect-error: expect literal type
  const b: "not center" = useStyles().root.textAlign;
}

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
  interface MyTheme {
    color: {
      red: string;
    };
  }

  const useStyles = makeUseStyles((theme: MyTheme) => ({
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
