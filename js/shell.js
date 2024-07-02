'use strict';

import App from './app.js';
import Commands from './commands.js';

const Shell = {
    hist: [""],
    histIndex: 0,
    histMax: 200,

    histUp (){
        if (Shell.histIndex > 0) {
            Shell.histIndex--;
            App.termInput.value = Shell.hist[Shell.histIndex];
        }
    },
    histDown (){
        if (Shell.histIndex < Shell.hist.length - 1) {
            Shell.histIndex++;
            App.termInput.value = Shell.hist[Shell.histIndex];
        }
    },
    pushHist (input){
        Shell.hist.pop();
        Shell.hist.push(input, "");
        if (Shell.hist.length >= Shell.histMax) {
            Shell.hist.shift();
        } else {
            Shell.histIndex++;
        }
    },
    clear (){
        App.termOutput.innerHTML = "";
    },
    echo (text = "\n", pre = false){
        const echoElem = document.createElement(pre ? "pre" : "p");

        echoElem.textContent = text;
        App.termOutput.appendChild(echoElem);

        return echoElem;
    },
    echoHTML (html = "", pre = false){
        const echoElem = document.createElement(pre ? "pre" : "p");

        echoElem.innerHTML = html;
        App.termOutput.appendChild(echoElem);

        return echoElem;
    },
    echoMultiline (multilineText, pre){
        // Split line breaks
        const textArray = multilineText.trim().split("\n");

        textArray.forEach((line) => {this.echo(line, pre)});
    },
    echoMultilineHTML (multilineHTML, pre){
        const htmlArray = multilineHTML.trim().split("\n");

        htmlArray.forEach((line) => {this.echoHTML(line, pre)});
    },
    exec (input){
        const [command, ...args] = input.trim().split(" ");

        if (Commands.has(command)) {
            // Execute command with args
            Commands.get(command)[1](args);
        } else {
            return null;
        }
    },
    execUserInput (input){
        // Echo prompt to screen
        Shell.echoHTML(`${App.termCommand.innerHTML} ${input}`);

        if (!input) return;

        Shell.pushHist(input);

        const command = input.split(" ")[0];

        App.termPrompt.classList.add("hidden");

        // Execute, if null is returned, throw error
        if (Shell.exec(input) === null) {
            Shell.echoHTML(`<span class="red">${command}: command not found</span>`);
        }

        App.termPrompt.classList.remove("hidden");
    }
};

export default Shell;