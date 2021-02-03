# Dimensions 📐

Nothing special just two helper functions that use [Dimensions](https://reactnative.dev/docs/dimensions) API

- `getWindowDimensions`
- `getScreenDimensions`

These functions return an object with the next properties:

```ts
width: number;
height: number;
scale: number;
fontScale: number;
```

**Example:**

```ts
import { makeUseStyles } from "react-native-stylex";
import { getWindowDimensions } from "react-native-stylex/dimensions";

export const useStyles = makeUseStyles(() => ({
  video: {
    width: getWindowDimensions().width,
    height: getWindowDimensions().width,
  },
}));
```
