/**
 * Copyright 2019 Justin Beaudry
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';
const path = require('path');
const npmRegex = /{@npm\s+([\w-~_@/!'*.,;:]+)}/;
/**
 * Recursively replace @npm refs
 *
 * @param {string} text
 * @returns {string}
 */
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
	/**
	 * @param {object} e
	 * @param {string} e.source
	 * @ignore
	 */
	beforeParse(e) {
		e.source = replacer(e.source);
	}
};
