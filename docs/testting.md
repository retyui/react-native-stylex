# Writing tests 📝

## Using [Jest](https://jestjs.io/) for testing?

You should just use `<Provider>` and manually pass theme as a prop to every component that use `useStyles()` in unit tests

**./testing.js**

```js
import React from "react";
import { ThemeProvider } from "react-native-stylex";

import { defaultTheme } from "./my-theme";

export const MockThemeProvider = (props) => (
  <ThemeProvider {...props} value={defaultTheme} />
);
```

**./MyComponent.text.js**

```js
import React from "react";
import TestRenderer from "react-test-renderer";
import { MockThemeProvider } from "./testing";
import MyComponent from "./MyComponent";

const testRenderer = TestRenderer.create(
  <MockThemeProvider>
    <MyComponent />
  </MockThemeProvider>
);

//...
```

## Troubleshooting

### **`SyntaxError: Unexpected token export\import` in react-native-stylex/...**

You need to point Jest to transform this package. You can do so, by adding module path to `transformIgnorePatterns` setting in Jest's configuration.

```json
{
  "jest": {
    "transformIgnorePatterns": [
      "node_modules/(?!(react-native-stylex|react-native-other-module)/)"
    ]
  }
}
```
