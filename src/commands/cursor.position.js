import { commands, window } from "vscode";

export default (context, command) => {
	const disposable = commands.registerCommand(command, () => {
		const editor = window.activeTextEditor;
		if (editor) {
			const position = editor.selection.active;
			const line = position.line;
			const column = position.character;

			window.showInformationMessage(
				`当前光标位置：行 ${line + 1}，列 ${column + 1}`,
			);
		}
	});
	return disposable;
};
