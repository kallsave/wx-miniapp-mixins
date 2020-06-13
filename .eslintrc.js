// https://eslint.org/docs/user-guide/configuring

module.exports = {
  'root': true,
  'parserOptions': {
    'parser': 'babel-eslint',
  },
  'env': {
    'node': true,
    'commonjs': true,
  },
  'extends': [
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  'globals': {
    'App': true,
    'Page': true,
    'Component': true,
    'getApp': true,
  },
  // add your custom rules here
  'rules': {
    'arrow-parens': 'off',
    'comma-dangle': 'off',
    'eol-last': 'off',
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 'off',
    'no-unused-vars': 'off',
  },
}
