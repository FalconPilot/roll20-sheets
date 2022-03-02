exports.execute = async (args) => {
  const vscode = args.require('vscode')
  try {
    // IMPORTS
    const fs = require('fs')
    const ejs = require('ejs')
    const path = require('path')
    const rimraf = require('rimraf')
    const minify = require('@node-minify/core')
    const htmlMinifier = require('@node-minify/html-minifier')

    // CODE
    const folderPath = args.folder.fsPath
    const folderName = folderPath.split(path.sep).slice(-1)[0]
    const buildDir = path.resolve(__dirname, '..', '..', 'dist')
    const buildPath = path.resolve(buildDir, folderName)
    const ejsPath = path.resolve(folderPath, 'sheet.ejs')

    const constants = require(path.resolve(folderPath, 'constants.js'))

    if (!constants) {
      vscode.window.showWarningMessage('No constants found')
    }

    const res = await (
      ejs.renderFile(ejsPath, { constants } || null)
        .then(output => output.replace(/module\.exports/, 'constants'))
    )

    if (!fs.existsSync(buildDir)) {
      fs.mkdirSync(buildDir)
    }

    if (fs.existsSync(buildPath)) {
      rimraf.sync(buildPath)
    }

    const bundlePath = path.resolve(buildDir, folderName, 'sheet.html')

    fs.mkdirSync(buildPath)
    fs.writeFileSync(bundlePath, res, 'utf-8')

    await minify({
      compressor: htmlMinifier,
      input: bundlePath,
      output: path.resolve(buildDir, folderName, 'sheet.bundle.html'),
      options: {
        removeAttributeQuotes: false,
        removeComments: true,
        removeRedundantAttributes: false
      }
    })

    await fs.copyFileSync(
      path.resolve(folderPath, 'style.css'),
      path.resolve(buildDir, folderName, 'style.css')
    )
    vscode.window.showInformationMessage('Build completed !')
  } catch (err) {
    vscode.window.showErrorMessage(err.message)
  }
}
