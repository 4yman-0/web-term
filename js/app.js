'use strict';

import Config from './config.js'
import Shell from "./shell.js";

const App = {
    init () {
        // Get elements
        this.term = document.getElementById("term");
        this.termOutput = document.getElementById("term-output");
        this.termPrompt = document.getElementById("term-prompt");
        this.termPS1 = document.getElementById("term-ps1");
        this.termInput = document.getElementById("term-input-hidden");
        this.termInputDisplay = document.getElementById("term-input-display");
        this.termInputBlink = document.getElementById("term-input-blink");

        // Update config
        Config.updateConfig();

        // Reset input value to prevent refill
        this.termInput.value = "";

        // Add event listener
        this.termPrompt.addEventListener("click", this.focusInput.bind(this));
        this.termInput.addEventListener("keydown", this.handleInput.bind(this));
        this.termInput.addEventListener("input", this.updateInput.bind(this));
        this.termInput.addEventListener("input", this.updateCursor.bind(this, 0));
        this.termInput.addEventListener("focus", this.focusInput.bind(this));
        this.termInput.addEventListener("blur", this.blurInput.bind(this));
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
                this.updateCursor();
                break;
            case "ArrowDown":
                Shell.histDown();
                this.updateInput();
                this.updateCursor();
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
    updateCursor (offset = 0){
        const inputLength = this.termInput.value.length;
        let inputCaret = this.termInput.selectionStart + offset;

        // check if offset is out-of-bound
        if (inputCaret === -1 || inputCaret > inputLength) inputCaret -= offset;
        
        const caretRight = inputLength - inputCaret;

        this.termInputBlink
            .style.right = `${caretRight}ch`;
    }
};

export default App;