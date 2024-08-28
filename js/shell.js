'use strict';

import AppUI from "./appUI.js";
import inputParser from "./inputParser.js";

class Shell {
    hist = [""]
    histIndex = 0
    histMax = 200
    histOn = true

    /**
     * @type {AppUI}
     */
    appUI = {}

    /**
     * @type {Config}
     */
    cfg = {}

    /**
     * @type {Map}
     */
    cmds = undefined

    /**
     * @param {AppUI} appUI
     * @param {Config} config
     * @param {Map} commands
     */
    constructor (appUI, config, commands){
        this.appUI = appUI;
        this.cfg = config;
        this.cmds = commands;

		this.handleInput = this.handleInput.bind(this);
    }

    start (){
        this.appUI.termInput.addEventListener("keydown", this.handleInput);
        this.appUI.start();
    }

    stop (){
        this.appUI.termInput.removeEventListener("keydown", this.handleInput);
    }

    handleInput (evt){
		const action = this.appUI.handleInput(evt);

		switch (action){
			case 1:
				this.execUserInput(this.appUI.termInput.value);
				this.appUI.termInput.value = "";
				break;
			case 2:
				this.histUp();
				break;
			case 3:
				this.histDown();
				break;
			default:
				break;
		}
    }

    histUp (){
        if (this.histIndex > 0){
            this.histIndex--;
            this.appUI.termInput.value = this.hist[this.histIndex];

            this.appUI.selectInputEnd();
        }
    }

    histDown (){
        if (this.histIndex < this.hist.length - 1){
            this.histIndex++;
            this.appUI.termInput.value = this.hist[this.histIndex];

            this.appUI.selectInputEnd();
        }
    }

    pushHist (input){
        this.hist.pop();
        this.hist.push(input, "");
        if (this.hist.length >= this.histMax){
            this.hist.shift();
        } else {
            this.histIndex++;
        }
    }


	// Wrap composition
    clear (){
		this.appUI.clear();
    }

    echo (text, pre){
		this.appUI.echo(text, pre);
    }

    echoHTML (html, pre){
		this.appUI.echoHTML(html, pre);
    }

    echoMultiline (text, pre){
		this.appUI.echoMultiline(text, pre);
    }

    echoMultilineHTML (html, pre){
		this.appUI.echoMultilineHTML(html, pre);
    }

    exec (input){
		// Replace
		input = inputParser.parse(input);

        const [command, ...args] = input;

        if (this.cmds.has(command)){
            // Execute command with args
            this.cmds.get(command)[1]([this, ...args]);
        } else return null;
    }

    execUserInput (input){
        // Echo prompt to screen
        this.echoHTML(`${this.appUI.termPS1.innerHTML} ${input}`);

        if (!input) return;

        if (this.histOn){
            this.pushHist(input);
        }

        const command = input.split(" ")[0];

        this.appUI.termPrompt.classList.add("hidden");

        // Execute, if null is returned, throw error
        if (this.exec(input) === null){
            this.echoHTML(`<span class="red">${command}: command not found</span>`);
        }

        this.appUI.selectInputEnd();
        this.appUI.termPrompt.classList.remove("hidden");
    }
}

export default Shell;
