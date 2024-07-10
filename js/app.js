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
        this.termInput =    _$("term-input");

        // Update config
        Config.updateConfig();

        // Reset input value to prevent refill
        this.termInput.value = "";

        // Add event listener
        this.termInput.addEventListener("keydown", this.handleInput.bind(this));
    },
    handleInput (evt){
        switch (evt.key) {
            case "Enter":
                Shell.execUserInput(this.termInput.value);
                this.termInput.value = "";
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
    }
};

export default App;