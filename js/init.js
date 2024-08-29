'use strict';

import commands from './commands.js';
import Config from './config.js';
import Shell from './shell.js';

const cfg = new Config();
const shell = new Shell(cfg, commands);

// "Finally"
shell.start();
