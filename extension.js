const {commands, window, Selection} = require('vscode');


let writingMode = false;

const activate = ({subscriptions}) => {
  let listener = {dispose() {}};
  
  subscriptions.push(commands.registerCommand(
    'extension.kerouac.writingMode',
    () => {
      if(writingMode === false) {
        writingMode = true;
        window.showInformationMessage('Writing mode ACTIVATED.');
        listener = window.onDidChangeTextEditorSelection(handleSelection);
      }
    }
  ));

  subscriptions.push(commands.registerCommand(
    'extension.kerouac.editingMode',
    () => {
      if(writingMode === true) {
        writingMode = false;
        window.showInformationMessage('Editing mode ACTIVATED.');
        listener.dispose();
      }
    }
  ));

  function handleSelection() {
    const {activeTextEditor} = window;
    activeTextEditor.selections = activeTextEditor.selections.map(
      ({active}) => new Selection(active, active)
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
