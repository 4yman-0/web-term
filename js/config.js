'use strict';

import App from './app.js';
import Shell from './shell.js';

const Config = {
    username: "user",
    hostname: "web-term",
    workingDir: "~",

    validConfig: [
        "username",
        "hostname",
        "workingDir"
    ],

    setUsername(val){
        if (typeof val !== "string") return;

        if (/^[a-z][-a-z0-9]*$/.test(val)) {
            this.username = val;
        } else {
            Shell.echoHTML('<span class="red">Invalid username</span>');
        }
    },
    setHostname(val){
        if (typeof val !== "string") return;

        if (/^([a-zA-Z0-9]{1,63}.)+$/.test(val)) {
            this.hostname = val;
        } else {
            Shell.echoHTML('<span class="red">Invalid hostname</span>');
        }
    },
    setWorkingDir(val){
        if (typeof val !== "string") return;

        if (/^[/~](?:[^/\0]+\/?)*$/.test(val)) {
            this.workingDir = val;
        } else {
            Shell.echoHTML('<span class="red">Invalid working directory</span>');
        }
    },    

    updateConfig (){
        App.termPS1.innerHTML = `<span class="green">${this.username}@${this.hostname}</span>:<span class="blue">${this.workingDir}</span>$ `;
    }
};

export default Config;