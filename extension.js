const vscode = require('vscode')
const convert = require('./commands/convert')
const pick = require('./commands/pick')
const options = require('./commands/options')
const message = require('./commands/message')

function activate(context) {
  vscode.window.showInformationMessage('Convert Path extension  is now active!')

  context.subscriptions.push(convert)
  context.subscriptions.push(pick)
  context.subscriptions.push(options)
  context.subscriptions.push(message)

  let disposable = vscode.commands.registerCommand('wi.getCursorPosition', () => {
    const editor = vscode.window.activeTextEditor
    if (editor) {
      const position = editor.selection.active
      const line = position.line
      const column = position.character

      vscode.window.showInformationMessage(`当前光标位置：行 ${line + 1}，列 ${column + 1}`)
    }
  })

  context.subscriptions.push(disposable)
}
function deactivate() {}

module.exports = {
  activate,
  deactivate
}
