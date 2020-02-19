# 2.0.0

Reduce bundle size
Deprecate first argument as object `makeUseStyles({ styles: {color: 'red'}})` now only functions allow `makeUseStyles (() => (({ styles: {color : 'red'}}))`  
Added new media query helpers:

- `aspectRatio(ratio: number,{/* styles */})`
- `maxAspectRatio(ratio: number,{/* styles */})`
- `minAspectRatio(ratio: number{/* styles */})`
- `orientation({ portrait: {},landscape: {} })`

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
