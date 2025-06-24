import { welcome, getConfig, when } from "./utils.js"
import vscode from "./vscode.js"
import convert from "./convert.js"
import GenerateSnippetPathProvider from "./snippet.js"

/**
 * @param {vscode.ExtensionContext} context
 */
export async function activate(context) {
  const { showConvertPath, showWelcome, showGenerateSnippet } = await getConfig()
  context.subscriptions.push(when())

  if (showWelcome) welcome()

  if (showGenerateSnippet) context.subscriptions.push(new GenerateSnippetPathProvider())

  if (showConvertPath) context.subscriptions.push(convert())

  vscode.workspace.onDidChangeConfiguration(() => {})
}

export function deactivate() {}
