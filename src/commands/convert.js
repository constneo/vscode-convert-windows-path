import * as vscode from "vscode";

const { commands, window } = vscode;

export default (context, command) => {
	const disposable = commands.registerCommand(command, (arg) => {
		const { selection, edit, document } = window.activeTextEditor;

		const origin_path = document.getText(selection);

		const finally_path = origin_path
			.replace(/\\/g, "/")
			.replace(/\/\//g, "/")
			.replace(/(^\")|(\"$)/g, "");

		edit((e) => {
			e.replace(selection, finally_path);
		});
	});

	return disposable;
};
