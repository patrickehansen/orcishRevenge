module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  plugins: [
    'promise',
    'react'
  ],
  extends: [
    'airbnb-base',
    "plugin:react/recommended"
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  settings: {
    react: {
      "createClass": "createReactClass",
      version: "16.12"
    },
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'max-len': ['error', 240],
    'no-console': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'no-await-in-loop': 'warn',
    'no-use-before-define': [
        'error',
        { functions: false, classes: false, variables: true },
    ],
    'no-underscore-dangle' : ['error', {allow: ['_id']}],
    "class-methods-use-this": ["error", { "exceptMethods": ["render", "componentDidMount"] }],
    'promise/always-return': 'error',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',
    'promise/no-native': 'off',
    'promise/no-nesting': 'warn',
    'promise/no-promise-in-callback': 'off',
    'promise/no-callback-in-promise': 'off',
    'promise/avoid-new': 'warn',
    'promise/no-new-statics': 'error',
    'promise/no-return-in-finally': 'warn',
    'promise/valid-params': 'warn',
    'promise/prefer-await-to-then': 'error',
  },
};
