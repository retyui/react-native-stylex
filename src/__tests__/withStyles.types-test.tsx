import React, { FC, forwardRef } from "react";
import { TextInput } from "react-native";
import { InferInjectedStyledProps, withStyles } from "../withStyles";
import { makeUseStyles } from "../makeUseStyles";

{
  const useStyles = makeUseStyles(() => ({
    root: {
      color: "red",
    },
  }));

  interface Props extends InferInjectedStyledProps<typeof useStyles> {
    a: boolean;
  }

  function Component(props: Props): JSX.Element | null {
    props.styles.root.color = "";

    // @ts-expect-error 'a' not exists
    props.styles.a = {};

    return null;
  }

  const ComponentWithStyles = withStyles(useStyles)(Component);

  <ComponentWithStyles a={false} />;
  <ComponentWithStyles
    // @ts-expect-error: string is not a boolean
    a={"not bool"}
  />;

  <ComponentWithStyles
    a
    // @ts-expect-error: already ibjected by hook
    styles={{
      root: {},
    }}
  />;
}

{
  interface MyTheme {
    colors: {
      red: string;
    };
  }

  const useStyles = makeUseStyles((theme: MyTheme) => ({
    root: {
      color: theme.colors.red,
      // @ts-expect-error: 'gold' not exists
      borderColor: theme.colors.gold,
    },
  }));

  interface Props extends InferInjectedStyledProps<typeof useStyles> {
    a: boolean;
  }

  const WithRef = forwardRef<TextInput, Props>(function Component(
    props,
    ref
  ): JSX.Element | null {
    props.styles.root.color = "";

    // @ts-expect-error 'a' not exists
    props.styles.a = {};

    return <TextInput ref={ref} />;
  });

  const ComponentWithStylesAndRef = withStyles(useStyles)(WithRef);

  <ComponentWithStylesAndRef a={false} />;

  <ComponentWithStylesAndRef
    a={false}
    ref={(instance) => {
      instance?.focus();

      // @ts-expect-error 'abc' not exists
      instance?.abc();
    }}
  />;
  <ComponentWithStylesAndRef
    // @ts-expect-error: string is not a boolean
    a={"not bool"}
  />;

  <ComponentWithStylesAndRef
    a
    // @ts-expect-error: already ibjected by hook
    styles={{
      root: {},
    }}
  />;
}

{
  interface MyTheme {
    colors: {
      red: string;
    };
  }

  const useStyles = makeUseStyles((theme: MyTheme) => ({
    root: {
      color: theme.colors.red,
      // @ts-expect-error: 'gold' not exists
      borderColor: theme.colors.gold,
    },
  }));

  interface Props extends InferInjectedStyledProps<typeof useStyles> {
    a: boolean;
  }

  class MyCls extends React.Component<Props> {
    focus() {}
    render() {
      return null;
    }
  }

  const ComponentWithStylesAndRef = withStyles(useStyles)(MyCls);

  <ComponentWithStylesAndRef a={false} />;

  <ComponentWithStylesAndRef
    a={false}
    ref={(instance) => {
      instance?.focus();

      // @ts-expect-error 'abc' not exists
      instance?.abc();
    }}
  />;
  <ComponentWithStylesAndRef
    // @ts-expect-error: string is not a boolean
    a={"not bool"}
  />;

  <ComponentWithStylesAndRef
    a
    // @ts-expect-error: already ibjected by hook
    styles={{
      root: {},
    }}
  />;
}

{
  const useStyles = makeUseStyles(() => ({
    root: {
      color: "red",
    },
  }));

  interface Props extends InferInjectedStyledProps<typeof useStyles> {}

  const MyCmp: FC<Props> = () => null;

  const StyledMyCmp = withStyles(useStyles)(MyCmp);

  <StyledMyCmp
    ref={(e) => {
      // @ts-expect-error: StyledMyCmp doesn't have 'ref' type
      e?.aa();
    }}
  />;
}
