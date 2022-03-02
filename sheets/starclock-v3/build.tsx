import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import * as fs from 'fs'
import * as webpack from 'webpack'
import { ServerStyleSheet } from 'styled-components'

import { App } from './src/components/App'

const buildSheet = () => {
  const sheet = new ServerStyleSheet()
    webpack({
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
      },
      entry: './src/scripts/index.ts',
      output: {
        filename: 'scripts.js'
      }
    }).run(err => {
      try {
        if (err) {
          throw err
        }

        const js = fs.readFileSync('./dist/scripts.js')

        const html = ReactDOMServer.renderToString(sheet.collectStyles(<App />))
          .replace(/ data-reactroot=""/g, '')

        const css = sheet.getStyleTags()
          .replace(/<style(?:.*?)>|<\/style>|data-styled(?:.*?)\n|\/\*\!sc\*\//g, '')

        fs.writeFileSync('./dist/sheet.html', `${html}\n<script type="text/worker">${js}</script>`)
        fs.writeFileSync('./dist/style.css', css)
      } catch (err) {
        console.error(err)
      } finally {
        sheet.seal()
      }
    })
}

buildSheet()
