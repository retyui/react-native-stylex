# Media Query support 💉

Available media conditions:

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
import { makeUseStyles } from "react-native-stylex";
import { minWidth } from "react-native-stylex/media-query";

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
  })
}));
```
