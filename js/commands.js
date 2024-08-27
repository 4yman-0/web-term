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
        Shell.echo(args.join(" "));
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
                Shell.hist.forEach((item) => {Shell.echo(item)});
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
        const echo = (e) => Shell.echo(e);
        const nav = navigator;

        // give me permissions

        nav.geolocation.getCurrentPosition(
            (position) => {
                const coords = position.coords;
                echo(`latitude: ${coords.latitude} degrees`);
                echo(`longitude: ${coords.longitude} degrees`);
                echo(`altitude: ${coords.altitude} meters`);
                echo(`accuracy: ${coords.accuracy} meters`);
            },
            ()=>{
                echo("location: unknown");
            },
            {
                enableHighAccuracy: true
            }
        );

        echo(`language: ${nav.language}`);
        echo(`languages: ${nav.languages.join(", ")}`);
        echo(`multitouch: ${nav.maxTouchPoints > 1 ?"supported":"unsupported"}`);
        echo(`platform: ${nav.platform || "unknown"}`);
        echo(`productSub: ${nav.productSub=="20100101"?"firefox":"chrome/safari/other"}`);
        echo(`userAgent: ${nav.userAgent}`)
    }
]);

Commands.set("help", ["show descriptions",
    (args) => {
        const subject = args[0];

        if (Commands.has(subject)) {
            Shell.echo(Commands.get(subject)[0]);
        } else {
            Commands.forEach((command, name) => {
                Shell.echo(`${ name }\t-\t${ command[0] }`, true);
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
                    Shell.echo(Shell.hist[i]);
                }
                break;
            case "clear":
                Shell.hist = [""];
                Shell.histIndex = 0;
                break;
            default:
                Shell.echo("Usage: hist OPERATION");
                Shell.echo("\n")
                Shell.echo('OPERATION: "list" or "clear"');
                break;
        }
    }
]);

Commands.set("nav", ["navigate to url",
    (args) => {
        const [url, name] = args;

        Shell.echo(`Navigating to ${name || url}...`);
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
        Shell.echo("You are THE USER");
        Shell.echo("\n");
        Shell.echo('""', true);
    }
]);

export default Commands;
