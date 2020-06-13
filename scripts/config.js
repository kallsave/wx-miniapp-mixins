const path = require('path')
const cjs = require('@rollup/plugin-commonjs')
const node = require('@rollup/plugin-node-resolve')
const babel = require('rollup-plugin-babel')
const eslint = require('rollup-plugin-eslint').eslint

const package = require('../package.json')
const author = package.author
const name = package.name
const version = package.version

const banner =
  '/*!\n' +
  ` * ${name}.js v${version}\n` +
  ` * (c) 2019-${new Date().getFullYear()} ${author}\n` +
  ' * Released under the MIT License.\n' +
  ' */'

const resolve = (p) => {
  return path.resolve(__dirname, '../', p)
}

const plugins = [
  eslint({
    include: [
      resolve('src/**/*.js')
    ]
  }),
  node(),
  cjs(),
  babel(),
]

const buildMap = {
  esm: {
    input: resolve('src/index.js'),
    output: {
      file: resolve(`dist/${name}.js`),
      format: 'esm',
      banner: banner
    },
    plugins: plugins,
  },
}

module.exports = buildMap
