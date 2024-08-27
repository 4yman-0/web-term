'use strict';

import App from './app.js';
import commands from './commands.js';
import Config from './config.js';
import Shell from './shell.js';

const app = new App();
const cfg = new Config();
const shell = new Shell(app, cfg, commands);

// "Finally"
shell.start();
