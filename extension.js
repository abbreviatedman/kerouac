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
      if(writingMode === false) {
        writingMode = true;
        window.showInformationMessage('Writing mode ACTIVATED.');
        selectionListener = window
          .onDidChangeTextEditorSelection(resetCursor);
        documentListener = workspace
          .onDidChangeTextDocument((handleChange));
        oldText = activeTextEditor.document.getText();
      }
    }
  ));

  subscriptions.push(commands.registerCommand(
    'extension.kerouac.editingMode',
    () => {
      if(writingMode === true) {
        writingMode = false;
        window.showInformationMessage('Editing mode ACTIVATED.');
        documentListener.dispose();
        selectionListener.dispose();
      }
    }
  ));

  function resetCursor() {
    const {activeTextEditor} = window;
    activeTextEditor.selections = activeTextEditor.selections.map(
      ({active}) => new Selection(active, active)
    );
  }

  function handleChange({contentChanges}) {
    if (contentChanges.length > 0) {
      if (contentChanges[0].text.length === 0) {
        const fullTextRange = new Range(new Position(0, 0), new Position(oldText.length, oldText.length));
        const {length} = activeTextEditor.document.getText();
        activeTextEditor.edit((editBuilder) => {
          editBuilder.replace(fullTextRange, oldText);
        })
        // window.showInputBox({placeHolder: `There's no deletion in writing mode!`});
        window.showInformationMessage(`We don't want to delete during writing mode. It would make Jack Kerouac sad.`, {modal: true})
      }
    }
    const text = activeTextEditor.document.getText();
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
