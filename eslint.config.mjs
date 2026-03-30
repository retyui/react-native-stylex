import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-plugin-prettier/recommended";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import importSort from "eslint-plugin-simple-import-sort";
import ts from "typescript-eslint";
import R from "react/package.json" with { type: "json" };
import jest from "eslint-plugin-jest";
import reactNative from "@react-native/eslint-config";
import testingLibrary from "eslint-plugin-testing-library";

export default defineConfig(
  {
    // Note: there should be no other properties in this object
    // docs: https://eslint.org/docs/latest/use/configure/migration-guide#ignore-files
    ignores: [
      "examples/",
      "android/",
      "ios/",
      "coverage/",
      "docs/",
      ".yarn/",
      "node_modules/",
      "eslint.config.mjs",
      "src/__tests__/withStyles.types-test.tsx",
      "src/__tests__/makeUseStyles.types-test.ts",
      "src/__tests__/createBreakpointsMatcher.types-test.ts",
    ],
  },
  eslint.configs.recommended,
  ts.configs.strict,
  ts.configs.stylistic,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  {
    settings: {
      react: { version: R.version },
    },
  },
  reactHooks.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    ...jest.configs["flat/recommended"],
    ...jest.configs["flat/style"],
    files: ["**/*.test.{ts,tsx,js,jsx}"],
  },
  {
    ...testingLibrary.configs["flat/react"],
    files: ["**/*.test.{ts,tsx,js,jsx}"],
  },
  prettier, // Have to be in the end
  {
    plugins: {
      "simple-import-sort": importSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          // https://github.com/lydell/eslint-plugin-simple-import-sort#custom-grouping
          groups: [
            // Packages. `react` related packages come first.
            ["^react", "^@?\\w"],
            // Side effect imports.
            ["^\\u0000"],
            // Parent imports. Put `..` last.
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Other relative imports. Put same-folder imports and `.` last.
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          ],
        },
      ],
    },
  },
  {
    files: ["**/*.{js,ts,tsx}"],
    languageOptions: {
      globals: reactNative.globals,
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off", // allow to use `require()`
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    files: ["**/*.{js,ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-dynamic-delete": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/consistent-indexed-object-style": "off",
      "@typescript-eslint/ban-ts-comment": "off",
    },
  },
);
