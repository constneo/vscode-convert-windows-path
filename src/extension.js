import { welcome, getConfig, when } from "./utils.js"
import vscode from "./vscode.js"
import ConvertPathProvider from "./convert.js"
import GenerateSnippetPathProvider from "./snippet.js"

/**
 * @param {vscode.ExtensionContext} context
 */
export async function activate(context) {
  const { showConvertPath, showWelcome, showGenerateSnippet } = await getConfig()
  context.subscriptions.push(await when())

  if (showWelcome) welcome()

  if (showGenerateSnippet) context.subscriptions.push(new GenerateSnippetPathProvider())

  if (showConvertPath) context.subscriptions.push(new ConvertPathProvider())

  vscode.window.onDidChangeActiveTextEditor(e => {
    const id = e.document.languageId
    console.log("[ id ]->", id)
  })
}

export function deactivate() {}
