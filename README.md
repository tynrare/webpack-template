# Webpack template

## Overview

My webpack template with:
- Debug dev server
- Babel preset
- async/await. It adds additional 900kB, so if you want to disable it - delete `require("babel-polyfill")` in index.js
- logger instead default console (cgn.logger.log)
- eslinter. Also [jsdoc plugin](https://github.com/gajus/eslint-plugin-jsdoc) for it
- tests

DeepScan stats: https://deepscan.io/dashboard#view=project&tid=5038&pid=6835&bid=59639


## Building/Running/Tests

- `npm install` — for first start
- `npm start` — debug dev-server
- `npm run manual-test` — debug manual tests on dev-server
- `npm run auto-node-test` — debug auto tests in node.js (for CI)
- `npm run auto-browser-test` — debug auto tests in browser with dev-server
- `npm run build` — build for production
- `npm run build-dev` — build for debug
- `npm run build-test` — build manual tests
- `npm run docs` — docs

## Usage

### Tests

=== Manual tests

`npm run manual-test` - environment where you can write your own /whatever you want/ cases.

How to add new case:
 - Create file `./src/test/manual/*.mtest.js`
 - Add new require entry in `/src/test/manual.js::testCasesList`

=== Auto tests

`npm run auto-node-test`, `npm run auto-browser-test` - mocha tests. First in node (For testing you code in CI), second in browser with interactive, hot reload, etc.

How to add new case:
 - Create file `./src/test/auto/*.test.js`
 - Add new require entry in `/src/test/auto.js`

### Builds

 all builds lays in ./dist folder

`npm run build` builds in production mode with minification, without source maps.
`npm run build-dev` builds with source maps
`npm run build-test` builds manual tests with source maps

### Docs

`npm run docs` builds jsdoc docs. You can find it in ./docs folder
