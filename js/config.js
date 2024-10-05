'use strict';

import Shell from './shell.js';

class Config {

    username = 'user'
    hostname = 'web-term'
	hist = 'true'
    workingDir = '~'

    validConfig = [
        'username',
        'hist',
        'hostname',
        'workdir'
    ]

    get (name){
        return this.validConfig.includes(name) ? this[name] : null;
    }

    set (name, value){
        const configRegex = new Map ([
            ['username', /^[a-z][-a-z0-9]*$/],
            ['hostname', /^([a-zA-Z0-9]{1,63}.)+$/],
            ['hist', /^(true|false)$/],
            ['workdir', /^[/~]\0+$/],
        ]);

        if (this.validConfig.includes(name)
            && configRegex.get(name).test(value)){
                this[name] = value;
                return true;
        } else return null;
    }

    update (termPS1){
        termPS1.innerHTML
         = `<span class="green">${this.username}@${this.hostname}</span>`
         + `:<span class="blue">${this.workingDir}</span>$ `;
    }
}

export default Config;
