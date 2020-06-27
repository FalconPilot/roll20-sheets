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

const { default: _content }: any = require(path.resolve(__dirname, sheet, 'index.tsx'))

if (!isString(_content)) {
  throw new Error(`Could not load HTML from sheet location "${sheet}"`)
}

const MainPage: HtmlPage = new HtmlPage(fs.readFileSync(path.resolve(__dirname, 'preview.html'), 'utf-8'))

const styleTagsRegex: RegExp = /<style data-emotion-css="(?:.*?)>(?<classes>.*?)<\/style>/g

const classes: string[] = []
let matches: RegExpExecArray | null = [] as unknown as RegExpExecArray
while (matches = styleTagsRegex.exec(_content)) {
  classes.push(matches[1])
}

const styleSheet: string = `${sheet}.css`

fs.writeFileSync(path.resolve(__dirname, 'build', styleSheet), classes.join('\n'))

const content: string = _content.replace(styleTagsRegex, '')

http.createServer((req: http.IncomingMessage, res: http.ServerResponse): void => {
  if (req.url === '/style') {
    res.writeHead(200, { 'Content-Type': 'text/css' })
    res.write(fs.readFileSync(path.resolve(__dirname, 'build', styleSheet), 'utf-8'))
    res.end()
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(
      MainPage
        .replaceTag('PREVIEW_CONTENT', content)
        .replaceTag('SHEET_NAME', sheet)
        .html
    )
    res.end()
  }
}).listen(7777)
