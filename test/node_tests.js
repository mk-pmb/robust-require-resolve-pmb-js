// eslint-disable-next-line spaced-comment
/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var eq = require('equal-pmb'), rrr = require('../rrr')(require),
  examplePackages;

examplePackages = {

  expectNice: (function collect(require) {
    return [
      require('equal-pmb'),
    ];
  }(String)),

  expectFail: (function collect(require) {
    return [
      require('merge-options'),
    ];
  }(String)),

};

examplePackages.expectNice.forEach(function (pkg) {
  eq.named('Package ' + pkg, function () {
    require.resolve(pkg);
    require.resolve(pkg + '/package.json');
  });
});

examplePackages.expectFail.forEach(function (pkg) {
  eq.named('Package ' + pkg, function () {
    eq(require.resolve(pkg), rrr(pkg));
    eq.err(function () { require.resolve(pkg + '/package.json'); },
      /\[ERR_PACKAGE_PATH_NOT_EXPORTED\]: Package subpath \S+ is not defined /);
    var manifId = pkg + '/package.json', manifPath = rrr(manifId);
    eq(manifPath.slice(-1 - manifId.length), '/' + manifId);
  });
});



console.info('+OK All node.js tests passed.');
