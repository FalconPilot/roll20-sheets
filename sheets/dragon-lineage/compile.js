const fs = require('fs-extra')

const outputFile = path => contents => fs.write(path, contents)

const fixScript = contents => contents.replace(/<script>/g, '<script type="text/worker">')

fs.readFile('./sheet.html', 'utf-8')
  .then(fixScript)
  .then(outputFile('./build.html'))
  .catch(console.error)
