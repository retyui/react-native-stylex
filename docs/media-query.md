# Media Query support 💉

High level api

#### `createBreakpointsMatcher(breakpoints, matcherFunction)`

- `breakpoints: { [key: string]: number }` - object where keys have string type and values positive number
- `matcherFunction: ` - optional, (by default `minWidth`). One of the media query matcher function (maxAspectRatio, maxHeight, maxWidth, minAspectRatio, minHeight, minWidth)

To easily **understand** and **debug** you can use a [CSS analog](https://codepen.io/retyui/pen/dyOzKzV) of implementation `createBreakpointsMatcher` (see [video...](https://user-images.githubusercontent.com/4661784/108605405-92456780-73bc-11eb-9ec1-eb2e765c4164.mp4))

Example:

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
    // if window width 480..321  => fontSize: 18
    // if window width 481...    => fontSize: 16
    fontSize: applyBreakpoints({
      xxs: 20,
      xs: 18,
      default: 16,
    }),
  },

  title: {
    // !!! ⚠ WHEN 'matcherFunction' is 'minWidth' ⚠ !!!
    // if window width 0....319  => fontSize: 20
    // if window width 320..479  => fontSize: 18
    // if window width 480..     => fontSize: 16
    fontSize: applyBreakpoints({
      xxs: 18,
      xs: 16,
      default: 20,
    }),
  },
}));
```

> ⚠️ I recommend you to add created breakpoints functions to your theme utils, and use them directly without importing

```ts
// theme.ts
const applyBreakpoints = createBreakpointsMatcher(/*...*/);

const theme = {
  utils: { applyBreakpoints },
};

// -----------------------------------------------
// styles.ts
const useStyles = makeUseStyles(({ utils }) => ({
  root: {
    fontSize: utils.applyBreakpoints({
      xxs: 20,
      xs: 18,
      default: 16,
    }),
  },
}));
```

Available media conditions:

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
