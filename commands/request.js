const { window, commands, workspace, Position } = require('vscode')

// 按下 F1或 Ctrl + Shift + P -> 输入 wi:pick
module.exports = commands.registerCommand('wi.request', (doc, item) => {
  console.log('key::: ', item.key)
  window.showInformationMessage('hello')

  // console.log(doc)

  const text = window.activeTextEditor.document.getText()
  const json = JSON.parse(text)
  console.log('json::: ', json)
  const requestConfig = json[item.key]
  console.log(requestConfig)

  const options = {
    method: 'POST',
    hostname: 'example.com',
    port: null,
    path: '/comments',
    headers: {
      'user-agent': 'vscode-restclient',
      'content-type': 'application/json'
    }
  }
})
