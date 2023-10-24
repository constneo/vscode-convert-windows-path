import * as vscode from "vscode";

/**
 * @param {vscode.ExtensionContext} context
 * @param {string} command
 * @returns {vscode.Disposable}
 */
export default (context, command) => {
	const disposable = vscode.commands.registerCommand(command, (args) => {
		vscode.window.showInformationMessage("hello");
	});
	return disposable;
};
