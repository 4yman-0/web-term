'use strict';

import App from './app.js';
import Commands from './commands.js';

const Shell = {
    hist: [""],
    histIndex: 0,
    histMax: 200,
    histOn: true,

    histUp (){
        if (Shell.histIndex > 0) {
            Shell.histIndex--;
            App.termInput.value = Shell.hist[Shell.histIndex];

            // move I-beam to end of input
            // Already done by browser
        }
    },
    histDown (){
        if (Shell.histIndex < Shell.hist.length - 1) {
            Shell.histIndex++;
            App.termInput.value = Shell.hist[Shell.histIndex];

            // move I-beam to end of input
            App.termInput.setSelectionRange(
                App.termInput.value.length,
                App.termInput.value.length
            );
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
    echo (text = "\n", isPre = false){
        const echoElem = document.createElement(isPre ? "pre" : "p");

        echoElem.textContent = text;
        App.termOutput.appendChild(echoElem);

        return echoElem;
    },
    echoHTML (html = "", isPre = false){
        const echoElem = document.createElement(isPre ? "pre" : "p");

        echoElem.innerHTML = html;
        App.termOutput.appendChild(echoElem);

        return echoElem;
    },
    echoMultiline (multilineText, isPre){
        multilineText.trim()
                     .split("\n")
                     .forEach((line) => {this.echo(line, isPre)});
    },
    echoMultilineHTML (multilineHTML, isPre){
        multilineHTML.trim()
                     .split("\n")
                     .forEach((line) => {this.echoHTML(line, isPre)});
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
        Shell.echoHTML(`${App.termPS1.innerHTML} ${input}`);

        if (!input) return;

        if (Shell.histOn) {
            Shell.pushHist(input);
        }

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
