const argv = require('minimist')(process.argv.slice(2))
const fs = require('fs-extra')

const { requiredParams, logError } = require('./utils')

if (requiredParams(argv, ['game'])) {
  const compilePath = `${__dirname}/sheets/${argv.game}/compile.js`
  fs.pathExists(compilePath)
    .then(result => {

      // If path doesn't exist, throw error
      if (result === false) {
        throw(`Error : Sheet "${argv.game}" doesn't exist or doesn't have a "compile.js script"`)
      }

      // If path exist, start processing
      require(compilePath)()
    })
    .catch(logError)

// If required params are absent, throw error
} else {
  logError('Error : parameter "game" is missing.\n It should be a valid tabletop sheet directory')
}
