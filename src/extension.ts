
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function tmp() {
	
}

function enterText(text: string) {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
		let path = editor.document.fileName;
		let arr = path.split("/");
		let fileName = arr[arr.length - 1];
		let re = /\./gi; 
		let name = fileName.replace(re, "_").toLocaleUpperCase();
		
		for (let i = 0; i < editor.document.lineCount; i++) {
			let line = editor.document.lineAt(i);
			if (line.text == "")
			{
				editor.edit(editBuilder => {
					editBuilder.insert(line.range.end, `#ifndef ${name}\n# define ${name}`);
				});
			}
		}
		let lastLine = editor.document.lineAt(editor.document.lineCount - 1);
		editor.edit(editBuilder => {
			editBuilder.insert(lastLine.range.start, "\n#endif\n");
		});
    }
}

export function activate(context: vscode.ExtensionContext) {
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('42header.helloWorld', () => {

		enterText("ss")

		vscode.window.showInformationMessage('Hello World from 42header!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
