# Orientation 📲

#### `orientation({ portrait, landscape })`

This function given an object containing orientation variants as keys, returns the value for the orientation you are
currently. (inspired by [`Platform.select(...)`](https://facebook.github.io/reac-native/docs/platform-specific-code#platform-module))

#### `portraitOrientation(value)`

Return passed value when device in portrait orientation

#### `landscapeOrientation(value)`

Return passed value when device in landscape orientation

**Example:**

```js
import { makeUseStyles } from "react-native-stylex";
import {
  orientation,
  portraitOrientation,
  landscapeOrientation
} from "react-native-stylex/orientation";

const useStyles = makeUseStyles(() => ({
  cell: {
    backgroundColor: "red",
    ...orientation({
      portrait: { alignSelf: "flex-start" },
      landscape: { alignSelf: "flex-end" }
    })
  },
  row: {
    width: portraitOrientation(100)
  },
  root: {
    ...landscapeOrientation({
      top: 10,
      left: 10
    })
  }
}));
```
