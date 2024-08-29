'use strict';

import cmds from './cmds.js';
import Config from './config.js';
import Shell from './shell.js';

const cfg = new Config();
const shell = new Shell(cfg, cmds);

// "Finally"
shell.start();
