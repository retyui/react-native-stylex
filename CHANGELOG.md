# Change Log

This project adheres to [Semantic Versioning](http://semver.org/).

# 4.2.0

- Update save-area types and use `initialMetrics` by default 


# 4.1.1

- Fix invalid import [#12](https://github.com/retyui/react-native-stylex/issues/12)

# 4.1.0

- Extend a [Media Query API](docs/media-query.md)
  - `createBreakpointsMatcher(...)` [#8](https://github.com/retyui/react-native-stylex/issues/8)
  - `createBreakpoints(...)`

# 4.0.0

- Optimize memory usage [#9](https://github.com/retyui/react-native-stylex/issues/9)

```js
// 4.x.x
useStyles() === useStyles(); // true
// 1.x.x - 3.x.x
useStyles() === useStyles(); // false
```

- Add [dimensions api](docs/dimensions.md)
- Improve [typescript support](docs/ts.md)
- Add tests for types
- Update dev dependencies

**Breaking changes:**

- Type `MakeUseStylesFn<TTheme>` was removed!
  Use [declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation) to define type for `Theme`.
  More info [typescript guide](docs/ts.md)...

# 3.1.0

- Replace custom module [react-native-appearance](https://github.com/expo/react-native-appearance) with core [react-native Appearance](https://reactnative.dev/docs/appearance)

# 3.0.0

- Add support for the latest [react-native-safe-area-context@1.0.0](https://github.com/th3rdwave/react-native-safe-area-context/releases/tag/v1.0.0) API
- Publish a compatible bundle
- Update dev deps

# 2.2.0

- Fix expo issue `Unable to resolve module 'module://EmitterSubscription.js'`

# 2.1.0

- Add integrations with [react-native-appearance](docs/appearance.md)

# 2.0.0

Deprecate first argument as object `makeUseStyles({ styles: {color: 'red'}})` now only functions allow `makeUseStyles (() => (({ styles: {color : 'red'}}))`

Improve memoization logic

Add integrations with third party modules\APIs:

- [react-native-safe-area](docs/safe-area.md)
- [react-native-dark-mode](docs/dark-mode.md)
- [Media Query](docs/media-query.md)
- [Orientation](docs/orientation.md)
- [i18n](docs/i18n.md)

# 1.1.3

- Improve recreating styles
- Added test
- Added helper type `MakeUseStylesFn`

# 1.1.1

- Fix a `makeUseStyles` function type definition

# 1.1.0

- Added a new helper hook`useColorTransition((theme: Theme) => string): AnimatedValue`

# 1.0.0

- Release
