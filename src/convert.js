import { COMMANDS } from "./constans.js"
import vscode from "./vscode.js"

export default () => {
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
  return disposable
}
