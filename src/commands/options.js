const vscode = require('vscode')

// 更新配置
// workspace.getConfiguration('wi').update(键名,键值,是否是全局)
// workspace.getConfiguration('wi').get(键名)

// 按下 F1或 Ctrl + Shift + P -> 输入 wi:pick
module.exports = (context, command) => {
  const disposable = vscode.commands.registerCommand(command, async () => {
    const options = vscode.workspace.getConfiguration('wi')
    const keys = Object.keys(JSON.parse(JSON.stringify(options)))
    const selected = await vscode.window.showQuickPick(keys)

    if (selected === 'path') {
      const { selection, edit } = vscode.window.activeTextEditor
      const list = options.get('path').split('|')
      const res = await vscode.window.showQuickPick(list)

      edit(e => {
        e.replace(selection, res)
      })
    }

    if (selected === 'opened') {
      options.update(selected, !options.get(selected), true)
    }
  })

  return disposable
}
