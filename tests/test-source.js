'use strict';

// example npm package (not real...yet)
const voightKampffMachine = require('voight-kampff-machine');
/**
 * Takes an array of questions and returns a Promise that resolves to a `string` response to those questions.
 * Depends on the {@npm voight-kampff-machine} package. Also references {@npm @availjs/avail}.
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
