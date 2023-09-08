const { window, commands, workspace } = require('vscode')

// 按下 F1或 Ctrl + Shift + P -> 输入 wi:pick
module.exports = commands.registerCommand('wi.pick', () => {
  const { selection, document } = window.activeTextEditor
  const text = document.getText(selection)
  const options = workspace.getConfiguration('wi')

  window.showInformationMessage(text)

  const list = options.get('path').split('|')

  if (list.length > 5) {
    list.shift()
  }

  list.push(text)
  options.update('path', list.join('|'), true)
})
