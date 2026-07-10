module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  settings: { react: { version: "detect" } },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  rules: {
    // We don't use PropTypes (this is an app, not a shared library), and JSX
    // copy legitimately contains apostrophes/quotes routed through i18n.
    "react/prop-types": "off",
    "react/no-unescaped-entities": "off",
  },
  overrides: [
    {
      // Vitest exposes jest-compatible globals (globals: true in vite config).
      files: ["src/tests/**", "**/*.test.{js,jsx}", "src/setupTests.js"],
      globals: {
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        vi: "readonly",
      },
    },
  ],
};
