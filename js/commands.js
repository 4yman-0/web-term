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

        const configHasName = (name && Config.hasOwnProperty(name));

        switch (command) {
            case "get":
                if (configHasName) {
                    echo(Config[name]);
                }
                break;
            case "set":
                // Prevent string "undefined"
                const value = args[2] || "";

                const propertyIsFuncOrObj = 
                (typeof Config[name] == "function") ||
                (typeof Config[name] == "object");

                if (configHasName && !propertyIsFuncOrObj) {
                    Config[name] = value;
                } else {
                    Shell.echoHTML(
                        `<span class="red">property ${name} does not exist</span>`
                    );
                }
                break;
            default:
// not sure how to deal with this
Shell.echoMultiline(`
Usage: config [COMMAND] [NAME]

COMMAND: get or set
NAME:
  username
  hostname
  workingDir
`, true);
                break;
        }

        Config.updateConfig();
    }
]);

Commands.set("echo", ["Output some text (no quotes)",
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
// not sure how to deal with this
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
            default:
Shell.echoMultiline(`
Usage: hist [COMMAND]

MODE:
  list        show history
  clear       remove all history items
`, true);
                break;
        }
    }
]);

Commands.set("info", ["Get some info about the browser",
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

Commands.set("help", ["show descriptions",
    (args) => {
        const subject = args[0];

        if (Commands.has(subject)) {
            echo(Commands.get(subject)[0]);
        } else {
            Commands.forEach((command, name) => {
                echo(`${ name }\t-\t${ command[0] }`, true);
            });
        }
    }
]);

Commands.set("hist", ["show history",
    (args) => {
        const operation = args[0];

        switch (operation) {
            case "list":
                for (let i = 0; i < Shell.hist.length; i++) {
                    echo(Shell.hist[i]);
                }
                break;
            case "clear":
                Shell.hist = [""];
                Shell.histIndex = 0;
                break;
            default:
                echo("Usage: hist OPERATION");
                echo("\n")
                echo('OPERATION: "list" or "clear"');
                break;
        }
    }
]);

Commands.set("nav", ["navigate to url",
    (args) => {
        const [url, name] = args;

        echo(`Navigating to ${name || url}...`);
        location.href = url;
    }
]);

Commands.set("repo", ["go to repository",
    () => {
        Shell.exec("nav github.com/4yman-el/web-term GitHub");
    }
]);

Commands.set("whoami", ["Who am I?",
    () => {
        echo("You are THE USER");
        echo("\n");
        echo('""', true);
    }
]);

export default Commands;
