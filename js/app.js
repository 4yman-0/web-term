'use strict';

const _$ = (id) => document.getElementById(id);


let term,termOutput,termPrompt,termPS1,termInput;

const _initGlobalDOM = () => {
    term =       _$("term");
    termOutput = _$("term-output");
    termPrompt = _$("term-prompt");
    termPS1 =    _$("term-ps1");
    termInput =  _$("term-input");
}

class App {
    constructor () {
        if (!term) {
            _initGlobalDOM();
        }
        // Set from global (module) vars
        this.term       = term;
        this.termOutput = termOutput;
        this.termPrompt = termPrompt;
        this.termPS1    = termPS1;
        this.termInput  = termInput;
    }

    start (){
        // Reset input value to prevent refill
        this.termInput.value = "";
    }

    /**
     * @param {KeyboardEvent} evt
     */
    handleInput (evt){
        // Completely ignore selection
        const isTextSelected = evt.shiftKey
        || this.termInput.selectionStart
            !== this.termInput.selectionEnd;

        if (isTextSelected && evt.key.startsWith("Arrow")) {
            evt.preventDefault();
            return null;
        }

        switch (evt.key) {
            case "Enter":
				return 1;
            case "ArrowUp":
				return 2;
            case "ArrowDown":
				return 3;
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
}

export default App;
