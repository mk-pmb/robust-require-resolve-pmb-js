
<!--#echo json="package.json" key="name" underline="=" -->
robust-require-resolve-pmb
==========================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
My attempt to make a less annoying require.resolve for Node.js v12+.
<!--/#echo -->



API
---

This module exports one function:

### makeResolver(rqr)

Returns the `resolve` function described below,
based on `rqr` which should be the calling module's `require` function.



### resolve(id)

Find the absolute path of module `id`.

* Even if it's `pkg-name/package.json` and `pkg-name`'s `package.json`
  defines custom exports that don't include an export named `package.json`.




<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




Similar projects
----------------

* `resolve-package-path`:
  Also reliably finds a `package.json` even with custom exports, but
  v3.1.0 seems to prefer the global version over the project-local version of
  same-named dependencies. (This might be intended behavior, see their docs.)




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
