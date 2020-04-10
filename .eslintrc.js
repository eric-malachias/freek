module.exports = {
  env: {
    browser: false,
    es6: true,
  },
  extends: [
    'standard',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
  },
  overrides: [
    {
      files: ["**/*.ts"],
      rules: {
        "no-unused-vars": ["off"],
        "no-undef": ["off"],
        "no-useless-constructor": ["off"],
        "no-empty-function": ["off"],
        "default-case": ["off"],
        "class-methods-use-this": ["off"],
      },
    },
  ],
}
