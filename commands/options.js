import * as vscode from "vscode";

const { commands, workspace, window } = vscode;

// 按下 F1或 Ctrl + Shift + P -> 输入 wi:pick
export default (context, command) => {
	const disposable = commands.registerCommand(command, async () => {
		const options = workspace.getConfiguration("wi");
		const keys = Object.keys(JSON.parse(JSON.stringify(options)));
		const selected = await window.showQuickPick(keys);

		if (selected === "path") {
			const { selection, edit } = window.activeTextEditor;
			const list = options.get("path").split("|");
			const res = await window.showQuickPick(list);

			edit((e) => {
				e.replace(selection, res);
			});
		}

		if (selected === "opened") {
			options.update(selected, !options.get(selected), true);
		}
	});

	return disposable;
};
