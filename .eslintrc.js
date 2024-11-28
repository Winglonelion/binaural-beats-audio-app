// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  extends: ['expo', 'plugin:jest/recommended', 'prettier'],
  plugins: ['jest', 'prettier', 'import', 'simple-import-sort'],
  rules: {
    'prettier/prettier': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Group 1: React, React Native, Expo
          ['^react$', '^react-native$', '^expo'],
          // Group 2: External libraries
          ['^@?\\w'],
          // Group 3: Internal components
          ['^@/components(/.*|$)'],
          // Group 4: Internal utils, constants, etc.
          ['^@/(utils|services|constants|hooks|providers)(/.*|$)'],
          // Group 5: Relative imports
          ['^\\.'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    // 'import/order': [
    //   'error',
    //   {
    //     groups: [
    //       ['builtin', 'external'], // Node.js and external libraries
    //       ['internal'], // Internal imports
    //       ['parent', 'sibling', 'index'], // Relative imports
    //       ['type'], // Type imports
    //     ],
    //     pathGroups: [
    //       {
    //         pattern: '@/**', // Adjust for your alias
    //         group: 'internal',
    //       },
    //     ],
    //     pathGroupsExcludedImportTypes: ['builtin'],
    //     'newlines-between': 'always',
    //     alphabetize: {
    //       order: 'asc',
    //       caseInsensitive: true,
    //     },
    //   },
    // ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  ignorePatterns: ['/dist/*'],
};
