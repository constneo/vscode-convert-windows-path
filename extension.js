const vscode = require('vscode')
const convert = require('./commands/convert')
const pick = require('./commands/pick')
const options = require('./commands/options')
const message = require('./commands/message')
const { selector, HelloCodeLens } = require('./codelens')
const request = require('./commands/request')

function activate(context) {
  console.log('Congratulations, your extension  is now active!')
  context.subscriptions.push(convert)
  context.subscriptions.push(pick)
  context.subscriptions.push(options)
  context.subscriptions.push(message)
  context.subscriptions.push(request)

  // vscode.languages.registerCodeLensProvider(selector, new HelloCodeLens())

  // const p = vscode.workspace.workspaceFolders
  // const rootPath = p && p.length > 0 ? p[0].uri.fsPath : undefined
  // console.log(rootPath)
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
}
