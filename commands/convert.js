const { window, commands, env, Range } = require("vscode");

// import { window, commands, env } from "vscode";

module.exports = commands.registerCommand("wi.convert", (arg, thisArg) => {
    const { selection, edit, document } = window.activeTextEditor;

    // console.log(arg);

    // env.clipboard.readText().then((text) => {
    //     console.log("text:", text);
    // });

    console.log("selection:", selection);

    // console.log("document:", window.activeTextEditor.document);
    // let { start, end, active, anchor } = window.activeTextEditor.selection;

    // E:/code/vscode-plugin/convert-windows-path/README.md
    const origin_path = document.getText(selection);
    const finally_path = origin_path.replace(/\\/g, "/");
    console.log("path:", finally_path);

    edit((e) => {
        e.replace(selection, finally_path);
        console.log(123);
    });
});
