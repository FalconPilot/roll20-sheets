const fs = require('fs-extra')

const { processHTML, processCSS } = require(`${__dirname}/../../utils`)

module.exports = () => Promise.all([
  processHTML(__dirname),
  processCSS(__dirname)
])
