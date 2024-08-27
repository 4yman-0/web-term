'use strict';

const _$ = (id) => document.getElementById(id);


let term,termOutput,termPrompt,termPS1,termInput;

const initGlobalDOM = () => {
    if (term !== null) return;

    term =       _$("term");
    termOutput = _$("term-output");
    termPrompt = _$("term-prompt");
    termPS1 =    _$("term-ps1");
    termInput =  _$("term-input");
}

class App {
    constructor () {
        if (term === null) {
            initGlobalDOM();
        }
        // Set from global (module) vars
        this.term =       term;
        this.termOutput = termOutput;
        this.termPrompt = termPrompt;
        this.termPS1 =    termPS1;
        this.termInput =  termInput;
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
            return null;
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
