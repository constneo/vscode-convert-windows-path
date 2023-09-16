const vscode = require('vscode')
const convert = require('./commands/convert')
const pick = require('./commands/pick')
const options = require('./commands/options')
const message = require('./commands/message')
const getCursorPosition = require('./commands/cursor.position')
const { selector, ResultCodeLens } = require('./codelens')
const output = require('./commands/output')

function activate(context) {
  vscode.window.showInformationMessage('Convert Path extension  is now active!')

  context.subscriptions.push(convert(context, 'wi.convert'))
  context.subscriptions.push(pick(context, 'wi.pick'))
  context.subscriptions.push(options(context, 'wi.options'))
  context.subscriptions.push(message(context, 'wi.message'))
  context.subscriptions.push(output(context, 'wi.output'))
  context.subscriptions.push(getCursorPosition(context, 'wi.cursor.position'))

  vscode.languages.registerCodeLensProvider(selector, new ResultCodeLens())
}
function deactivate() {}

module.exports = {
  activate,
  deactivate
}
