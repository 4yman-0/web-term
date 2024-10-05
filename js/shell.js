'use strict';

import getApp from './app.js';
import parseInput from './inputParser.js';

const _encodeHTML = (str) =>
	str.replace(/[\u00A0-\u9999<>\&]/g, i => '&#'+i.charCodeAt(0)+';')

class Shell {
    hist = ['']
    histIndex = 0
    histMax = 200
    histOn = true

    /**
     * @type {App}
     */
    app = {}

    /**
     * @type {Config}
     */
    cfg = {}

    /**
     * @type {Map}
     */
    cmds = undefined

    /**
     * @param {Config} config
     * @param {Map} commands
     */
    constructor (config, commands){
        this.app = getApp();
        this.cfg = config;
        this.cmds = commands;

        this.app.start();
		this.handleInput = this.handleInput.bind(this);
    }

    start (){
        this.app.termInput.addEventListener('keydown', this.handleInput);
    }

    stop (){
        this.app.termInput.removeEventListener('keydown', this.handleInput);
    }

    handleInput (evt){
		const action = this.app.handleInput(evt);

		switch (action){
			case 1:
				this.execUserInput(this.app.termInput.value);
				this.app.termInput.value = '';
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
            this.app.termInput.value = this.hist[this.histIndex];

            this.app.selectInputEnd();
        }
    }

    histDown (){
        if (this.histIndex < this.hist.length - 1){
            this.histIndex++;
            this.app.termInput.value = this.hist[this.histIndex];

            this.app.selectInputEnd();
        }
    }

    pushHist (input){
        this.hist.pop();
        this.hist.push(input, '');
        if (this.hist.length >= this.histMax){
            this.hist.shift();
        } else {
            this.histIndex++;
        }
    }


	// Wrap composition
    clear (){
		this.app.clear();
    }

    echo (text, pre){
		return this.app.echo(text, pre);
    }

    echoHTML (html, pre){
		return this.app.echoHTML(html, pre);
    }

    echoMultiline (text, pre){
		return this.app.echoMultiline(text, pre);
    }

    echoMultilineHTML (html, pre){
		return this.app.echoMultilineHTML(html, pre);
    }

    exec (input){
		input = parseInput(input);

        let [command, ...args] = input;

        if (this.cmds.has(command)){
            // Execute command with args
            this.cmds.get(command)[1](this, args);
        } else return null;
    }

    execUserInput (input){
        // Echo prompt to screen
        this.echoHTML(`${this.app.termPS1.innerHTML} ${_encodeHTML(input)}`);

        if (!input)
			return;

        if (this.cfg.hist === 'true')
            this.pushHist(input);

        this.app.termPrompt.classList.add('hidden');

		const instructions =
			input.split(';')
		 		 .filter((str) => str.trim());

		for (const instruction of instructions){
        	// Execute, if null is returned, throw error
        	if (this.exec(instruction) === null){
				const name = instruction.split(' ')[0];
        	    this.echoHTML(`<span class="red">${_encodeHTML(name)}: command not found</span>`);
        	}
		}

        this.app.selectInputEnd();
        this.app.termPrompt.classList.remove('hidden');
    }
}

export default Shell;
