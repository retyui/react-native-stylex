# Appearance 🕳️

To start using integration with [react-native-appearance](https://github.com/expo/react-native-appearance) module
, you need to install it. [Follow the instructions in the README](https://github.com/expo/react-native-appearance).

After that you can use special API:

- `appearance({ dark, light })`
- `darkAppearance(value)`
- `lightAppearance(value)`

**Example:**

```typescript jsx
import { makeUseStyles } from "react-native-stylex";
import {
  appearance,
  darkAppearance,
  lightAppearance,
  noPreferenceAppearance
} from "react-native-stylex/appearance";

export default makeUseStyles(() => ({
  root: {
    // you can pass styles
    ...appearance({
      dark: { color: "#fff", backgroundColor: "#000" },
      light: { color: "#000", backgroundColor: "#fff" }
    }),

    // or string value for property
    backgroundColor: appearance({ dark: "#000", light: "#fff" })
  },
  cell: {
    // styles variant
    ...lightAppearance({ color: "#000" }),
    // specific value variant
    backgroundColor: lightAppearance("#fff")
  },

  row: {
    // styles variant
    ...darkAppearance({ color: "#000" }),
    // specific value variant
    backgroundColor: darkAppearance("#fff")
  }
}));
```
