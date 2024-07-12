'use strict';

import Shell from './shell.js';
import Config from './config.js';

// set shortcut for `Shell.echo`
const echo = (m, pre) => Shell.echo(m, pre);

const Commands = new Map();

/*
    `Commands` is a `Map` where:
    - Keys are strings.
    - Values are arrays of length 2 with
    the description and the function respectively.

Commands.set("example", ["example",
    (args) => {
        echo("example!");
        echo(args);
    }
]);
*/

Commands.set("clear", ["Clear the screen",
    () => {
        Shell.clear();
    }
]);

Commands.set("config", ["Configure the terminal",
    (args) => {
        const [command, name] = args;

        switch (command) {
            case "get":
                if (Config.validConfig.includes(name)) {
                    echo(Config[name]);
                } else {
                    Shell.echoHTML(`<span class="red"> Config ${name} not found </span>`);
                }
                break;
            case "set":
                // Prevent string "undefined"
                const value = args[2] || "";

                if (Config.validConfig.includes(name)) {
                    // Hack, calls "set" + name
                    Config["set" + name](value);
                } else {
                    Shell.echoHTML(`<span class="red"> Config ${name} not found </span>`);
                }
                break;
            default:
// not sure how to deal with this
Shell.echoMultiline(`
Usage: config [COMMAND] [NAME] [VALUE]

COMMAND:
  get
  set
NAME:
${
    "  " + Config.validConfig.join("\n  ")
}
`, true);
                break;
        }

        Config.updateConfig();
    }
]);

Commands.set("echo", ["Output text (no quotes)",
    (args) => {
        echo(args.join(" "));
    }
]);

Commands.set("exit", ["Exit the terminal",
    (args) => {
        let command = args[0];

        switch (command) {
            case "restart":
                location.reload();
                break;
            case "shutdown":
                window.close();
                break;
            default:
Shell.echoMultiline(`
Usage: exit [COMMAND]

COMMAND:
  restart     reload the terminal
  shutdown    close the terminal
`, true);
                break;
        }
    }
]);


Commands.set("hist", ["Manipulate terminal history",
    (args) => {
        let command = args[0];

        switch (command) {
            case "list":
                // List terminal history
                Shell.hist.forEach((item) => {echo(item)});
                break;
            case "clear":
                Shell.hist = [""];
                Shell.histIndex = 0;
                break;
            case "on":
                Shell.histOn=true;
                break;
            case "off":
                Shell.histOn=false;
                break;
            default:
Shell.echoMultiline(`
Usage: hist [COMMAND]

COMMAND:
  list        show history
  clear       remove all history items
  on          enable history
  off         disable history
`, true);
                break;
        }
    }
]);

Commands.set("info", ["Get info about the browser",
    () => {
        const nav = navigator;

Shell.echoMultiline(`
language:   ${nav.language}
languages:  ${nav.languages.join(", ")}
multitouch: ${nav.maxTouchPoints > 1 ?"supported":"unsupported"}
platform:   ${nav.platform || "unknown"}
productSub: ${nav.productSub=="20100101"?"firefox":"chromium/safari"}
userAgent:  ${nav.userAgent}
`);
    }
]);

Commands.set("help", ["Show descriptions",
    (args) => {
        if (Commands.has(args[0])) {
            echo(Commands.get(args[0])[0]);
        } else {
            Commands.forEach((command, name) => {
                echo(`${ name }\t-\t${ command[0] }`, true);
            });
        }
    }
]);

export default Commands;