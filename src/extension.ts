import * as vscode from 'vscode'
import { ConvertPathProvider } from './convert.js'
import { GenerateSnippetPathProvider } from './snippet.js'

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(new ConvertPathProvider())
  context.subscriptions.push(new GenerateSnippetPathProvider())
}
export function deactivate() {}
