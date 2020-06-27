import path from 'path'
import fs from 'fs'
import http from 'http'
import yargs from 'yargs'

class HtmlPage {
  html: string

  constructor (html: string) {
    this.html = html
  }

  replaceTag (tag: string, content: string): HtmlPage {
    const regex: RegExp = new RegExp(`\{\{${tag}\}\}`)
    return new HtmlPage(this.html.replace(regex, content))
  }
}

const isString = (s: any): s is string => typeof s === 'string'

const sheet: unknown = yargs.argv?.sheet

if (!isString(sheet)) {
  throw new Error(`No valid sheet was passed using --sheet argument (Found "${sheet as string}")`)
}

const { default: content }: any = require(path.resolve(__dirname, sheet, 'index.tsx'))

if (!isString(content)) {
  throw new Error(`Could not load HTML from sheet location "${sheet}"`)
}
const MainPage: HtmlPage = new HtmlPage(fs.readFileSync(path.resolve(__dirname, 'preview.html'), 'utf-8'))

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.write(
    MainPage
      .replaceTag('PREVIEW_CONTENT', content)
      .replaceTag('SHEET_NAME', sheet)
      .html
  )
  res.end()
}).listen(7777)
