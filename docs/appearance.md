# Appearance 🕳️

To start using integration with [react-native Appearance](https://reactnative.dev/docs/appearance) module, you need to use react-native [0.62.x](https://reactnative.dev/blog/2020/03/26/version-0.62#new-dark-mode-features).

> ⚠️ If you need to support React Native below `0.62.x`, please see [react-native-dark-mode](docs/dark-mode.md)

After that you can use special API:

- `appearance({ dark, light, default })`
- `darkAppearance(value)`
- `lightAppearance(value)`
- `noPreferenceAppearance(value)`

`dark` - The user prefers a dark color theme.
`light` - The user prefers a light color theme.
`default` - The user has not indicated a preferred color theme.

**Example:**

```typescript jsx
import { makeUseStyles } from "react-native-stylex";
import {
  appearance,
  darkAppearance,
  lightAppearance,
  noPreferenceAppearance,
} from "react-native-stylex/appearance";

export default makeUseStyles(() => ({
  root: {
    // you can pass styles
    ...appearance({
      dark: { color: "#fff", backgroundColor: "#000" },
      light: { color: "#000", backgroundColor: "#fff" },
    }),

    // or string value for property
    backgroundColor: appearance({ dark: "#000", light: "#fff" }),
  },
  cell: {
    // styles variant
    ...lightAppearance({ color: "#000" }),
    // specific value variant
    backgroundColor: lightAppearance("#fff"),
  },

  row: {
    // styles variant
    ...darkAppearance({ color: "#000" }),
    // specific value variant
    backgroundColor: darkAppearance("#fff"),
  },
}));
```
