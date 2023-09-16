// 在编辑器内,为特定的文件注入一个可点击的命令.

const vscode = require('vscode')

// See https://code.visualstudio.com/api/references/vscode-api#DocumentFilter
const selector = [{ scheme: 'file', language: 'markdown', pattern: '**/*.test.md' }]

/**
 * 通过正则匹配
 * @param {vscode.TextDocument} document
 * @returns
 */
function getMatchesWithRegexp(document) {
  const t3 = dayjs().millisecond()
  console.log('t3::: ', t3)
  const matchs = []
  for (let i = 0; i < document.lineCount; i++) {
    const line = document.lineAt(i)
    // const regexp = /\"http-id\"/g
    // const uuid_regexp = /[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/gi
    // const match = regexp.exec(line.text)
    // const uuid_match = uuid_regexp.exec(line.text)

    const reg = /\"@[\w]*\"/g

    // /\"@[a-z0-9|-]+\"/g
    // /\"@\"/g

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
        // @ts-ignore
        key: JSON.parse(match[0])
      })
    }
  }
  const t4 = dayjs().millisecond()
  console.log('t4::: ', t4)
  const ee = t4 - t3
  console.log('ee::: ', ee)
  return matchs
}

/**
 * 查询键名匹配,可以根据 key 返回 value
 * @param {vscode.TextDocument} document
 * @returns
 */
function getMatches(document) {
  const text = document.getText()
  const json = JSON.parse(text)
  console.log('json::: ', json)
  const keys = Object.keys(json)
  console.log('keys::: ', keys)

  if (typeof json !== 'object') {
    vscode.window.showErrorMessage('配置错误')
    return []
  }

  const t1 = dayjs().millisecond()
  console.log('t1::: ', t1)

  /** @type {{ line: number; key: string; value: any; }[]} */
  const matchs = []

  for (const key in json) {
    for (let i = 0; i < document.lineCount; i++) {
      const line = document.lineAt(i)
      const find = matchs.find(i => i.key == key)
      if (find) {
        vscode.window.showInformationMessage(`${key} 重复,只保留第一个`)
        continue
      }

      if (line.text.includes(key)) {
        matchs.push({
          line: i,
          key,
          value: json[key]
        })
      }
    }
  }
  const t2 = dayjs().millisecond()
  console.log('t2::: ', t2)
  const e = t2 - t1
  console.log('e ::: ', e)

  return matchs
}

/**
 * @type {vscode.CodeLensProvider<vscode.CodeLens>}
 */
class ResultCodeLens {
  constructor() {}

  onDidChangeCodeLenses(listen, thisArg, disposables) {}
  /**
   * @param {vscode.TextDocument} doc
   * @param {vscode.CancellationToken} token
   * @returns {ProviderResult<T[]>}
   */
  async provideCodeLenses(doc, token) {
    const { Range, CodeLens } = vscode

    const codelenses = []
    // TODO:基于光标位置来添加命令
    const editor = vscode.window.activeTextEditor
    if (editor) {
      const position = editor.selection.active
      const line = position.line
      const column = position.character

      console.log(`当前光标位置：行 ${line + 1}，列 ${column + 1}`)

      const range = new Range(position, position)
      const codelens = new CodeLens(range)
      codelens.command = {
        title: '测试 codelens',
        command: 'wi.message',
        arguments: []
      }

      // codelenses.push(codelens)
    }

    // const cmds = await vscode.commands.getCommands()
    // console.log('cmds::: ', cmds.splice(0,10))

    return Promise.resolve(codelenses)
  }
  /**
   * @param {vscode.CodeLens} codeLens
   * @param {vscode.CancellationToken} token
   * @returns {}
   */
  resolveCodeLens(codeLens, token) {
    // 这里可以对CodeLens进行进一步的处理或修改（可选）
    console.log('codeLens::: ', codeLens)
    codeLens.command = {
      command: 'wi.options',
      tooltip: '测试resolveCodeLens',
      title: '测试',
      arguments: []
    }
    return codeLens
  }
}

module.exports = {
  selector,
  ResultCodeLens
}
