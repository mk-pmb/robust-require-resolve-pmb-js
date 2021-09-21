// eslint-disable-next-line spaced-comment
/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

/*

Example usage: detect npm@7 CLI script:

  node -e 'require("robust-require-resolve-pmb/cli.js")(require)' \
    -- -- npm/bin/npm-cli.js

The 1st pair of dashes is to be eaten by node.js. The 2nd pair of dashes
is passed to this CLI as proof that we had provided the 1st pair of dashes.

*/

var rrr = require('./rrr.js');

function cli(rqr) {
  var list = [], errCnt = 0, hadDashes;
  process.argv.slice(2).forEach(function check(arg) {
    if (!arg) { return; }
    if (arg === '--') {
      hadDashes = true;
      return;
    }
    try {
      list.push(rrr.resolve(rqr, arg));
    } catch (err) {
      if (err.code === 'MODULE_NOT_FOUND') {
        console.error(arg + '\t' + err.code + '\tE:',
          err.message.split(/\n/)[0]);
        errCnt += 1;
      } else {
        throw err;
      }
    }
  });
  if (errCnt > 0) { process.exit(4).thisShouldNotTrigger(); }
  if (!list.length) {
    if (hadDashes) { return; }
    console.error('E: Found neither an ID nor enough double dashes.');
    process.exit(6).thisShouldNotTrigger();
  }
  console.log(list.join('\n'));
}

module.exports = cli;
