import { COMMANDS } from "./constans.js"
import vscode from "./vscode.js"

export default class ConvertPathProvider extends vscode.Disposable {
  constructor() {
    super(() => {})

    this.subscriptions = []

    const disposable = vscode.commands.registerCommand(COMMANDS.convert, () => {
      const { selection, edit, document } = vscode.window.activeTextEditor
      const origin_path = document.getText(selection)

      const finally_path = origin_path
        .replace(/\\/g, "/")
        .replace(/\/\//g, "/")
        .replace(/(^\")|(\"$)/g, "")

      edit(e => {
        e.replace(selection, finally_path)
      })
    })

    this.subscriptions.push(disposable)
  }

  dispose() {
    this.subscriptions.forEach(s => s.dispose())
  }
}
