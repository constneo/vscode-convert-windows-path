// import  pkg from "../package.json" with  { type: "json" }

// 当前插件的唯一标识符,应该与 package.json中的 configuration.id相对应
export const PLUGIN_ID = "vscode-convert-windows-path"
export const PLUGIN_NAME = "Convert Path"
export const ENV = {}
export const COMMANDS = {
  convert: `${PLUGIN_ID}.convert`,
  generateSnippet: `${PLUGIN_ID}.generateSnippet`
}

export const message = `Thank you for using ${PLUGIN_NAME}`

export const selector = [{ scheme: "file", language: "markdown", pattern: "**/*.md" }]
