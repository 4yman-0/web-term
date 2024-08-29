'use strict';

const _$ = (id) => document.getElementById(id);

const _createEchoElem = (pre) =>
	document.createElement(pre ? 'pre' : 'p');

class App {
	static app;

	static getApp (){
		if (!this.app)
			this.app = new App();

		return this.app;
	}

    constructor (){
		this.term =       _$('term');
		this.termOutput = _$('term-output');
		this.termPrompt = _$('term-prompt');
		this.termPS1 =    _$('term-ps1');
		this.termInput =  _$('term-input');
    }

    start (){
        // Reset input value to prevent refill
        this.termInput.value = '';
    }

	clear (){
        this.termOutput.innerHTML = '';
    }

    echo (text = '\n', pre = false){
		const echoElem = _createEchoElem(pre);
		echoElem.textContent = text;
		this.termOutput.appendChild(echoElem);
		return echoElem;
    }

    echoHTML (html = '', pre = false){
		const echoElem = _createEchoElem(pre);
		echoElem.innerHTML = html;
		this.termOutput.appendChild(echoElem);
		return echoElem;
    }

    echoMultiline (text, pre){
        const lines = text.split('\n');
		const fragment = document.createDocumentFragment();

		for (const line of lines){
			const echoElem = _createEchoElem(pre);
			echoElem.textContent = line;

			fragment.appendChild(echoElem);
		}

		this.termOutput.appendChild(fragment);
    }

    echoMultilineHTML (html, pre){
        const lines = html.split('\n');
		const fragment = document.createDocumentFragment();

		for (const line of lines){
			const echoElem = _createEchoElem(pre);
			echoElem.innerHTML = line;

			fragment.appendChild(echoElem);
		}

		this.termOutput.appendChild(fragment);
    }

    /**
     * @param {KeyboardEvent} evt
     */
    handleInput (evt){
        // Completely ignore selection
        const isTextSelected = evt.shiftKey
        || this.termInput.selectionStart
            !== this.termInput.selectionEnd;

        if (isTextSelected && evt.key.startsWith('Arrow')){
            evt.preventDefault();
            return null;
        }

        switch (evt.key){
            case 'Enter':
				return 1;
            case 'ArrowUp':
				return 2;
            case 'ArrowDown':
				return 3;
            default:
                break;
        }
    }

    selectInputEnd (){
        // move I-beam to end of input
        const inputLength = this.termInput.value.length;
        this.termInput.setSelectionRange(
            inputLength,
            inputLength
        );
    }
}

export default App;
