const vscode = require('vscode')
const convert = require('./commands/convert')
const pick = require('./commands/pick')
const options = require('./commands/options')
const message = require('./commands/message')
const getCursorPosition = require('./commands/cursor.position')

function activate(context) {
  vscode.window.showInformationMessage('Convert Path extension  is now active!')

  context.subscriptions.push(convert(context, 'wi.convert'))
  context.subscriptions.push(pick(context, 'wi.pick'))
  context.subscriptions.push(options(context, 'wi.options'))
  context.subscriptions.push(message(context, 'wi.message'))
  context.subscriptions.push(getCursorPosition(context, 'wi.getCursorPosition'))
}
function deactivate() {}

module.exports = {
  activate,
  deactivate
}
