const fs = require('fs-extra')
const minify = require('html-minifier').minify
const CleanCSS = require('clean-css')
const colors = require('colors/safe')

/*
**  Common usage functions
*/

const noop = x => x

const fixScript = contents => contents.replace(/<script>/g, '<script type="text/worker">')

const logError = err => {
  console.error(colors.red.bold(err))
  return err
}

// Compress HTML
const compressHTML = contents => minify(contents, {
  minifyJS: true,
  minifyCSS: true,
  collapseWhitespace: true,
  ignoreCustomComments: true
})

// Compress CSS
const compressCSS = contents => new CleanCSS({
  returnPromise: true
}).minify(contents)
  .then(res => res.styles)

// Output file
const outputFile = (dirname, extension) => contents => (
  fs.writeFile(`${dirname}/build.${extension}`, contents)
    .then(res => {
      console.log(colors.green.bold(`File has been compiled into ${dirname}/build.${extension} !`))
      return res
    })
)

// Check if required params are present
const requiredParams = (args, params) => params.length === params.filter(x => args[x] !== undefined).length

const processHTML = (dirname, pipe = noop) => (
  fs.readFile(`${dirname}/sheet.html`, 'utf-8')
    .then(compressHTML)
    .then(fixScript)
    .then(pipe)
    .then(outputFile(dirname, 'html'))
    .catch(logError)
)

const processCSS = (dirname, pipe = noop) => (
  fs.readFile(`${dirname}/style.css`, 'utf-8')
    .then(compressCSS)
    .then(pipe)
    .then(outputFile(dirname, 'css'))
    .catch(logError)
)

// Main exports
module.exports = {
  processHTML,
  processCSS,
  logError,
  requiredParams
}
