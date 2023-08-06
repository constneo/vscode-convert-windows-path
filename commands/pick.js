const { window, commands } = require('vscode')

// 按下 F1或 Ctrl + Shift + P -> 输入 wi:pick
module.exports = commands.registerCommand('wi.pick', () => {
  window.showInformationMessage('commandPalette 测试')
})
