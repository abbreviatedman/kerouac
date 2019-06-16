const {commands, window, Selection} = require('vscode');


const activate = ({subscriptions}) => {
	let writingMode = false;
	window.onDidChangeTextEditorSelection(() => {
		if (writingMode === true) {
			window.activeTextEditor.selections = window
				.activeTextEditor
				.selections
				.map(selection => new Selection(
					selection.start,
					selection.start
					)
				);
		}
	});

	subscriptions.push(commands.registerCommand(
		'extension.kerouac.writingMode',
		() => {
			if(writingMode === false) {
				writingMode = true;
				window.showInformationMessage('Writing mode ACTIVATED.');
			}
		}
	));

	subscriptions.push(commands.registerCommand(
		'extension.kerouac.editingMode',
		() => {
			if(writingMode === true) {
				writingMode = false;
				window.showInformationMessage('Editing mode ACTIVATED.');
			}
		}
	));
}

exports.activate = activate;

const deactivate = () => {
	// May need this at some point.
}

module.exports = {
	activate,
	deactivate
}
