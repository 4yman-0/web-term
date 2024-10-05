const parseQuotes = (input) => {
	let result = [],
		buffer = '',
		inSingle = false,
		inDouble = false,
		escape = false;

	for (const char of input){
		if (escape){
			buffer += char;
			escape = false;
		} else if (char === '\\')
			escape = true;
		else if (char === ' ' && !inSingle && !inDouble){
			if (buffer.trim()){
				result.push(buffer);
			}
			buffer = '';
		} else if (char === "'" && !inDouble){
			if (inSingle){
				result.push(buffer);
				buffer = '';
			}
			inSingle = !inSingle;
		} else if (char === '"' && !inSingle){
			if (inDouble){
				result.push(buffer);
				buffer = '';
			}
			inDouble = !inDouble;
		} else
			buffer += char;
	}

	// Add the last buffer if it's not empty
	if (buffer.trim())
		result.push(buffer);

	return result;
};

const parseInput = (input) => {
	let result = [];

	if (/"|'/g.test(input))
		result = parseQuotes(input);

	if (result.length > 0)
		return result;
	else
		return input.split(' ');
}

export default parseInput;
