<p align="center">
	<h1>jsdoc-plugin-npm</h1>
</p>

## Overview
Generate [jsdoc][jsdoc] `@link` [inline tags][jsdoc-inline] from `@npm` inline tags.

e.g., `{@npm jsdoc-plugin-npm}` => `{@link https://www.npmjs.com/package/jsdoc-plugin-npm|jsdoc-plugin-npm}`

If you'd like to predefine links in a configuration file to make them referenceable see the [url JSDoc plugin][url-plugin] .

## Usage
Given the following example:
```javascript
// example npm package (not real...yet)
const voightKampffMachine = require('voight-kampff-machine');
/**
 * Takes an array of questions and returns a Promise that resolves to a `string` response to those questions.
 * Depends on the {@npm voight-kampff-machine} package.
 * 
 * @function voightKampff
 * @since 1.0.0
 * @param {string[]} questions
 * @returns {Promise<string>}
 */
const voightKampff = questions => {
	return voightKampffMachine.handleQuestions(questions)
		.then(response => {
		  if (!response) {
		    return 'They\'re only questions Leon';
		  }
		  return response;
		});
};
```
`jsdoc-plugin-npm` will generate:
````javascript
/**
 * Takes an array of questions and returns a Promise that resolves to a response to those questions.
 * Depends on the {@link https://www.npmjs.com/package/voight-kampff-machine|voight-kampff-machine} package.
 * 
 * ...
 */
````

## Installation
Install as a [devDependency][dev-deps]:
```bash
npm i -D jsdoc-plugin-npm
```

## Setup
In your [JSDoc config][jsdoc-config] in the [plugins][jsdoc-plugins] array include:
```json
{
  "plugins": ["jsdoc-plugin-npm"]
}
```
That's it!

## License
__*A copy of the license is included in this repository.*__

Copyright 2019 Justin Beaudry

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.


[url-plugin]: JustinBeaudry/jsdoc-plugin-url
[jsdoc]: http://usejsdoc.org
[jsdoc-inline]: http://usejsdoc.org/about-block-inline-tags.html
[jsdoc-plugins]: http://usejsdoc.org/about-configuring-jsdoc.html#configuring-plugins
[jsdoc-config]: http://usejsdoc.org/about-configuring-jsdoc.html
[dev-deps]: https://docs.npmjs.com/files/package.json#devdependencies
