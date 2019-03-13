'use strict';
const path = require('path');
const npmRegex = /{@npm\s+([\w-~_@/!'*.,;:]+)}/;
const replacer = text => {
	text = text.replace(npmRegex, (source, npmUrl) => {
		return `{@link https://www.${path.join('npmjs.com/package', npmUrl)}|${npmUrl}}`;
	});
	if (npmRegex.test(text)) {
		return replacer(text);
	}
	return text;
};
exports.handlers = {
	beforeParse(e) {
		e.source = replacer(e.source);
	}
};
