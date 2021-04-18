// eslint-disable-next-line spaced-comment
/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var findManif = require('resolve-package-path'), EX;

EX = function makeResolver(rqr) {
  return function resolve(id) { return EX.resolve(rqr, id); };
};

EX.resolve = function (rqr, id) {
  var err, fix;
  try {
    return rqr.resolve(id);
  } catch (caught) {
    err = caught;
  }
  if (!err) { throw new TypeError('Caught a false-y error: ' + err); }

  fix = EX.chkManif(err, id);
  if (fix) { return fix; }

  throw err;
};

EX.chkManif = function (err, id) {
  if (err.code !== 'ERR_PACKAGE_PATH_NOT_EXPORTED') { return; }
  var parts = id.split(/\//), nParts = parts.length, expectedParts = 2;
  if (id.slice(0, 1) === '@') { expectedParts = 3; }
  if (nParts !== expectedParts) { return; }
  if (parts.slice(-1)[0] !== 'package.json') { return; }
  try {
    return findManif(parts.slice(0, -1).join('/'));
  } catch (ignore) {}
};

module.exports = EX;
