module.exports = {
  extends: [
    'react-app',
    '@scott-m-sarsfield/eslint-config'
  ],
  overrides: [
    {
      files: [ '**/*.ts', '**/*.tsx' ],
      rules: {
        'react/prop-types': 'off',
        'no-undef': 'off'
      }
    },
    {
      files: [
        '**/stories/**/*.js',
        '**/*.stories.js'
      ],
      rules: {
        'react/prop-types': 'off',
        'import/no-anonymous-default-export': 'off'
      }
    }
  ]
};
