const {commands, window, workspace, Selection, Range, Position} = require('vscode');



const activate = ({subscriptions}) => {
  const {activeTextEditor} = window;
  let oldText = activeTextEditor.document.getText();
  let writingMode = false;
  let documentListener = {};
  let selectionListener = {};
  
  subscriptions.push(commands.registerCommand(
    'extension.kerouac.writingMode',
    () => {
      if (writingMode === false) {
        writingMode = true;
        window.showInformationMessage('Writing mode ACTIVATED.');
        selectionListener = window
          .onDidChangeTextEditorSelection(handleSelection);
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
        const phrase = randomPhrase();
        const prompt = `Please type the following phrase (without the quotes!) if you're positive you want to switch to editing mode: "${phrase}"`;
        window.showInputBox({prompt})
          .then((userInput) => {
            if (userInput === phrase) {
              writingMode = false;
              window.showInformationMessage('Editing mode ACTIVATED.');
              documentListener.dispose();
              selectionListener.dispose();
            }
        });
      }
    }
  ));

  function handleSelection() {
    if (!(activeTextEditor.selection.isEmpty)) {
      activeTextEditor.selections = activeTextEditor.selections.map(
        ({active}) => new Selection(active, active)
      );
    }
  }

  function handleChange({contentChanges}) {
    const text = activeTextEditor.document.getText();
    const {length} = text;
    if (
      contentChanges.length > 0
      && contentChanges[0].text.length === 0
      && length < oldText.length
    ) {
      const fullTextRange = new Range(
        new Position(0, 0),
        new Position(oldText.length, oldText.length)
      );
      activeTextEditor.edit((editBuilder) => {
        editBuilder.replace(fullTextRange, oldText);
      });
      window.showInformationMessage(randomPhrase(), {modal: true});
    }
    oldText = text;
  }

  function randomPhrase() {
    const phrases = [
      `Exiting writing mode this quickly would probably make Jack Kerouac feel very sad.`,
      `Nothing behind me, everything ahead of me, as is ever so on the road.`,
      `A tuple of two characters, like a pair of opening and closing brackets.`
    ];
    
    return phrases[Math.floor(Math.random() * phrases.length)];
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
