'use strict';

import Config from './config.js'
import Shell from "./shell.js";

const App = {
    init () {
        // Get elements
        this.term = document.getElementById("term");
        this.termOutput = document.getElementById("term_output");
        this.termPrompt = document.getElementById("term_prompt");
        this.termCommand = document.getElementById("term_command");
        this.termInput = document.getElementById("term_input");

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