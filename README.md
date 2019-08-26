# Webpack template

## Overview

My webpack template with:
- Debug dev server
- Babel preset
- async/await. It adds additional 900kB, so if you want to disable it - delete `require("babel-polyfill")` in index.js
- logger instead default console (cgn.logger.log)
- eslinter

todo:
- tests

## Building

- `npm install` for first start
- `npm start` for debug
- `npm run build` for build
- `npm run docs` for dosc

## Usage
