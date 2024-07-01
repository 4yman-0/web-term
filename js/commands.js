'use strict';

//import App from './app';
import Shell from './shell.js';
import Config from './config.js'

const echo = (m, pre) => Shell.echo(m, pre);

const Commands = new Map();

/*
    `Commands` is a `Map` where:
    - Keys are strings.
    - Values are arrays of length 2 with
    the description and the function respectively.

Commands.set("example", ["example",
    (args) => {
        Shell.echo("example!");
        Shell.echo(args);
    }
]);
*/

Commands.set("clear", ["Clear the screen",
    () => {
        Shell.clear();
    }
]);

Commands.set("config", ["Configure the terminal",
    () => {
        echo("Not Implemented");
    }
]);

Commands.set("echo", ["Output some text (no quotes)",
    (args) => {
        echo(args.join(" "));
    }
]);

Commands.set("exit", ["Exit the terminal",
    (args) => {
        let mode = args[0] || "help";

        switch (mode) {
            case "restart":
                location.reload();
                break;
            case "shutdown":
                window.close();
                break;
            default:
                echo("Usage: exit [MODE]");
                echo();
                echo('MODE:');
                echo('  restart     reload the terminal', true);
                echo('  shutdown    close the terminal', true);
                break;
        }
    }
]);


Commands.set("hist", ["Manipulate terminal history",
    (args) => {
        let command = args[0] || "help";

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
                echo("Usage: hist [COMMAND]");
                echo();
                echo('COMMAND:');
                echo(' list     show history', true);
                echo(' clear    remove all history items', true);
                break;
        }
    }
]);

Commands.set("info", ["Get some info about the browser",
    () => {
        const nav = navigator;

        echo(`language: ${nav.language}`);
        echo(`languages: ${nav.languages.join(", ")}`);
        echo(`multitouch: ${nav.maxTouchPoints > 1 ?"supported":"unsupported"}`);
        echo(`platform: ${nav.platform || "unknown"}`);
        echo(`productSub: ${nav.productSub=="20100101"?"firefox":"chrome/safari/other"}`);
        echo(`userAgent: ${nav.userAgent}`)
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