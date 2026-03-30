import type {
  ComponentProps,
  ComponentRef,
  ComponentType,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from "react";
import { forwardRef } from "react";

interface InjectedStyledProps<Styles> {
  styles: Styles;
}

export type InferInjectedStyledProps<Fn extends (...args: any) => any> =
  InjectedStyledProps<ReturnType<Fn>>;

export const withStyles = <Styles,>(useStyles: () => Styles) => {
  const WithStyles = <TComponent extends ComponentType<any>>(
    Component: TComponent,
  ): ForwardRefExoticComponent<
    PropsWithoutRef<Omit<ComponentProps<TComponent>, "styles">> &
      RefAttributes<ComponentRef<TComponent>>
  > => {
    const WithStylesComponent = (props: any, ref: any) => {
      "use memo";
      const styles = useStyles();
      return <Component {...props} ref={ref} styles={styles} />;
    };
    return forwardRef(WithStylesComponent);
  };

  return WithStyles;
};
