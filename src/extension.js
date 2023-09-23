import convert from "./commands/convert";

export function activate(context) {
	context.subscriptions.push(convert(context, "wi.convert"));
}
export function deactivate() {}
