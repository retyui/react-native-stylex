# react-native styleX

<div align="center"><img src="https://cdn.rawgit.com/retyui/react-native-stylex/master/docs/logo.png" width="456"/></div>

Better styling for react-native

[![npm](https://img.shields.io/npm/v/react-native-stylex.svg)](https://www.npmjs.com/package/react-native-stylex)
[![npm downloads](https://img.shields.io/npm/dm/react-native-stylex.svg)](https://www.npmtrends.com/react-native-stylex)

### Module features:

- Very light and simple;
- Hooks support;
- Theming support;
- Typescript support;
- CSS Media Queries syntax.

### Links

- [Live demo](https://snack.expo.io/@retyui/react-native-stylex);
- [Example app](example/AppStyleX).

## Install

```sh
yarn add react-native-stylex

# or npm install react-native-stylex
```

## Theming support 🔋

You need wrap you'r root component with ThemeProvider and pass theme

```js
import { ThemeProvider } from "react-native-stylex";

const theme = {
  palette: {
    textColor: "black"
  },
  utils: {
    fade(color, value) {
      /*...*/
    }
  }
};

const App = () => (
  <ThemeProvider value={theme}>
    <Root />
  </ThemeProvider>
);

export default App;
```

Then use a `makeUseStyles` function and extract passed theme

```js
import { makeUseStyles, minWidth } from "react-native-stylex";

// Theme-dependent styles
const useStyles = makeUseStyles(({ palette, utils }) => ({
  root: {
    color: palette.textColor,
    ...minWidth(320, {
      color: utils.fade(palette.textColor, 0.7)
    })
  }
}));

const Root = () => {
  const styles = useStyles();

  return <View style={styles.root} />;
};
```

## Media Query support 💁‍♀️

Use a `makeUseStyles` function to create a hook function that can be used in react render flow

Available media conditions:

- `maxWidth(number, { })`
- `minWidth(number, { })`
- `minHeight(number, { })`
- `maxHeight(number, { })`

```js
import { makeUseStyles, minWidth, withStyles } from "react-native-stylex";

const useStyles = makeUseStyles({
  root: {
    height: 200,
    width: 200,
    ...minWidth(320, {
      height: 160,
      width: 160
    })
  },
  // Another syntax, `.row` property would be `null` or passed object
  row: minWidth(320, {
    height: 160,
    width: 160
  })
});

// Hooks variant
const Root = () => {
  const styles = useStyles();

  return <View style={styles.root} />;
};

// HOCs variant
const App = ({ styles }) => <View style={styles.row} />;

export default withStyles(useStyles)(App);
```

## Typescript support 🤔

First you need to create a own wrapper, it is easily do with `.d.ts` file

```typescript jsx
// ./theme.ts
const theme = {
  colors: { textColor: "black" }
};

export type MyTheme = typeof theme;

// ./my-stylex.js
export { makeUseStyles } from "react-native-stylex";

// .my-stylex.d.ts
import { MakeUseStylesFn } from "react-native-stylex";

import { Theme } from "./theme";

export const makeUseStyles: MakeUseStylesFn<Theme>;
```

Then you can easily use own wrapper to create styles that `100%` has type safety

```typescript jsx
import { makeUseStyles } from "./my-stylex";

const useStyles = makeUseStyles({ root: {} });

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
