/**
 * Copyright (c) 2016 - 2024 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file
 * for terms.
 */
/*eslint no-console:0 */
import url from 'node:url';
import path from 'node:path';

const thisDirname = url.fileURLToPath(new URL('.', import.meta.url));

export default {
  output: {
    manifest: {
      id: 123,
      version: '0.1.0',
      whatever: 'string I want'
    },
    file: path.join(thisDirname, './tmp/test_out.json')
  },
  input: {
    assets: [{
      file: path.join(thisDirname, './files/_fonts.scss'),
      captures: [{
        global: true,
        matchIndex: 1,
        re: /url\(([^)]+)\)/ig
      }]
    }],
    apis: [{
      file: path.join(thisDirname, './files/app.js'),
      captures: [{
        global: false,
        matchIndex: 1,
        re: /xhrPath\s*:\s*(?:'|")([^'"]+)/
      }]
    }]
  },
  logger: console.log
}
