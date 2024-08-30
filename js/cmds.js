'use strict';

/**
  *    `Commands` is a `Map` where:
  *    - Keys are strings.
  *    - Values are arrays of length 2 with
  *    the description and the function respectively.
  *
  * ```javascript
  * Commands.set('example', ['example command',
  *     (shell, args) => {
  *         shell.echo('example!');
  *         shell.echo(args.join(', '));
  *     }
  * ]);
  * ```
  * @type {Map<String,Array>}
  */
const cmds = new Map();


cmds.set('clear', ['Clear the screen',
    (shell) => {
        shell.clear();
    }
]);

cmds.set('config', ['Configure the terminal',
    (shell, args) => {
        const configNotFound = (name) => {
            shell.echoHTML(`<span class="red"> Configuration ${name} not found </span>`);
        }

        let [command, name = '', value = ''] = args;

        switch (command){
            case 'list':
                shell.echoMultiline(
                    'Valid configurations:\n' + shell.cfg.validConfig.join('\n')
                );
                break;
            case 'get':
                let getVal = shell.cfg.get(name);
                if (getVal){
                    shell.echo(getVal);
                } else {
                    configNotFound(name);
                }
                break;
            case 'set':
                let setVal = shell.cfg.set(name, value);

                if (setVal){
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
    '  ' + shell.cfg.validConfig.join('\n  ')
}
`, true);
                break;
        }

        shell.cfg.update.call(shell);
    }
]);

cmds.set('echo', ['Output text',
    (shell, message) => {
        shell.echo(message.join(' '));
    }
]);

cmds.set('exit', ['Exit the terminal',
    (shell, args) => {
        const command = args[0];

        switch (command){
            case 'restart':
                location.reload();
                break;
            case 'shutdown':
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


cmds.set('hist', ['Manipulate terminal history',
    (shell, args) => {
        let command = args[0];

        switch (command){
            case 'list':
                // List terminal history
                shell.hist.forEach((item) => { shell.echo(item) });
                break;
            case 'clear':
                shell.hist = [''];
                shell.histIndex = 0;
                break;
            case 'on':
                shell.histOn=true;
                break;
            case 'off':
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

cmds.set('help', ['Show descriptions',
    (shell, args) => {
        const command = args[0];

        if (command == undefined){
			shell.echo('Commands:');
            cmds.forEach((command, name) => {
                shell.echo(`\t${ name }\t-\t${ command[0] }`, true);
            });
            return;
        }
        if (cmds.has(command)){
            shell.echo(cmds.get(command)[0]);
        } else {
            shell.echoHTML(`<span class="red">Command ${command} not found</span>`);
        }
    }
]);

export default cmds;
