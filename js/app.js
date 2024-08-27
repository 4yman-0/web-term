'use strict';

const _$ = (id) => document.getElementById(id);

class App {
    constructor () {
        this.term =         _$("term");
        this.termOutput =   _$("term-output");
        this.termPrompt =   _$("term-prompt");
        this.termPS1 =      _$("term-ps1");
        this.termInput =    _$("term-input");
    }

    init (){
        // Reset input value to prevent refill
        this.termInput.value = "";
    }

    /**
     * @this {Shell}
     * @param {KeyboardEvent} evt
     */
    handleInput (evt){
        // Completely ignore selection
        const isTextSelected = evt.shiftKey
        || this.app.termInput.selectionStart
            !== this.app.termInput.selectionEnd;
        
        if (isTextSelected && evt.key.startsWith("Arrow")) {
            evt.preventDefault();
            return;
        }

        switch (evt.key) {
            case "Enter":
                this.execUserInput(this.app.termInput.value);
                this.app.termInput.value = "";
                break;
            case "ArrowUp":
                this.histUp();
                break;
            case "ArrowDown":
                this.histDown();
                break;
            default:
                break;
        }
    }

    selectInputEnd (){
        // move I-beam to end of input
        const inputLength = this.termInput.value.length;
        this.termInput.setSelectionRange(
            inputLength,
            inputLength
        );
    }

    /**
     * @type {HTMLElement|null}
     */
    term = null
    /**
     * @type {HTMLElement|null}
     */
    termOutput = null
    /**
     * @type {HTMLElement|null}
     */
    termPrompt = null
    /**
     * @type {HTMLElement|null}
     */
    termPS1 = null
    /**
     * @type {HTMLElement|null}
     */
    termInput = null
}

export default App;
