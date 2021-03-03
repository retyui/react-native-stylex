# Media Query support 💉

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [High level api](#high-level-api)
  - [`createBreakpoints(breakpoints)`](#createbreakpointsbreakpoints)
  - [`createBreakpointsMatcher(breakpoints, matcherFunction)`](#createbreakpointsmatcherbreakpoints-matcherfunction)
  - [Inject into theme](#inject-into-theme)
- [Core media conditions:](#core-media-conditions)
  - [`maxWidth(width: number, {/* styles */})`](#maxwidthwidth-number--styles-)
  - [`minWidth(width: number, {/* styles */})`](#minwidthwidth-number--styles-)
  - [`maxHeight(height: number, {/* styles */})`](#maxheightheight-number--styles-)
  - [`minHeight(height: number, {/* styles */})`](#minheightheight-number--styles-)
  - [`aspectRatio(ratio: number, {/* styles */})`](#aspectratioratio-number--styles-)
  - [`maxAspectRatio(ratio: number, {/* styles */})`](#maxaspectratioratio-number--styles-)
  - [`minAspectRatio(ratio: number, {/* styles */})`](#minaspectratioratio-number--styles-)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## High level api

#### `createBreakpoints(breakpoints)`

Media queries are the idiomatic approach to make your UI responsive.

```ts
import { createBreakpoints } from "react-native-stylex/media-query";

const config = {
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

const breakpoints = createBreakpoints(config);

breakpoints.up("sm", value);
breakpoints.down("md", value);
breakpoints.only("lg", value);
breakpoints.between("sm", "lg", value);
```

- `breakpoints.down<T>(key: string, value: T): T | null`

  A media query matches screen widths less than and including the screen size given by the breakpoint key.

  ```ts
  makeUseStyles(() => ({
    text: {
      fontSize: 16,

      // Match: [0, sm, md, lg] xl, ∞
      //        [0........1280]
      ...breakpoints.down("lg", { fontSize: 18 }),

      // Match: [0,   sm] md, lg, xl, ∞
      //        [0...600]
      ...breakpoints.down("sm", { fontSize: 20 }),
    },
  }));
  ```

- `breakpoints.up<T>(key: string, value: T): T | null`
  A media query which matches screen widths greater than and including the screen size given by the breakpoint key.

  ```ts
  makeUseStyles(() => ({
    text: {
      fontSize: 20,

      // Match: 0, [sm, md, lg, xl, ∞]
      //           [600.............∞]
      ...breakpoints.up("sm", { fontSize: 18 }),

      // Match: 0, sm, md, [lg, xl, ∞]
      //                   [1280....∞]
      ...breakpoints.up("lg", { fontSize: 16 }),
    },
  }));
  ```

- `breakpoints.only<T>(key: string, value: T): T | null`
  A media query which matches screen widths including the screen size given by the breakpoint key.

  ```ts
  makeUseStyles(() => ({
    text: {
      fontSize: 16,

      // Match: 0, sm, [md,     lg], xl, ∞
      //               [960...1280]
      ...breakpoints.only("md", { fontSize: 20 }),
    },
  }));
  ```

- `breakpoints.between<T>(start: string, end: string, value: T): T | null`
  A media query which matches screen widths greater than the screen width given by the breakpoint key in the first argument and less than the screen width given by the breakpoint key in the second argument

  ```ts
  makeUseStyles(() => ({
    text: {
      fontSize: 16,

      // Match: 0, [sm, md, lg], xl, ∞
      //           [600...1280]
      ...breakpoints.between("sm", "lg", { fontSize: 20 }),
    },
  }));
  ```

---

#### `createBreakpointsMatcher(breakpoints, matcherFunction)`

- `breakpoints: { [key: string]: number }` - object where keys have string type and values positive number
- `matcherFunction: ` - optional, (by default `minWidth`). One of the media query matcher function (maxAspectRatio, maxHeight, maxWidth, minAspectRatio, minHeight, minWidth)

To easily **understand** and **debug** you can use a [CSS analog](https://codepen.io/retyui/pen/dyOzKzV) of implementation `createBreakpointsMatcher` ([video preview...](https://user-images.githubusercontent.com/4661784/108605405-92456780-73bc-11eb-9ec1-eb2e765c4164.mp4))

**Example:**

```tsx
import {
  createBreakpointsMatcher,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  minAspectRatio,
  maxAspectRatio,
} from "react-native-stylex/media-query";

const applyBreakpoints = createBreakpointsMatcher(
  {
    // breakpoints config
    xxs: 320,
    xs: 480,
    s: 640,
    m: 768,
    l: 1024,
    xl: 1200,
    xxl: 1920,
  },
  matcherFunction // Optional matcher function (be default 'minWidth')
);

/*
 * ⚠ Pay attention that result of this function depends on the passed matcher function (mix\max)!
 * ⬇️ See below to understand a difference ⬇️
 */
const useStyles = makeUseStyles(() => ({
  text: {
    // !!! ⚠ WHEN 'matcherFunction' is 'maxWidth' ⚠ !!!
    // if window width 0....320  => fontSize: 20
    // if window width 321..480  => fontSize: 18
    // if window width 481...    => fontSize: 16
    fontSize: applyBreakpoints({
      default: 16,
      xs: 18,
      xxs: 20,
    }),
  },

  title: {
    // !!! ⚠ WHEN 'matcherFunction' is 'minWidth' ⚠ !!!
    // if window width 0....319  => fontSize: 20
    // if window width 320..479  => fontSize: 18
    // if window width 480..     => fontSize: 16
    fontSize: applyBreakpoints({
      xs: 16,
      xxs: 18,
      default: 20,
    }),
  },
}));
```

#### Inject into theme

> ⚠️ Note: I recommend you to add created breakpoints functions to your theme, and use them directly without importing

**Example:**

```ts
// theme.ts
const config = { sm: 360, md: 600 /*...*/ };
const breakpoints = createBreakpoints(config);
const applyBreakpoints = createBreakpointsMatcher(config, matcherFunction);

const theme = {
  pallete: { white: "#fff" /*...*/ },
  breakpoints,
  applyBreakpoints,
};

// -----------------------------------------------
// styles.ts
const useStyles = makeUseStyles(({ applyBreakpoints }) => ({
  root: {
    fontSize: utils.applyBreakpoints({
      xxs: 20,
      xs: 18,
      default: 16,
    }),
  },
}));
```

---

## Core media conditions:

#### `maxWidth(width: number, {/* styles */})`

Return styles when a window width is equal or less than passed `width`

#### `minWidth(width: number, {/* styles */})`

Return styles when a window width is equal or greater than passed `width`

#### `maxHeight(height: number, {/* styles */})`

Return styles when window height is equal or less than passed `height`

#### `minHeight(height: number, {/* styles */})`

Return styles when window height is equal or greater than passed `height`

#### `aspectRatio(ratio: number, {/* styles */})`

Return styles when a window aspect ratio is the same as a passed `ratio`

#### `maxAspectRatio(ratio: number, {/* styles */})`

Return styles when a window aspect ratio is equal or less than passed `ratio`

#### `minAspectRatio(ratio: number, {/* styles */})`

Return styles when a window aspect ratio is equal or greater than passed `ratio`

**Example:**

```js
import { makeUseStyles } from "react-native-stylex";
import { minWidth } from "react-native-stylex/media-query";

const useStyles = makeUseStyles(() => ({
  root: {
    // default styles
    height: 200,
    width: 200,

    ...minWidth(320, {
      // if window width MORE then 320 apply next stylex
      height: 160,
      width: 160,
    }),
  },
  panel: {
    // default styles
    height: 200,
    width: 200,

    ...maxWidth(320, {
      // if window width LESS then 320 apply next stylex
      height: 160,
      width: 160,
    }),
  },
}));
```
