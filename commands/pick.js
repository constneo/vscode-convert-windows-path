const { window, commands } = require("vscode");

//在 package.json 中注册命令时，它们将自动显示在 Command Palette (Ctrl + Shift + P)中。为了对命令可见性进行更多的控制，可以使用 commandPalette 菜单项。它允许您定义一个 when 条件来控制命令是否应该在命令面板中可见。

//下面的代码片段使“ Hello World”命令只有在编辑器中选择某些内容时才能在 Command Palette 中显示:

module.exports = commands.registerCommand("wi.pick", () => {
    window.showInformationMessage("commandPalette 测试");
});
