# 🛡️ Safe area

It is really useful for fixed elements on screen

<img src="https://cdn.dribbble.com/users/261602/screenshots/5947654/bottom_search.png" width="500" />


To start using integration with [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context) module

You need install it using [instructions](https://github.com/th3rdwave/react-native-safe-area-context#getting-started)!

Then you need to render `<StylexSaveAreaConsumer/>` inside `SafeAreaProvider`.

```typescript jsx
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StylexSaveAreaConsumer } from "react-native-stylex/safe-area";

import App from "./App";

const Root = () => {
  return (
    <SafeAreaProvider>
      <App />
      <StylexSaveAreaConsumer />
    </SafeAreaProvider>
  );
};
```

Or you can use custom `SafeAreaProvider` from stylex

```typescript jsx
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-stylex/safe-area";

import App from "./App";

const Root = () => {
  return (
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  );
};
```

After that you can use `getSafeArea()` method to get edge insets

**Example:**

```typescript jsx
import { makeUseStyles } from "react-native-stylex";
import { getSafeArea } from "react-native-stylex/safe-area";

export default makeUseStyles(() => ({
  fixedButton: {
    position: "absolute",
    start: 20,
    bottom: 30 + getSafeArea().bottom
  }
}));
```
