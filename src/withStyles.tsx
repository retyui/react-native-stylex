/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  ComponentProps,
  ComponentType,
  forwardRef,
  Ref,
  ElementRef
} from "react";

interface InjectedStyledProps<Styles> {
  styles: Styles;
}

export type InferInjectedStyledProps<
  Fn extends (...args: any) => any
> = InjectedStyledProps<ReturnType<Fn>>;

export function withStyles<Styles>(useStyles: () => Styles) {
  function WithStyles<TComponent extends ComponentType<any>>(
    Component: TComponent
  ) {
    const renderComponent = (
      props: Omit<ComponentProps<TComponent>, "styles">,
      ref: Ref<ElementRef<TComponent>>
    ) => {
      const styles = useStyles();
      // @ts-expect-error: 'ref' as never
      return <Component {...props} ref={ref} styles={styles} />;
    };

    return forwardRef(renderComponent);
  }

  return WithStyles;
}
