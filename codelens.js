// 在编辑器内,为特定的文件注入一个可点击的命令.

const vscode = require('vscode')
const { Position, Range, CodeLens } = vscode

// See https://code.visualstudio.com/api/references/vscode-api#DocumentFilter
const selector = [{ scheme: 'file', language: 'json', pattern: '**/*.api.json' }]

function getMatches(document) {
  const matchs = []
  for (let i = 0; i < document.lineCount; i++) {
    const line = document.lineAt(i)
    // const regexp = /\"http-id\"/g
    // const uuid_regexp = /[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/gi
    // const match = regexp.exec(line.text)
    // const uuid_match = uuid_regexp.exec(line.text)

    const reg = /\"@[\w]*\"/g
    const match = reg.exec(line.text)
    // console.log('match::: ', match)

    // /\"@[\w]*\"/g
    // if (match && uuid_match) {
    //   console.log(line.text)

    //   matchs.push({
    //     line: i,
    //     key: uuid_match[0]
    //   })
    // }

    if (match) {
      matchs.push({
        line: i,
        key: JSON.parse(match[0])
      })
    }
  }

  return matchs
}

class HelloCodeLens {
  constructor() {}

  provideCodeLenses(doc, token) {
    // const start = new Position(0, 0)
    // const end = new Position(1, 0)
    // const range = new Range(start, end)

    const command = {
      title: '发起请求',
      command: 'wi.request',
      arguments: [doc]
    }

    const matchs = getMatches(doc)
    console.log('matchs::: ', matchs)
    const codeLens = matchs.map(item => {
      const start = new Position(item.line, 0)
      const end = new Position(item.line + 1, 0)
      const range = new Range(start, end)

      return new CodeLens(range, {
        title: '发起请求',
        command: 'wi.request',
        arguments: [doc, item]
      })
    })
    console.log(codeLens)

    // return Promise.resolve([new CodeLens(range, command)])
    return Promise.resolve(codeLens)
  }
  resolveCodeLens(codeLens, token) {
    // code
    console.log(123)
  }
}

module.exports = { selector, HelloCodeLens }
