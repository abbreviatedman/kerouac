const {commands, window, workspace, Selection, Range, Position} = require('vscode');


let writingMode = false;

const activate = ({subscriptions}) => {
  const {activeTextEditor} = window;
  let oldText = activeTextEditor.document.getText();
  let documentListener = {};
  let selectionListener = {};
  
  subscriptions.push(commands.registerCommand(
    'extension.kerouac.writingMode',
    () => {
      if (writingMode === false) {
        writingMode = true;
        window.showInformationMessage('Writing mode ACTIVATED.');
        selectionListener = window
          .onDidChangeTextEditorSelection(resetCursors);
        documentListener = workspace
          .onDidChangeTextDocument(handleChange);
        oldText = activeTextEditor.document.getText();
      }
    }
  ));

  subscriptions.push(commands.registerCommand(
    'extension.kerouac.editingMode',
    () => {
      if (writingMode === true) {
        writingMode = false;
        window.showInformationMessage('Editing mode ACTIVATED.');
        documentListener.dispose();
        selectionListener.dispose();
      }
    }
  ));

  function resetCursors() {
    if (!(activeTextEditor.selection.isEmpty)) {
      activeTextEditor.selections = activeTextEditor.selections.map(
        ({active}) => new Selection(active, active)
      );
    }
  }

  function handleChange({contentChanges}) {
    const text = activeTextEditor.document.getText();
    const {length} = text;
    if (contentChanges.length > 0) {
      if (contentChanges[0].text.length === 0 && length < oldText.length) {
        const fullTextRange = new Range(
          new Position(0, 0),
          new Position(oldText.length, oldText.length)
        );
        activeTextEditor.edit((editBuilder) => {
          editBuilder.replace(fullTextRange, oldText);
        });
        window.showInformationMessage(`We don't want to delete during writing mode. It would make Jack Kerouac sad.`, {modal: true});
      }
    }
    oldText = text;
    // resetCursors();
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
