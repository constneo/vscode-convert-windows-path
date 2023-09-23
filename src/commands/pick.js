const vscode = require('vscode')

// 按下 F1或 Ctrl + Shift + P -> 输入 wi:pick
module.exports = (context, command) => {
  const disposable = vscode.commands.registerCommand(command, () => {
    const { selection, document } = vscode.window.activeTextEditor
    const text = document.getText(selection)
    const options = vscode.workspace.getConfiguration('wi')

    vscode.window.showInformationMessage(text)

    const list = options.get('path').split('|')

    if (list.length > 5) {
      list.shift()
    }

    list.push(text)
    options.update('path', list.join('|'), true)
  })
  return disposable
}
