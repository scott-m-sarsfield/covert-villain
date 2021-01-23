module.exports = {
  extends: [
    'react-app',
    '@scott-m-sarsfield/eslint-config'
  ],
  overrides: [
    {
      files: ['**/stories/**/*.js'],
      rules: {
        'react/prop-types': 'off'
      }
    }
  ]
};
