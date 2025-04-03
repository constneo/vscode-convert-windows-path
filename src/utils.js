import { exec } from "child_process"
import vscode from "./vscode.js"
import { PLUGIN_ID, PLUGIN_NAME, message } from "./constans.js"

// import add from "@constneo/add"

export class Disposable extends vscode.Disposable {
  constructor() {
    super(() => {})
    this.subscriptions = []
  }

  dispose() {
    this.subscriptions.forEach(s => s.dispose())
  }
}

/**
 * @param {string} fileName
 */
export function format(fileName) {
  return new Promise((resolve, reject) => {
    exec(`ls ${fileName}`, (error, stdout, stderr) => {
      if (error) reject(`topiary error ${stderr || error.message}`)
      else resolve(stdout)
    })
  })
}

/**
 * 检查环境变量以及配置
 * @returns {Promise<{showWelcome:boolean,showGenerateSnippet:boolean,showConvertPath:boolean }>}
 */
export function getConfig() {
  return new Promise((resolve, reject) => {
    const config = vscode.workspace.getConfiguration(PLUGIN_ID)

    const showWelcome = config.get("showWelcome")
    const showGenerateSnippet = config.get("showGenerateSnippet")
    const showConvertPath = config.get("showConvertPath")

    // const editor = vscode.window.activeTextEditor
    // const root = vscode.workspace.getWorkspaceFolder(editor.document.uri)

    resolve({
      // root,
      showWelcome,
      showConvertPath,
      showGenerateSnippet
    })
  })
}

/**
 * @param {vscode.Uri} uri
 */
export function getRootDir(uri) {
  return vscode.workspace.getWorkspaceFolder(uri)
}

export async function welcome() {
  console.log(`Register ${PLUGIN_ID} extension .`)
  vscode.window.showInformationMessage(message)
}

export function getCurrentDate() {
  let date = new Date()
  // console.log(date.getFullYear()) //当前日期的年 2022
  // console.log(date.getMonth() + 1) //月份+1 由于月份是0-11计算 所以需要 +1
  // console.log(date.getDate()) // 日
  // console.log(date.getDay()) // 星期几  注意：星期日返回的是0
  // console.log(date.getHours()) // 时
  // console.log(date.getMinutes()) // 分
  // console.log(date.getSeconds()) // 秒

  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  const hh = date.getHours()
  const mm = date.getMinutes()
  const ss = date.getSeconds()

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}

/**
 * 自定义 when 子句上下文
 *
 * @returns {vscode.Disposable}
 */
export function when() {
  // 监听配置文件的修改,使条件立即生效
  const disposable = vscode.window.onDidChangeActiveTextEditor(async editor => {
    if (!editor) return

    const { showGenerateSnippet, showConvertPath } = await getConfig()

    // const editor = vscode.window.activeTextEditor
    // const uri = editor.document.fileName

    // path.extname(uri)

    // config.vscode-convert-windows-path.generateSnippet && (resourceExtname == .json || resourceExtname == .code-snippets)

    // .code-snippets -> snippets
    // json -> json
    // jsonc -> jsonc
    // txt -> plaintext

    const ids = ["json", "snippets", "jsonc", "plaintext"]

    const has = ids.some(i => !!editor.document && i === editor.document.languageId)

    vscode.commands.executeCommand(
      "setContext",
      "constneo.showGenerateSnippet",
      has && showGenerateSnippet
    )

    vscode.commands.executeCommand("setContext", "constneo.showConvertPath", showConvertPath)
  })

  return disposable
}
