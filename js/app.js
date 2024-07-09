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
        this.termInput.addEventListener("input", this.displayInput.bind(this));
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
                break;
            case "ArrowDown":
                Shell.histDown();
                break;
            default:
                break;
        }
    },
    displayInput() {
        this.termInputDisplay.textContent = this.termInput.value;
    },
    focusInput (evt){
        evt.preventDefault();
        this.termInput.focus();
    },
    focusInput() {
        this.termInputBlink.classList.add('blink-active');
        this.termInput.focus();
    },
    blurInput() {
        this.termInputBlink.classList.remove('blink-active');
    }
};

export default App;