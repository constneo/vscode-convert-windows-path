const convert = require("./commands/convert");

function activate(context) {
	context.subscriptions.push(convert(context, "wi.convert"));
}
function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
