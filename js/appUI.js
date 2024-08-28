import App from './app.js';

const _createEchoElem = (pre) => {
	return document.createElement(pre ? "pre" : "p");
}

class AppUI extends App {

	constructor (){
		super();
	}

    clear (){
        this.termOutput.innerHTML = "";
    }

    echo (text = "\n", pre = false){
		const echoElem = _createEchoElem(pre);
		echoElem.textContent = text || "";
		this.termOutput.appendChild(echoElem);
		return echoElem;
    }

    echoHTML (html = "", pre = false){
		const echoElem = _createEchoElem(pre);
		echoElem.innerHTML = html || "";
		this.termOutput.appendChild(echoElem);
		return echoElem;
    }

    echoMultiline (text, pre){
        const lines = text.split("\n");
		const fragment = document.createDocumentFragment();

		for (const line of lines){
			const echoElem = _createEchoElem(pre);
			echoElem.textContent = line;

			fragment.appendChild(echoElem);
		}

		this.termOutput.appendChild(fragment);
    }

    echoMultilineHTML (html, pre){
        const lines = html.split("\n");
		const fragment = document.createDocumentFragment();

		for (const line of lines){
			const echoElem = _createEchoElem(pre);
			echoElem.innerHTML = line;

			fragment.appendChild(echoElem);
		}

		this.termOutput.appendChild(fragment);
    }
}

export default AppUI;
