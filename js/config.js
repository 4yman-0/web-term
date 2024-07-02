'use strict';

import App from './app.js';

const Config = {
    username: "user",
    hostname: "web-term",
    workingDir: "~",

    updateConfig (){
        App.termCommand.innerHTML = `<span class="green">${this.username}@${this.hostname}</span>:<span class="blue">${this.workingDir}</span>$ `;
    }
};

export default Config;