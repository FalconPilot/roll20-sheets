import yargs from 'yargs'
import path from 'path'
import fs from 'fs'

import { HtmlPage, getHtmlPage, isString } from './lib'

const sheet: unknown = yargs.argv?.sheet

if (!isString(sheet)) {
  throw new Error(`No valid sheet was passed using --sheet argument (Found "${sheet as string}")`)
}

const basis: string = fs.readFileSync(path.resolve(__dirname, 'build.html'), 'utf-8')
const MainPage: HtmlPage = getHtmlPage(basis, sheet)

fs.writeFileSync(path.resolve(__dirname, 'build', `${sheet}.html`), MainPage.html)

console.log(`> "${sheet}.html" built !`)