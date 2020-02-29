# 2.0.0

Deprecate first argument as object `makeUseStyles({ styles: {color: 'red'}})` now only functions allow `makeUseStyles (() => (({ styles: {color : 'red'}}))`

Improve memoization logic

Add integrations with third party modules\APIs:

- [media-query](docs/media-query.md)
- [orientation](docs/orientation.md)
- [react native safe area](docs/safe-area.md)
- [react native dark mode](docs/safe-area.md)
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
