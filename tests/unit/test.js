/***
 * Copyright (c) 2016 - 2023 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file
 * for terms.
 */
/* global before, beforeEach, describe, it */

import fs from 'node:fs';
import path from 'node:path';
import { expect } from 'chai';
import inputFixture from '../fixtures/options.js';
import cannibalizr from '../../lib/index.js';

describe('cannibalizr', () => {
  const outputJson = path.resolve('tests/fixtures/output.json');
  const outputFixture = JSON.parse(fs.readFileSync(outputJson, { encoding: 'utf8' }));

  before('cannibalizr', () => {
    const outputDir = path.dirname(inputFixture.output.file);
    fs.mkdirSync(outputDir, { recursive: true });
  });

  beforeEach(() => {
    try {
      fs.unlinkSync(inputFixture.output.file);
    } catch (e) {} // eslint-disable-line
  });

  it('should produce the expected output', done => {
    cannibalizr(inputFixture);

    fs.readFile(inputFixture.output.file, {
      encoding: 'utf8'
    }, (err, data) => {
      expect(data).to.eql(JSON.stringify(outputFixture));
      done(err);
    });
  });

  it('should not run if bad input', () => {
    const badOptions = JSON.parse(JSON.stringify(inputFixture));
    delete badOptions.output.file;

    expect(() => {
      cannibalizr(badOptions);
    }).to.throw(Error);

    expect(() => {
      fs.accessSync(inputFixture.output.file)
    }).to.throw(Error);
  });
});
