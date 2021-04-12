module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    indent: ['error', 2],
    'no-console': ['error', { allow: ['error'] }],
    'no-else-return': 0,
    'no-unused-expressions': 0,
  },
};
