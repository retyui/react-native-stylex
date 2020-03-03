# Dark mode 🕳️

To start using integration with [react-native-dark-mode](https://github.com/codemotionapps/react-native-dark-mode) module

You need just install it using [instructions](https://github.com/codemotionapps/react-native-dark-mode#installation)!

After that you can use special API:

- `uiMode({ dark, light })`
- `darkUiMode(value)`
- `lightUiMode(value)`

**Example:**

```typescript jsx
import { makeUseStyles } from "react-native-stylex";
import { uiMode, darkUiMode, lightUiMode } from "react-native-stylex/dark-mode";

export default makeUseStyles(() => ({
  root: {
    // you can pass styles
    ...uiMode({
      dark: { color: "#fff", backgroundColor: "#000" },
      light: { color: "#000", backgroundColor: "#fff" }
    }),

    // or string value for property
    backgroundColor: uiMode({ dark: "#000", light: "#fff" })
  },
  cell: {
    // styles variant
    ...lightUiMode({ color: "#000" }),
    // specific value variant
    backgroundColor: lightUiMode("#fff")
  },

  row: {
    // styles variant
    ...darkUiMode({ color: "#000" }),
    // specific value variant
    backgroundColor: darkUiMode("#fff")
  }
}));
```
