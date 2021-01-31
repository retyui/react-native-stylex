const { resolve } = require("path");
const { name: displayName } = require("./package");

module.exports = {
  displayName,
  testEnvironment: "jsdom",
  preset: "react-native",
  cacheDirectory: resolve(__dirname, "./node_modules/.jestcache"),
  moduleFileExtensions: ["ts", "tsx", "js"],
  testRegex: "\\.test\\.(js|ts)x?$",
  coveragePathIgnorePatterns: ["init.ts"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      statements: 100,
    },
  },
};
