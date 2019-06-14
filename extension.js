// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "hello-world" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', function () {
		// The code you place here will be executed every time your command is executed
		const previousSelection = {line: 0, character: 0};

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello Selection!');
		vscode.window.onDidChangeTextEditorSelection(() => {
			// const {start, end} = event.selections[0];
			// const characterSpan = end.character = start.character;
			// const lineSpan = end.line - start.line;
			// console.log(`Your selection was ${characterSpan} characters and ${lineSpan} lines.`);
			const {start} = vscode.window.activeTextEditor.selection
			const newSelection = new vscode.Selection(start, start);		
			vscode.window.activeTextEditor.selection = newSelection;
			// if (event.selections[0].isEmpty); {

			// }

		});
	});;

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
