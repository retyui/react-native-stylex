import * as React from "react";

export function withStyles<Styles extends Record<string, unknown>>(
  useStyles: () => Styles
) {
  return <
    Props extends Record<string, unknown>,
    C extends React.ComponentType<Props & { styles: Styles }>
  >(
    Component: C
  ) => {
    const WithStyles = (props: Props, ref: React.Ref<any>) => {
      const styles = useStyles();

      // @ts-ignore
      return <Component {...props} ref={ref} styles={styles} />;
    };

    return React.forwardRef<C, Props>(WithStyles);
  };
}
