const vscode = require('vscode')

/**
 *
 * @param {vscode.ExtensionContext} context
 * @param {string} command
 * @returns {vscode.Disposable}
 */
module.exports = (context, command) => {
  const output = vscode.window.createOutputChannel('Convert Path', {
    log: true
  })

  const disposable = vscode.commands.registerCommand(command, options => {
    console.log(options)
    output.appendLine(`${options}`)
    output.show()
  })

  return disposable
}
