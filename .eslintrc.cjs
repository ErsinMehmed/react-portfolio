module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  settings: { react: { version: "detect" } },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  rules: {
    // We don't use PropTypes (this is an app, not a shared library, and
    // TypeScript already checks prop shapes at compile time), and JSX copy
    // legitimately contains apostrophes/quotes routed through i18n.
    "react/prop-types": "off",
    "react/no-unescaped-entities": "off",
    // Defer to the TS-aware version of this rule so type-only imports and
    // destructured-but-unused rest siblings aren't flagged incorrectly.
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
  },
  overrides: [
    {
      // Vitest exposes jest-compatible globals (globals: true in vite config).
      files: ["src/tests/**", "**/*.test.{ts,tsx}", "src/setupTests.ts"],
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
