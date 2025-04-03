import { COMMANDS } from "./constans.js"
import { Disposable } from "./utils.js"
import vscode from "./vscode.js"
import { randomUUID as uuid } from "node:crypto"

export default class GenerateSnippetPathProvider extends Disposable {
  constructor() {
    super()

    const disposable = vscode.commands.registerCommand(COMMANDS.generateSnippet, async args => {
      const editor = vscode.window.activeTextEditor
      // const flag =
      //   editor?.document.uri.path.endsWith(".json") ||
      //   editor?.document.uri.path.endsWith(".code-snippets")
      // if (!editor || !flag) {
      //   return
      // }

      const clip = vscode.env.clipboard
      const text = await clip.readText()
      const snippet = {
        prefix: "snippet",
        body: [],
        description: `${uuid()}`
      }

      const list = text.split("\r\n")
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
}
