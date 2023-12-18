module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'standard/computed-property-even-spacing': 0,
    'no-multi-spaces': 'off',
    'generator-star-spacing': 'off',
    camelcase: [0, { properties: 'never' }],
    'vue/no-use-v-if-with-v-for': 'off',
    'space-in-parens': [1, 'never']
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
