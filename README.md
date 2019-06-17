# Kerouac

A Visual Studio Code extension to encourage separation of writing and editing modes.


### Summary

Writers benefit from splitting their work into writing time and editing time. There is a productivity cost of switching to fiddling with the wording before enough is written. This extension allows the user to prevent themselves from giving into the temptation to fiddle until they decide that it's editing time.


### Feature Roadmap to 1.0

- [X] User can easily switch to writing mode.
- [ ] User can switch to editing mode.
    - [X] User can switch back and forth.
    - [ ] User gets a gentle confirmation before switching back to editing mode.
- [X] In writing mode, user is frictionlessly prevented from selecting text in all cases.
    - [X] Single-cursor selection is disallowed.
    - [X] Selection with multiple cursors is disallowed.
    - [X] Final placement of cursor follows cursor movement of prevented selection command.
- [ ] In writing mode, user is prevented from deleting text with any deletion key.
