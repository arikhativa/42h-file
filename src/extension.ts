
import * as vscode from 'vscode';

function getFileName(editor: vscode.TextEditor): string {
	let arr = editor.document.fileName.split("/");
	let fileName = arr[arr.length - 1];
	let re = /\./gi; 

	return (fileName.replace(re, "_").toLocaleUpperCase());
}

function enterText() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
		let fileName = getFileName(editor);
		let startLine: vscode.TextLine;
		let lastLine = editor.document.lineAt(editor.document.lineCount - 1);
		
		for (let i = 0; i < editor.document.lineCount; i++) {
			let line = editor.document.lineAt(i);
			if (line.text === "")
			{
				startLine = line;
				break ;
			}
		}
		editor.edit(editBuilder => {
			editBuilder.insert(startLine.range.end, `\n#ifndef ${fileName}\n# define ${fileName}`);
			editBuilder.insert(lastLine.range.start, "\n#endif");
		});
    }
}

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('h.protect', () => {
		enterText();
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
