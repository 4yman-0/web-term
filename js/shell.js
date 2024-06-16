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
            App.term_input.value = Shell.hist[Shell.histIndex];
        }
    },
    histDown (){
        if (Shell.histIndex < Shell.hist.length - 1) {
            Shell.histIndex++;
            App.term_input.value = Shell.hist[Shell.histIndex];
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
        App.term_output.innerHTML = "";
    },
    echo (text = "\n", pre = false){
        const echoElem = document.createElement(pre ? "pre" : "p");
        echoElem.innerText = text;
        App.term_output.appendChild(echoElem);
        return echoElem;
    },
    echoHTML (html = "", pre = false){
        const echoElem = document.createElement(pre ? "pre" : "p");
        echoElem.innerHTML = html;
        App.term_output.appendChild(echoElem);
        return echoElem;
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
        Shell.echoHTML(`<span class="green">user@web-term</span>:<span class="blue">~</span>$ ${input}`);

        // If input is empty, do nothing
        if (!input) return;

        Shell.pushHist(input);

        const command = input.split(" ")[0];

        App.term_prompt.classList.add("hidden");

        if (Shell.exec(input) === null) {
            Shell.echoHTML(`<span class="red">${command}: command not found</span>`);
        }

        App.term_prompt.classList.remove("hidden");
    }
};

export default Shell;