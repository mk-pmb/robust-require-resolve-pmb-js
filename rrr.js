// eslint-disable-next-line spaced-comment
/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX, findManif = require('resolve-package-path'),
  nodeFs = require('fs'),
  syncExists = nodeFs.existsSync,
  // ^- Using sync fs functions is acceptable here because
  //    require.resolve is sync itself.
  pathLib = require('path');


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

  fix = EX['chkManif_' + err.code];
  fix = (fix && fix(err, id));
  if (fix) { return fix; }

  throw err;
};


EX.chkManif_ERR_PACKAGE_PATH_NOT_EXPORTED = function (err, id) {
  var parts = id.split(/\//), nManifParts = 1, manif, subPath, abs;
  if (id.slice(0, 1) === '@') { nManifParts += 1; }
  manif = parts.slice(0, nManifParts).join('/');
  try {
    manif = findManif(manif);
  } catch (ignore) {
    return false;
  }
  subPath = parts.slice(nManifParts).join('/');
  abs = pathLib.resolve(manif, '..', subPath);
  if (!syncExists(abs)) { return false; }
  return abs;
};


module.exports = EX;
