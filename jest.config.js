const { resolve } = require('path');
const { name: displayName } = require('./package');

const transformIgnore = [
  'react-native',
  '@react-native-community/async-storage',
  'react-native-fast-image',
  'rollbar-react-native',
  'react-native-stylex',
];

module.exports = {
  displayName,
  testEnvironment: 'jsdom',
  cacheDirectory: resolve(__dirname, './node_modules/.jestcache'),
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '\\.test\\.(js|ts)x?$',
  coverageThreshold: {
    global: { branches: 100, functions: 100, statements: 100 },
  },
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/$1',
  },
  coveragePathIgnorePatterns: ['/node_modules/', '(.*)/styles.ts'],
  transformIgnorePatterns: [`node_modules/(?!(${transformIgnore.join('|')})/)`],
};
