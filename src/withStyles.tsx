import React, {
  ComponentClass,
  ComponentProps,
  ComponentType,
  ExoticComponent,
  forwardRef,
  Ref,
  RefAttributes,
} from "react";

interface InjectedStyledProps<Styles> {
  styles: Styles;
}

export type InferInjectedStyledProps<
  Fn extends (...args: any) => any
> = InjectedStyledProps<ReturnType<Fn>>;

type InferRefType<T> = T extends ExoticComponent<infer Props>
  ? Props extends RefAttributes<infer RefType>
    ? RefType
    : never
  : T extends ComponentClass<any>
  ? InstanceType<T>
  : never;

export function withStyles<Styles>(useStyles: () => Styles) {
  function WithStyles<TComponent extends ComponentType<any>>(
    Component: TComponent
  ) {
    const WithStyles = (
      props: Omit<ComponentProps<TComponent>, "styles">,
      ref: Ref<InferRefType<TComponent>>
    ) => {
      const styles = useStyles();

      // @ts-expect-error: 'ref' as never
      return <Component {...props} ref={ref} styles={styles} />;
    };

    return forwardRef(WithStyles);
  }

  return WithStyles;
}
