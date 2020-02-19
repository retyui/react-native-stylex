# Typescript support ⛱️

First you need to create a own wrapper, it is easily do with `.d.ts` file

**./theme.ts**

```typescript jsx
export const theme = {
  colors: { textColor: "black" }
};

export type MyTheme = typeof theme;
```

**./my-stylex.js**

```js
export { makeUseStyles } from "react-native-stylex";
```

**./.my-stylex.d.ts**

```typescript jsx
import { MakeUseStylesFn } from "react-native-stylex";

import { Theme } from "./theme";

export const makeUseStyles: MakeUseStylesFn<Theme>;
```

---

Then you can easily use own wrapper to create styles that `100%` has type safety

```typescript jsx
import { makeUseStyles } from "./my-stylex";

const useStyles = makeUseStyles(() => ({ root: {} }));

useStyles().root;
// Error: Property 'rootXX' does not exist on type '{ root: {}; }'.
useStyles().rootXX;

makeUseStyles(({ colors }) => ({
  root: {
    color: colors.textColor,
    // Error: Property 'bgColor' does not exist on type '{ textColor: string; }'.
    backgroundColor: colors.bgColor
  }
}));
```
