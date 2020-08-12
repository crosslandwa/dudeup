import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.min.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    postcss({
      extensions: [ '.css' ]
    }),
    babel(),
    resolve(),
    commonjs()
  ]
}
