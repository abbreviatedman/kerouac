const {commands, window, Selection} = require('vscode');


let writingMode = false;

const activate = ({subscriptions}) => {
  window.onDidChangeTextEditorSelection(handleSelection);

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

function handleSelection() {
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
}

exports.activate = activate;

const deactivate = () => {
  // May need this at some point.
}

module.exports = {
  activate,
  deactivate
}
