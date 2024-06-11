'use strict';

import App from './app.js';
import Commands from './commands.js';

const Shell = {
    hist: [""],
    histIndex: 0,
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
        Shell.histIndex++;
    },
    clear (){
        App.term_output.innerHTML = "";
    },
    echo (text, pre = false){
        const echoElem = document.createElement(pre ? "pre" : "p");
        echoElem.innerText = text;
        App.term_output.appendChild(echoElem);
        return echoElem;
    },
    echoHTML (html, pre = false){
        const echoElem = document.createElement(pre ? "pre" : "p");
        echoElem.innerHTML = html;
        App.term_output.appendChild(echoElem);
        return echoElem;
    },
    execUserInput (input){
        Shell.pushHist(input);

        // Echo prompt to screen
        Shell.echoHTML(`<span class="green">user@web-term</span>:<span class="blue">~</span>$ ${input}`);

        // If input is empty, do nothing
        if (!input) return;

        const [command, ...args] = input.trim().split(" ");

        App.term_prompt.classList.add("hidden");

        if (Commands.has(command)) {
            // Execute command with args
            Commands.get(command)[1](args);
        } else {
            Shell.echoHTML(`<span class="red">${command}: command not found</span>`);
        }

        App.term_prompt.classList.remove("hidden");
    }
};

export default Shell;