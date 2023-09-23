import * as vscode from "vscode";

const { commands, window } = vscode;

export default (context, command) => {
	const disposable = commands.registerCommand("wi.convert", (arg) => {
		const { selection, edit, document } = window.activeTextEditor;

		// env.clipboard.readText().then((text) => {
		//     console.log("text:", text);
		// });

		console.log("selection:", selection);
		const origin_path = document.getText(selection);
		// /(^\")|(\"$)|\\/g
		const finally_path = origin_path
			.replace(/\\/g, "/")
			.replace(/(^\")|(\"$)/g, "");
		console.log("path:", finally_path);

		edit((e) => {
			e.replace(selection, finally_path);
		});
	});

	return disposable;
};
