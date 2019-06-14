const {commands, window, Selection} = require('vscode');

const activate = (context) => {

	const disposable = commands.registerCommand(
		'extension.kerouacWritingMode',
		() => {

		window.showInformationMessage('Writing mode ACTIVATED.');

		window.onDidChangeTextEditorSelection(() => {
			const {start} = window.activeTextEditor.selection
			const newSelection = new Selection(start, start);		
			window.activeTextEditor.selection = newSelection;
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
