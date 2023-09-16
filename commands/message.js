const vscode = require('vscode')

// 按下 F1或 Ctrl + Shift + P -> 输入 wi:pick
module.exports = (context, command) => {
  const disposable = vscode.commands.registerCommand(command, args => {
    vscode.window.showInformationMessage('hello')
  })

  return disposable
}
