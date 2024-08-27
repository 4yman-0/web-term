'use strict';

import Shell from "./shell.js";

const App = {
    init () {
        App.term = document.getElementById("term");
        App.term_output = document.getElementById("term_output");
        App.term_prompt = document.getElementById("term_prompt");
        App.term_command = document.getElementById("term_command");
        App.term_input = document.getElementById("term_input");

        App.term_input.value = "";
        App.term_input.addEventListener("keydown", App.handleInput);
    },
    handleInput (evt){
        switch (evt.key) {
            case "Enter":
                Shell.execUserInput(App.term_input.value);
                App.term_input.value = "";
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