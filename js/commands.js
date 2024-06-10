'use strict';

const Commands = new Map();

/*
    Keys are strings and values are arrays of length 2 with
    the description and the function respectively.

Commands.set("example", ["example",
    (args) => {
        Shell.echo("example!\n" + args);
    }
]);
*/

Commands.set("clear", ["Clear the screen",
    () => {
        Shell.clear();
    }
]);

Commands.set("echo", ["Output some text (no quotes)",
    (args) => {
        Shell.echo(args.join(" "));
    }
]);

Commands.set("help", ["Echo descriptions",
    (args) => {
        if (Commands.has(args[0])) {
            Shell.echo(Commands.get(args[0])[0]);
        } else {
            Commands.forEach((command, name) => {
                Shell.echo(`${name} - ${command[0]}`);
            });
        }
    }
]);