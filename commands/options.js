const { window, commands, workspace, CodeLensProvider, CodeLens } = require('vscode')

// 更新配置
// workspace.getConfiguration('wi').update(键名,键值,是否是全局)
// workspace.getConfiguration('wi').get(键名)

// 按下 F1或 Ctrl + Shift + P -> 输入 wi:pick
module.exports = commands.registerCommand('wi.options', async () => {
  const options = workspace.getConfiguration('wi')
  const keys = Object.keys(JSON.parse(JSON.stringify(options)))
  const selected = await window.showQuickPick(keys)

  if (selected === 'path') {
    const { selection, edit } = window.activeTextEditor
    const list = options.get('path').split('|')
    const res = await window.showQuickPick(list)

    edit(e => {
      e.replace(selection, res)
    })
  }

  if (selected === 'opened') {
    options.update(selected, !options.get(selected), true)
  }
})
