'use strict';

import Shell from './shell.js';

class Config {

    username = "user"
    hostname = "web-term"
    workingDir = "~"

    validConfig = [
        "username",
        "hostname",
        "workdir"
    ]

    get (name){
        return this.validConfig.includes(name) ? this[name] : null;
    }

    set (name, value){
        const configRegex = new Map ([
            ["username", /^[a-z][-a-z0-9]*$/],
            ["hostname", /^([a-zA-Z0-9]{1,63}.)+$/],
            ["workdir", /^[/~]\0+$/],
        ]);

        if (this.validConfig.includes(name)
            && configRegex.get(name).test(value)) {
                this[name] = value;
                return true;
        } else return null;
    }

    setusername(val){
        if (typeof val !== "string") return;

        const usernameRegex = /^[a-z][-a-z0-9]*$/;

        if (usernameRegex.test(val)) {
            this.username = val;
        } else return null;
    }
    sethostname(val){
        if (typeof val !== "string") return;

        const hostnameRegex = /^([a-zA-Z0-9]{1,63}.)+$/

        if (hostnameRegex.test(val)) {
            this.hostname = val;
        } else return null;
    }
    setworkdir(val){
        if (typeof val !== "string") return;

        const workingDirRegex = /^[/~]\0+$/

        if (workingDirRegex.test(val)) {
            this.workingDir = val;
        } else return null;
    }

    /**
     * @this {Shell}
     */
    updateConfig (){
        this.app.termPS1.innerHTML
         = `<span class="green">${this.cfg.username}@${this.cfg.hostname}</span>`
         + `:<span class="blue">${this.cfg.workingDir}</span>$ `;
    }
}

export default Config;