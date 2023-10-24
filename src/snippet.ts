import * as vscode from 'vscode'
import { randomUUID as uuid } from 'node:crypto'

const COMMAND = 'vscode-convert-windows-path.generate-snippet'

export class GenerateSnippetPathProvider implements vscode.Disposable {
  private subscriptions: vscode.Disposable[] = []

  constructor() {
    const disposable = vscode.commands.registerCommand(COMMAND, async args => {
      const editor = vscode.window.activeTextEditor
      const flag =
        editor?.document.uri.path.endsWith('.json') ||
        editor?.document.uri.path.endsWith('.code-snippets')
      if (!editor || !flag) {
        return
      }

      const clip = vscode.env.clipboard
      const text = await clip.readText()
      const snippet: {
        [key: string]: string | string[]
      } = {
        scope: 'javascript,typescript',
        prefix: 'snippet',
        body: [],
        description: `${uuid()}`
      }

      const list = text.split('\r\n')
      snippet.body = list

      const result = JSON.stringify(snippet, null, 2)

      const { edit, selection } = editor
      const position = selection.active

      edit(e => {
        e.insert(position, `"snippet${uuid()}":${result},`)
      })
    })

    this.subscriptions.push(disposable)
  }

  public dispose() {
    this.subscriptions.forEach(s => s.dispose())
  }
}
