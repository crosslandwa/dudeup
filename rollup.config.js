import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import css from 'rollup-plugin-css-only'
import html from '@rollup/plugin-html'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/dude-up.min.js',
    format: 'iife',
    sourcemap: true
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    babel(),
    resolve(),
    commonjs(),
    css({
      output: 'dist/dude-up.css'
    }),
    html({
      template: ({ attributes, bundle, files, publicPath, title }) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="Settle up the cost of group activities.">
    <title>Dude Up</title>
    <link href="dude-up.css" rel="stylesheet" type="text/css" />
  </head>
  <body>
    <header class="du-full-width-container__outer du-header">
      <div class="du-full-width-container__inner du-header__inner">
        <h1 class="du-header-text du-header__title">DUDE UP</h1>
        <div id="about" class="du-header__item"></div>
        <div id="clear" class="du-header__item"></div>
      </div>
    </header>
    <div id="app" class="du-content-container">
      <noscript>
        <p>Dude Up takes the maths out of settling up the cost of group activities.</p>
        <ul>
          <li>Add dudes to your group activity</li>
          <li>Record bought items</li>
          <li>Note how much was spent on each item and (optionally) who shared it</li>
          <li>Let Dude Up tell you <strong>who owes money to whom</strong></li>
        </ul>
        <p><em>Sorry! Dude Up requires javascript to be enabled in your browser</em></p>
      </noscript>
    </div>
    <script src='dude-up.min.js'></script>
  </body>
</html>
`
    })
  ]
}
