'use strict';
const fs = require('fs');
const promisify = require('util').promisify;
const path = require('path');
const assert = require('assert');
const spawn = require('child_process').spawn;

const config = path.join(__dirname, 'conf.json');
const CONFIG = '{"plugins":["lib/jsdoc-plugin-npm"],"source":{"include":["tests/test-source.js"]}}';

const setup = () => promisify(fs.writeFile)(config, CONFIG, {encoding: 'utf8'});
const clean = () => promisify(fs.unlink)(config);
const run = () => {
  return new Promise((resolve, reject) => {
    const jsdoc = spawn('npx', [
      'jsdoc',
      '-c',
      'tests/conf.json',
      '-X'
    ]);
    let output = '';
    let err = '';
    jsdoc.stdout.on('data', data => { output += data });
    jsdoc.stderr.on('data', data => { err += data });
    jsdoc.on('close', code => { code > 0 ? reject(err) : resolve(output) });
  });
};
const main = async () => {
  await setup();
  let description;
  try {
    const json = await run();
    description = JSON.parse(json)[1].description;
  } catch(err) {
    console.error('jsdoc error:', err);
  }
  try {
    assert.ok(!/@npm/g.test(description), `Output from JSDoc should not include @npm:\n${description}`);
    assert.ok(/@link/g.test(description), `Output from JSDoc should include @link:\n${description}`);
  } catch(err) {
    await clean();
    throw err;
  }
  console.info('passed!');
  console.dir(description);
  await clean();
};

main().catch(console.error);
