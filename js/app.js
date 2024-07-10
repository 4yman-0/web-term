'use strict';

import Config from './config.js'
import Shell from "./shell.js";

const _$ = (id) => document.getElementById(id);

const App = {
    async init () {
        // Get elements
        this.term =         _$("term");
        this.termOutput =   _$("term-output");
        this.termPrompt =   _$("term-prompt");
        this.termPS1 =      _$("term-ps1");
        this.termInput =    _$("term-input-hidden");
        this.termInputDisplay = _$("term-input-display");
        this.termInputBlink =   _$("term-input-blink");

        // Update config
        Config.updateConfig();

        // Reset input value to prevent refill
        this.termInput.value = "";

        // Add event listener
        this.termPrompt.addEventListener("click",   this.focusInput .bind(this));
        this.termInput.addEventListener("keydown",  this.handleInput .bind(this));
        this.termInput.addEventListener("input",    this.updateInput .bind(this));
        this.termInput.addEventListener("input",    this.updateCursor.bind(this, 0));
        this.termInput.addEventListener("focus",    this.focusInput .bind(this));
        this.termInput.addEventListener("blur",     this.blurInput  .bind(this));
    },
    handleInput (evt){
        switch (evt.key) {
            case "Enter":
                Shell.execUserInput(this.termInput.value);
                this.termInput.value = "";
                this.termInputDisplay.textContent = "";
                break;
            case "ArrowUp":
                Shell.histUp();
                this.updateInput();
                this.updateCursor("begin");
                break;
            case "ArrowDown":
                Shell.histDown();
                this.updateInput();
                this.updateCursor("end");
                break;
            case "ArrowLeft":
                this.updateCursor(-1);
                break;
            case "ArrowRight":
                this.updateCursor(1);
                break;
            default:
                break;
        }
    },
    updateInput() {
        this.termInputDisplay.textContent = this.termInput.value;
    },
    focusInput() {
        // Check nothing is selected
        if(getSelection().toString().length === 0) {
            this.termInputBlink.classList.add('blink-active');
            this.termInput.focus();
        }
    },
    blurInput() {
        this.termInputBlink.classList.remove('blink-active');
    },
    updateCursor(offset = 0) {
        const inputLength = this.termInput.value.length;
        let inputCaret = this.termInput.selectionStart;

        if (offset === "begin") {
            inputCaret = 0;
        } else if (offset === "end") {
            inputCaret = inputLength;
        } else if (typeof offset === "number") {
            inputCaret += offset;
        } else return null;

        // Check if offset is out-of-bound
        if (inputCaret < 0 || inputCaret > inputLength) {
            inputCaret -= offset; // revert to previous caret position
        }

        const caretRight = inputLength - inputCaret;
        this.termInputBlink.style.right = `${caretRight}ch`;

        const isTextSelected = inputCaret !== this.termInput.selectionEnd
                            && inputCaret !== inputLength;

        if (isTextSelected) {
            this.termInputBlink.style.width = `${
                Math.max(inputCaret, this.termInput.selectionEnd) - 
                Math.min(inputCaret, this.termInput.selectionEnd)
            }ch`;

            console.debug(inputCaret, this.termInput.selectionEnd, this.termInputBlink.style.width);
        } else {
            this.termInputBlink.style.width = "1ch";
            console.debug("reset!");
        }
    }
};

export default App;