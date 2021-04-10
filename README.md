
<!--#echo json="package.json" key="name" underline="=" -->
robust-require-resolve-pmb
==========================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
My attempt to make a less annoying require.resolve for Node.js v12+
<!--/#echo -->



API
---

This module exports one function:

### resolve-pmb(id)

Find the absolute path of module `id`.

* Even if it's `pkg-name/package.json` and `pkg-name`'s `package.json`
  defines custom exports that don't include an export named `package.json`.




<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
