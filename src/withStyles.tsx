import type { ComponentProps, ComponentRef, ComponentType, Ref } from "react";
import { forwardRef } from "react";

interface InjectedStyledProps<Styles> {
  styles: Styles;
}

export type InferInjectedStyledProps<Fn extends (...args: any) => any> =
  InjectedStyledProps<ReturnType<Fn>>;

export const withStyles = <Styles,>(useStyles: () => Styles) => {
  const WithStyles = <TComponent extends ComponentType<any>>(
    Component: TComponent,
  ) => {
    const renderComponent = (
      props: Omit<ComponentProps<TComponent>, "styles">,
      ref: Ref<ComponentRef<TComponent>>,
    ) => {
      "use memo";
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const styles = useStyles();
      // @ts-expect-error: 'ref' as never
      return <Component {...props} ref={ref} styles={styles} />;
    };

    // @ts-expect-error
    return forwardRef(renderComponent);
  };

  return WithStyles;
};
