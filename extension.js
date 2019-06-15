const {commands, window, Selection} = require('vscode');

const activate = (context) => {

	const disposable = commands.registerCommand(
		'extension.kerouacWritingMode',
		() => {

		window.showInformationMessage('Writing mode ACTIVATED.');

		window.onDidChangeTextEditorSelection(() => {
			window.activeTextEditor.selections = window
				.activeTextEditor
				.selections
				.map(selection => new Selection(
					selection.start,
					selection.start
				));
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
