const ejs = require('ejs')
const path = require('path')
const fs = require('fs')
const rimraf = require('rimraf')

exports.execute = async (args) => {
  const vscode = args.require('vscode')
  try {
    const folderPath = args.folder.fsPath
    const folderName = folderPath.split('/').slice(-1)[0]
    const buildDir = path.resolve(__dirname, '..', '..', 'dist')
    const buildPath = path.resolve(buildDir, folderName)
    const ejsPath = path.resolve(folderPath, 'sheet.ejs')

    const constants = require(path.resolve(folderPath, 'constants.js'))

    const res = await ejs.renderFile(ejsPath, constants || null)

    if (!fs.existsSync(buildDir)) {
      fs.mkdirSync(buildDir)
    }

    if (fs.existsSync(buildPath)) {
      rimraf.sync(buildPath)
    }

    fs.mkdirSync(path.resolve(buildDir, folderName))
    fs.writeFileSync(path.resolve(buildDir, folderName, 'sheet.html'), res, 'utf-8')
    vscode.window.showInformationMessage('Build completed !')
  } catch (err) {
    vscode.window.showErrorMessage(err.message)
  }
}
