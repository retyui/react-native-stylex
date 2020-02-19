# API

Also read:

- [Typescript support](ts.md);
- [Testing](testting.md).

## Media Query support 💉

Use a `makeUseStyles` function to create a hook function that can be used in react components

Available media conditions:

#### `orientation({ portrait: {/* styles */},landscape: {/* styles */} })`

This function given an object containing orientation variants as keys, returns the value for the orientation you are
currently. (inspired by [`Platform.select(...)`](https://facebook.github.io/reac-native/docs/platform-specific-code#platform-module))

#### `maxWidth(width: number, {/* styles */})`

Returns styles when a window width is equal or less than passed `width`

#### `minWidth(width: number, {/* styles */})`

Returns styles when a window width is equal or greater than passed `width`

#### `maxHeight(height: number, {/* styles */})`

Returns styles when window height is equal or less than passed `height`

#### `minHeight(height: number, {/* styles */})`

Returns styles when window height is equal or greater than passed `height`

#### `aspectRatio(ratio: number, {/* styles */})`

Returns styles when a window aspect ratio is the same as a passed `ratio`

#### `maxAspectRatio(ratio: number, {/* styles */})`

Returns styles when a window aspect ratio is equal or less than passed `ratio`

#### `minAspectRatio(ratio: number, {/* styles */})`

Returns styles when a window aspect ratio is equal or greater than passed `ratio`

**Example:**

```js
import { makeUseStyles, minWidth, orientation } from "react-native-stylex";

const useStyles = makeUseStyles(() => ({
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
  }),
  cell: {
    backgroundColor: "red",
    ...orientation({
      portrait: { alignSelf: "flex-start" }
    })
  }
}));
```

## Using styles 🧲

You can use styles in function or class components:

```js
import React, { Component } from "react";
import useStyles from "./styles";

// Functional component (hooks variant)
const Root = () => {
  const styles = useStyles();

  return <View style={styles.root} />;
};

export default Root;

// ----------------------------
// Class component (HOC variant)
class Root extends Component {
  render() {
    const { styles } = this.props;

    return <View style={styles.row} />;
  }
}

export default withStyles(useStyles)(Root);
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

Then use a `makeUseStyles` function and extract passed theme ⚡️

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
