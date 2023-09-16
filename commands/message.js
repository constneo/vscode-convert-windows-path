const vscode = require('vscode')
const Logger = require('../utils/logger')
/**
 * @param {vscode.ExtensionContext} context
 * @param {string} command
 * @returns {vscode.Disposable}
 */
module.exports = (context, command) => {
  const disposable = vscode.commands.registerCommand(command, args => {
    vscode.window.showInformationMessage('hello')
    Logger.info(123)
  })
  return disposable
}
