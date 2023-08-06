const vscode = require("vscode");

const convert = require("./commands/convert");
const pick = require("./commands/pick");

function activate(context) {
    console.log("Congratulations, your extension  is now active!");
    context.subscriptions.push(convert);
    context.subscriptions.push(pick);

    const p = vscode.workspace.workspaceFolders;
    const rootPath = p && p.length > 0 ? p[0].uri.fsPath : undefined;
    console.log(rootPath);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
