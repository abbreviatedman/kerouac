const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
const activate = (context) => {

	const disposable = vscode
		.commands
		.registerCommand('extension.kerouacWritingMode', () => {

		vscode.window.showInformationMessage('Writing mode ACTIVATED.');

		vscode.window.onDidChangeTextEditorSelection(() => {
			const {start} = vscode.window.activeTextEditor.selection
			const newSelection = new vscode.Selection(start, start);		
			vscode.window.activeTextEditor.selection = newSelection;
		});
	});;

	context.subscriptions.push(disposable);
}

exports.activate = activate;

const deactivate = () => {
	// May need this at some point.
}

module.exports = {
	activate,
	deactivate
}
