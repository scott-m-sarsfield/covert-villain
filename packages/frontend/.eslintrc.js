module.exports = process.env.NODE_ENV === 'development' ? {
  extends: [
    'react-app',
    '@scott-m-sarsfield/eslint-config'
  ],
  overrides: [
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
} : {
  extends: [
    'react-app'
  ]
};
