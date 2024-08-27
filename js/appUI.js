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

    echo (text = "\n", isPre = false){
		const echoElem = _createEchoElem(isPre);
		echoElem.textContent = text || "";
		this.termOutput.appendChild(echoElem);
		return echoElem;
    }

    echoHTML (html = "", isPre = false){
		const echoElem = _createEchoElem(isPre);
		echoElem.innerHTML = html || "";
		this.termOutput.appendChild(echoElem);
		return echoElem;
    }

    echoMultiline (text, isPre){
        const lines = text.split("\n");
		const fragment = document.createDocumentFragment();

		for (const line of lines) {
			const echoElem = _createEchoElem(isPre);
			echoElem.textContent = line;

			fragment.appendChild(echoElem);
		}

		this.termOutput.appendChild(fragment);
    }

    echoMultilineHTML (html, isPre){
        const lines = html.split("\n");
		const fragment = document.createDocumentFragment();

		for (const line of lines) {
			const echoElem = _createEchoElem(isPre);
			echoElem.innerHTML = line;

			fragment.appendChild(echoElem);
		}

		this.termOutput.appendChild(fragment);
    }
}

export default AppUI;
