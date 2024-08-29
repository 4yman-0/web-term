function parseQuotes(input) {
	let result = [],
		buffer = '',
		inSingle = false,
		inDouble = false,
		escape = false;

	for (let char of input) {
		if (escape) {
			buffer += char;
			escape = false;
		} else if (char === '\\') {
			escape = true;
		} else if (char === "'" && !inDouble) {
			if (inSingle) {
				result.push(buffer);
				buffer = '';
			}
			inSingle = !inSingle;
		} else if (char === '"' && !inSingle) {
			if (inDouble) {
				result.push(buffer);
				buffer = '';
			}
			inDouble = !inDouble;
		} else if (char === ' ' && !inSingle && !inDouble) {
			if (buffer.trim()) {
				result.push(buffer.trim());
			}
			buffer = '';
		} else {
			buffer += char;
		}
	}

	// Add the last buffer if it's not empty
	if (buffer.trim())
		result.push(buffer);

	return result;
}

function parseInput (input = ''){
	return parseQuotes(input);
}

export default parseInput;
