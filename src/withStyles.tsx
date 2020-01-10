import React, { ComponentType, FC, forwardRef, Ref } from "react";

function withStyles<Styles extends {}>(useStyles: () => Styles) {
  return <Props extends {}>(
    Component: ComponentType<
      Props & {
        styles: Styles;
      }
    >
  ): FC<Props> => {
    const WithStyles = (props: Props, ref: Ref<any>) => {
      const styles = useStyles();

      return <Component {...props} ref={ref} styles={styles} />;
    };

    // @ts-ignore
    return forwardRef(WithStyles);
  };
}

export default withStyles;
