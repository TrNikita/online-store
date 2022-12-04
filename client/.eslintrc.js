module.exports = {
  env: {
    browser: true,
    es2021: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'always'],
    'multiline-ternary': ['off'],
    indent: [0, 4],
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: false,
        avoidEscape: true,
      },
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
      },
    ],
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'never'],
    curly: ['error', 'multi', 'consistent'],
    'react/display-name': 'off',
    // 'no-console': 'error',
  },
};
