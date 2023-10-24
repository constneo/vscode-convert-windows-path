import * as vscode from "vscode";

const { window, commands } = vscode;
/**
 *
 * @param {vscode.ExtensionContext} context
 * @param {string} command
 * @returns {vscode.Disposable}
 */
export default (context, command) => {
	const output = window.createOutputChannel("Convert Path", {
		log: true,
	});

	const disposable = commands.registerCommand(command, (options) => {
		console.log(options);
		output.appendLine(`${options}`);
		output.show();
	});

	return disposable;
};
