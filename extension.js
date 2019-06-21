const {commands, window, workspace, Selection, Range, Position} = require('vscode');


const activate = ({subscriptions}) => {
  const {activeTextEditor} = window;
  let oldText = activeTextEditor
    ? activeTextEditor.document.getText()
    : ``;
  let writingMode = false;
  let listener = {};

  subscriptions.push(commands.registerCommand('kerouac.toggleMode', () => {
      if (writingMode === false) {
        writingMode = true;
        window.showInformationMessage('Writing mode ACTIVATED.');

        listener = workspace
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
              listener.dispose();
            } else {
              window.showInformationMessage(`Editing mode NOT activated.`);
            }
        });
      }
    }
  ));

  function handleChange({contentChanges}) {
    const currentText = activeTextEditor.document.getText();

    if (contentChanges.length > 0 && currentText.length < oldText.length ) {
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
      `Do you see the story? Do you see anything? It seems to me I am trying to tell you a dream.`,
      `Like a running blaze on a plain, like a flash of lightning in the clouds. We live in the flicker.`,
      `Exiting writing mode this quickly would probably make Jack Kerouac feel very sad.`,
      `A tuple of two characters, like a pair of opening and closing brackets.`,
      `Perfectly balanced, as all things should be.`,
      `No matter what you do it’s bound to be a waste of time in the end so you might as well go mad.`,
      `The sensation of death kicking at my heels to move on, with a phantom dogging its own heels.`,
      `Turn your thinking into your work, your thoughts a book, in sieges.`,
      `What is that feeling when you’re driving away from people and they recede on the plain till you see their specks dispersing?`,
      `It’s the too-huge world vaulting us, and it’s good-bye.`,
      `But we lean forward to the next crazy venture beneath the skies.`
      `Nothing behind me, everything ahead of me, as is ever so on the road.`,
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
