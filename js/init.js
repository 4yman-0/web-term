'use strict';

import AppUI from './appUI.js';
import commands from './commands.js';
import Config from './config.js';
import Shell from './shell.js';

const appUI = new AppUI();
const cfg = new Config();
const shell = new Shell(appUI, cfg, commands);

// "Finally"
shell.start();
