import React, { ComponentType, forwardRef, Ref } from "react";

export function withStyles<Styles extends {}>(useStyles: () => Styles) {
  return <
    Props extends {},
    C extends ComponentType<Props & { styles: Styles }>
  >(
    Component: C
  ) => {
    const WithStyles = (props: Props, ref: Ref<any>) => {
      const styles = useStyles();

      // @ts-ignore
      return <Component {...props} ref={ref} styles={styles} />;
    };

    return forwardRef<C, Props>(WithStyles);
  };
}
