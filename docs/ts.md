# Typescript support ⛱️

### DefaultTheme

TypeScript definitions for stylex can be extended by using [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) since version `v4.1.4` of the definitions.

So the first step is creating a declarations file. Let's name it `stylex.d.ts` for example.

**./theme.ts**

```ts
export const theme = {
  colors: { textColor: "black" },
};

export type MyTheme = typeof theme;
```

**./stylex.d.ts**

```ts
import "react-native-stylex";
import type { MyTheme } from "./theme";

declare module "react-native-stylex" {
  export interface DefaultTheme extends MyTheme {}
}
```

`DefaultTheme` is being used as an interface of `makeUseStyles(theme => ...)` out of the box.

By default, the interface DefaultTheme is empty so that's why we need to extend it.

---

### `withStyles()` HoC

To make life developer easy was added helper type `InferInjectedStyledProps<TFunc>`

```ts
const useStyles2 = makeUseStyles(() => ({
  cell: { width: 10 },
  root: { color: "red" },
}));

// {
//   styles: {
//     root: {...},
//     cell: {...}
//   }
// }  <==> InferInjectedStyledProps<typeof useStyles>
```

So final result should be looks like that:

**Example:**

```tsx
import React, { Ref, forwardRef } from "react";
import { TextInput } from "react-native";
import {
  makeUseStyles,
  withStyles,
  InferInjectedStyledProps,
} from "react-native-stylex";

const useStyles = makeUseStyles(() => ({
  root: {
    color: "red",
  },
}));

interface Props extends InferInjectedStyledProps<typeof useStyles> {
  value?: string;
}

function MyComponent(props: Props) {
  return <TextInput style={props.styles.root} value={props.value} />;
}

const Styled = withStyles(useStyles)(MyComponent);

<Styled
  value="str"
  // @ts-expect-error: 'styles' Already injected
  styles={{}}
/>;
```

> ⚠️ Ref support by default!

In `4.x.x` version was improved type detection for 'ref'

it works well with class and functional components

```tsx
const MyFnc = forwardRef<TextInput, Props>((props, ref) => (
  <TextInput ref={ref} style={props.styles.root} />
));

class MyTextInput extends React.Component<Props> {
  scrollTo() {}
}

const StyledCls = withStyles(useStyles)(MyTextInput);
const StyledFnc = withStyles(useStyles)(MyFnc);

<StyledCls
  ref={(instance) => {
    instance?.scrollTo();
  }}
/>;

<StyledFnc
  ref={(instance) => {
    instance?.blur();
  }}
/>;
```
