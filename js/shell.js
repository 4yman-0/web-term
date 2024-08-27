'use strict';

class Shell {
    hist = [""]
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
     * @param {App} app 
     * @param {Config} config 
     * @param {Map} commands
     */
    constructor (app, config, commands){
        this.app = app;
        this.cfg = config;
        this.cmds = commands
    }

    init (){
        this.app.termInput.addEventListener("keydown", this.app.handleInput.bind(this));

        this.app.init();
    }

    histUp (){
        if (this.histIndex > 0) {
            this.histIndex--;
            this.app.termInput.value = this.hist[this.histIndex];

            this.app.selectInputEnd();
        }
    }
    histDown (){
        if (this.histIndex < this.hist.length - 1) {
            this.histIndex++;
            this.app.termInput.value = this.hist[this.histIndex];

            this.app.selectInputEnd();
        }
    }
    pushHist (input){
        this.hist.pop();
        this.hist.push(input, "");
        if (this.hist.length >= this.histMax) {
            this.hist.shift();
        } else {
            this.histIndex++;
        }
    }
    clear (){
        this.app.termOutput.innerHTML = "";
    }
    echo (text = "\n", isPre = false){
        const echoElem = document.createElement(isPre ? "pre" : "p");

        echoElem.textContent = text;
        this.app.termOutput.appendChild(echoElem);

        return echoElem;
    }
    echoHTML (html = "", isPre = false){
        const echoElem = document.createElement(isPre ? "pre" : "p");

        echoElem.innerHTML = html;
        this.app.termOutput.appendChild(echoElem);

        return echoElem;
    }
    echoMultiline (multilineText, isPre){
        multilineText.split("\n")
                     .forEach((line) => {this.echo(line, isPre)});
    }
    echoMultilineHTML (multilineHTML, isPre){
        multilineHTML.split("\n")
                     .forEach((line) => {this.echoHTML(line, isPre)});
    }
    exec (input){
		// Replace
		input = input.replace("~", `/home/${this.cfg.username}`);


        const [command, ...args] = input.trim().split(" ");

        if (this.cmds.has(command)) {
            // Execute command with args
            this.cmds.get(command)[1]([this, ...args]);
        } else return null;
    }
    execUserInput (input){
        // Echo prompt to screen
        this.echoHTML(`${this.app.termPS1.innerHTML} ${input}`);

        if (!input) return;

        if (this.histOn) {
            this.pushHist(input);
        }

        const command = input.split(" ")[0];

        this.app.termPrompt.classList.add("hidden");

        // Execute, if null is returned, throw error
        if (this.exec(input) === null) {
            this.echoHTML(`<span class="red">${command}: command not found</span>`);
        }

        this.app.selectInputEnd();
        this.app.termPrompt.classList.remove("hidden");
    }
}

export default Shell;

