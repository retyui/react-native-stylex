# react-native-stylex

Better styling for react-native

[![react-native-stylex on npm](https://badgen.net/npm/v/react-native-stylex)](http://www.npmjs.com/package/react-native-stylex)
[![react-native-stylex downloads](https://badgen.net/npm/dm/react-native-stylex)](https://www.npmtrends.com/react-native-stylex)
[![react-native-stylex bundle size](https://badgen.net/bundlephobia/minzip/react-native-stylex)](https://bundlephobia.com/result?p=react-native-stylex)
[![CI status](https://github.com/retyui/react-native-stylex/workflows/Node.js%20CI/badge.svg)](https://github.com/retyui/react-native-stylex/actions)

<div align="center"><img src="https://raw.githubusercontent.com/retyui/react-native-stylex/master/docs/logo.png" width="333"/></div>

### Module features:

- 📦 Very light and simple;
- ⚡️ Hooks \ HoC support;
- 🔋 Theming support;
- ⛱️ [Typescript support](docs/ts.md);
- 📝 [Easy integrated with Jest](docs/testting.md).

### Integrations

- 🛡️ [react-native-safe-area-view](docs/safe-area.md);
- 🗺 [i18n](docs/i18n.md);
- 🕳️ [Appearance (a.k.a Dark mode)](docs/appearance.md);
- 📐 [Dimensions](docs/dimensions.md);
- 📲 [Orientation](docs/orientation.md);
- 💉 [Media Queries](docs/media-query.md) support.

### Links

- [Documentation](docs/api.md);
- [Live demo](https://snack.expo.io/@retyui/react-native-stylex);
- [Example app](example/AppStyleX).

## Install

`react-native-stylex` requires react-native 0.59.0 or later.

#### 1️⃣ Add module

```sh
yarn add react-native-stylex

# or npm install react-native-stylex
```

#### 2️⃣ Add theme `<ThemeProvider/>`

Stylex provides component, which makes the theme available to the rest of your app:

```js
import { ThemeProvider } from "react-native-stylex";
import {
  createBreakpointsMatcher,
  createBreakpoints,
  maxWidth,
} from "react-native-stylex/media-query";

const breakpoints = {
  xs: 360,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};
const { up, down, only, between } = createBreakpoints(breakpoints);
const applyBreakpoints = createBreakpointsMatcher(breakpoints, maxWidth);

const theme = {
  palette: { textColor: "black" },
  breakpoints: { up, down, only, between, apply: applyBreakpoints },
  utils: {
    fade: (color, value) => {},
  },
};

const Root = () => (
  <ThemeProvider value={theme}>
    <App />
  </ThemeProvider>
);

export default Root;
```

#### 3️⃣ Create styles `makeUseStyles(...)`

Stylex provides a helper function to inject styles to your component.

Normally, you’ll use it in this way:

```js
import { makeUseStyles } from "react-native-stylex";
import { maxWidth } from "react-native-stylex/media-query";

export const useStyles = makeUseStyles(({ palette, utils, breakpoints }) => ({
  root: {
    color: utils.fade(palette.textColor, 0.5),
    height: 100,
    // On screens that are 320 or less, set the height to 69
    ...maxWidth(320, { height: 69 }),
  },

  text: {
    fontSize: 16, // default value
    ...breakpoints.down("lg", { fontSize: 18 }), // if window width 0..1280
    ...breakpoints.down("sm", { fontSize: 20 }), // if window width 0..600
  },

  // The same example that you see above but unsing a 'applyBreakpoints'
  title: {
    fontSize: breakpoints.apply({
      sm: 20, //      if window width 0....600
      lg: 18, //      if window width 601..1280
      default: 16, // if window width 1281...
    }),
  },
}));
```

#### 4️⃣ Inject styles `useStyles(...)` & `withStyles(...)`

And finally just use in component:

```js
import React, { Component } from "react";
import useStyles from "./styles";

// Functional component (hooks variant)
const Root = () => {
  const styles = useStyles();

  return <View style={styles.root} />;
};

export default Root;

//--------------------------------

// Class component (HOC variant)
class Root extends Component {
  render() {
    const { styles } = this.props;

    return <View style={styles.root} />;
  }
}

export default withStyles(useStyles)(Root);
```

### 5️⃣ Do you use a Typescript ?

- Look at [typescript](docs/ts.md) guide
