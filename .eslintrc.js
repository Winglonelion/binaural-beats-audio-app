// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: ['expo', 'plugin:jest/recommended', 'prettier'],
  plugins: ['jest', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  ignorePatterns: ['/dist/*'],
};
