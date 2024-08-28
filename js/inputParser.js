const inputParser = {
	parseQuotes (input){
    	let result = [];
    	let buffer = '';
    	let inSingle = false;
    	let inDouble = false;

    	for (let char of input) {
    	    if (char === "'" && !inDouble) {
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
    	    } else {
    	        buffer += char;
    	    }
    	}

    	if (buffer) result.push(buffer);

    	return result;
	},

	parse (input){
		return inputParser.parseQuotes(input);
	}
};

export default inputParser;
