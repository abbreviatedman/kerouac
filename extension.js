const {commands, window, workspace, Selection} = require('vscode');


let writingMode = false;

const activate = ({subscriptions}) => {
  let oldText = window.activeTextEditor.document.getText();
  // let oldText = '';
  let listener = {dispose() {}};
  
  subscriptions.push(commands.registerCommand(
    'extension.kerouac.writingMode',
    () => {
      if(writingMode === false) {
        writingMode = true;
        window.showInformationMessage('Writing mode ACTIVATED.');
        listener = window.onDidChangeTextEditorSelection(handleSelection);
        workspace.onDidChangeTextDocument(handleChange);
        oldText = window.activeTextEditor.document.getText();
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

  function handleChange({contentChanges}) {
    console.log(contentChanges);
    const text = window.activeTextEditor.document.getText();
    console.log(oldText.length - text.length);
    oldText = text;
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
