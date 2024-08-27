'use strict';

/**
  *    `Commands` is a `Map` where:
  *    - Keys are strings.
  *    - Values are arrays of length 2 with
  *    the description and the function respectively.
  * 
  * ```javascript
  * Commands.set("example", ["example command",
  *     (args) => {
  *         echo("example!");
  *         echo(args);
  *     }
  * ]);
  * ```
  * @type {Map<String,Array>}
  */
const commands = new Map();


commands.set("clear", ["Clear the screen",
    (args) => {
        const shell = args[0];
        shell.clear();
    }
]);

commands.set("config", ["Configure the terminal",
    (args) => {
        const configNotFound = (name) => {
            shell.echoHTML(`<span class="red"> Configuration ${name} not found </span>`);
        }

        let [shell, command, name = "", value = ""] = args;

        switch (command) {
            case "list":
                shell.echoMultiline(
                    "Valid configurations:\n" + shell.cfg.validConfig.join("\n")
                );
                break;
            case "get":
                let getVal = shell.cfg.get(name);
                if (getVal) {
                    shell.echo(getVal);
                } else {
                    configNotFound(name);
                }
                break;
            case "set":
                let setVal = shell.cfg.set(name, value);

                if (setVal) {
                    shell.echo(`Configuration ${name} is now ${value}`);
                } else {
                    configNotFound(name);
                }
                break;
            default:
// Not sure how to deal with this
shell.echoMultiline(`
Usage: config COMMAND [NAME] [VALUE]

COMMAND:
  list
  get
  set
NAME:
${
    "  " + shell.cfg.validConfig.join("\n  ")
}
`, true);
                break;
        }

        shell.cfg.updateConfig.call(shell);
    }
]);

commands.set("echo", ["Output text (no quotes)",
    (args) => {
        const [shell, ...message] = args;
        shell.echo(message.join(" "));
    }
]);

commands.set("exit", ["Exit the terminal",
    (args) => {
        const [shell, command] = args;

        switch (command) {
            case "restart":
                location.reload();
                break;
            case "shutdown":
                close();
                break;
            default:
shell.echoMultiline(`
Usage: exit [COMMAND]

COMMAND:
  restart     reload the terminal
  shutdown    close the terminal
`, true);
                break;
        }
    }
]);


commands.set("hist", ["Manipulate terminal history",
    (args) => {
        let [shell, command] = args;

        switch (command) {
            case "list":
                // List terminal history
                shell.hist.forEach((item) => { shell.echo(item) });
                break;
            case "clear":
                shell.hist = [""];
                shell.histIndex = 0;
                break;
            case "on":
                shell.histOn=true;
                break;
            case "off":
                shell.histOn=false;
                break;
            default:
shell.echoMultiline(`
Usage: hist COMMAND

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

commands.set("help", ["Show descriptions",
    (args) => {
<<<<<<< HEAD
<<<<<<< HEAD
        const subject = args[0];

        if (Commands.has(subject)) {
            echo(Commands.get(subject)[0]);
        } else {
            Commands.forEach((command, name) => {
=======
        if (args[0] == undefined) {
            commands.forEach((command, name) => {
>>>>>>> b07e1ef (untested update)
                echo(`${ name }\t-\t${ command[0] }`, true);
=======
        const [shell, command] = args;
        if (command == undefined) {
            commands.forEach((command, name) => {
                shell.echo(`${ name }\t-\t${ command[0] }`, true);
>>>>>>> ff07278 (Big JS update)
            });
            return;
        }
        if (commands.has(command)) {
            shell.echo(commands.get(command)[0]);
        } else {
            shell.echoHTML(`<span class="red">Command ${command} not found</span>`);
        }
    }
]);

export default commands;
