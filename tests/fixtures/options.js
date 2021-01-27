/**
 * Copyright (c) 2016 - 2021 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file
 * for terms.
 */
/*eslint no-console:0 */
const path = require('path');

module.exports = {
  output: {
    manifest: {
      id: 123,
      version: '0.1.0',
      whatever: 'string I want'
    },
    file: path.join(__dirname, './tmp/test_out.json')
  },
  input: {
    assets: [{
      file: path.join(__dirname, './files/_fonts.scss'),
      captures: [{
        global: true,
        matchIndex: 1,
        re: /url\(([^)]+)\)/ig
      }]
    }],
    apis: [{
      file: path.join(__dirname, './files/app.js'),
      captures: [{
        global: false,
        matchIndex: 1,
        re: /xhrPath\s*:\s*(?:'|")([^'"]+)/
      }]
    }]
  },
  logger: console.log
}
