import * as vscode from 'vscode'

const COMMAND = 'vscode-convert-windows-path.convert'

export class ConvertPathProvider implements vscode.Disposable {
  private subscriptions: vscode.Disposable[] = []

  constructor() {
    const disposable = vscode.commands.registerCommand(COMMAND, () => {
      const { selection, edit, document } = vscode.window.activeTextEditor
      const origin_path = document.getText(selection)

      const finally_path = origin_path
        .replace(/\\/g, '/')
        .replace(/\/\//g, '/')
        .replace(/(^\")|(\"$)/g, '')

      edit(e => {
        e.replace(selection, finally_path)
      })
    })

    this.subscriptions.push(disposable)
  }
  public dispose() {
    this.subscriptions.forEach(s => s.dispose())
  }
}
