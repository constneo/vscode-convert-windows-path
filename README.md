# Convert Windows file path to the Unix Style

转换 Windows 路径 为 Unix Style

`E:\code\vscode-plugin\convert-windows-path\README.md`

`"E:\code\vscode-plugin\convert-windows-path\README.md"`

`E:\\code\\vscode-plugin\\convert-windows-path\\README.md`

`"E:\\code\\vscode-plugin\\convert-windows-path\\README.md"`

转换为

`E:/code/vscode-plugin/convert-windows-path/README.md`

# Options

```json
// .vscode/settings.json
{
  "vscode-convert-windows-path.showGenerateSnippet": false,
  "vscode-convert-windows-path.showWelcome": false,
  "vscode-convert-windows-path.showConvertPath": false
}
```

## Build

```shell
npm install

npm install -g @vscode/vsce

vsce package --no-dependencies

vsce package --dependencies
```
