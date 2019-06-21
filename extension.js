const {commands, window, workspace, Selection, Range, Position} = require('vscode');



const activate = ({subscriptions}) => {
  const {activeTextEditor} = window;
  let oldText = activeTextEditor
    ? activeTextEditor.document.getText()
    : null;
  let writingMode = false;
  let documentListener = {};
  let selectionListener = {};

  subscriptions.push(commands.registerCommand(
    'kerouac.toggleMode',
    () => {
      if (writingMode === false) {
        writingMode = true;
        window.showInformationMessage('Writing mode ACTIVATED.');
        selectionListener = window
          .onDidChangeTextEditorSelection(handleSelection);
        documentListener = workspace
          .onDidChangeTextDocument(handleChange);
        oldText = activeTextEditor.document.getText();
      } else {
        const phrase = randomPhrase();
        const prompt = `Resist the urge to fiddle! Type the following quote if you're SURE you're done writing: "${phrase}"`;
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
    const currentText = activeTextEditor.document.getText();
    if (
      contentChanges.length > 0
      && contentChanges[0].text.length === 0
      && currentText.length < oldText.length
    ) {
      const fullTextRange = new Range(
        new Position(0, 0),
        new Position(oldText.length, oldText.length)
      );
      activeTextEditor.edit((editBuilder) => {
        editBuilder.replace(fullTextRange, oldText);
      });
      window.showInformationMessage(`There's no crying in baseball or deletion in writing mode.`, {modal: true});
    }
    oldText = currentText;
  }

  function randomPhrase() {
    const phrases = [
      `Exiting writing mode this quickly would probably make Jack Kerouac feel very sad.`,
      `Nothing behind me, everything ahead of me, as is ever so on the road.`,
      `A tuple of two characters, like a pair of opening and closing brackets.`,
      `Do you see the story? Do you see anything? It seems to me I am trying to tell you a dream.`
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
