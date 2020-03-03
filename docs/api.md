# API

Also read:

- [Media query](media-query.md)
- [Orientation](orientation.md)
- [I18n](i18n.md)
- [react-native-safe-area-view](safe-area.md)
- [react-native-dark-mode](dark-mode.md);
- [Typescript](ts.md);
- [Testing with Jest](testting.md).

Use a `makeUseStyles` function to create a hook function that can be used in react components

```typescript jsx
import { makeUseStyles } from "react-native-stylex";

const useStyles = makeUseStyles(theme => ({
  root: {
    color: theme.palette.xColor
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
import { makeUseStyles } from "react-native-stylex";
import { minWidth } from "react-native-stylex/media-query";

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
