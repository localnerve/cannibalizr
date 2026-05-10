/***
 * Copyright (c) 2016 - 2025 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file
 * for terms.
 */
import assert from 'node:assert';
import { describe, before, beforeEach, it } from 'node:test';
import fs from 'node:fs';
import path from 'node:path';
import inputFixture from '../fixtures/options.js';
import cannibalizr from '../../lib/index.js';

describe('cannibalizr', () => {
  const outputJson = path.resolve('tests/fixtures/output.json');
  const outputFixture = JSON.parse(fs.readFileSync(outputJson, { encoding: 'utf8' }));

  before(() => {
    const outputDir = path.dirname(inputFixture.output.file);
    fs.mkdirSync(outputDir, { recursive: true });
  });

  beforeEach(() => {
    try {
      fs.unlinkSync(inputFixture.output.file);
    } catch (e) {} // eslint-disable-line
  });

  it('should produce the expected output', () => {
    cannibalizr(inputFixture);

    return new Promise((resolve, reject) => {
      fs.readFile(inputFixture.output.file, {
        encoding: 'utf8'
      }, (err, data) => {
        assert.strictEqual(data, JSON.stringify(outputFixture));
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });

  it('should not run if bad input', () => {
    const badOptions = JSON.parse(JSON.stringify(inputFixture));
    delete badOptions.output.file;

    assert.throws(() => {
      cannibalizr(badOptions);
    });

    assert.throws(() => {
      fs.accessSync(inputFixture.output.file)
    });
  });
});
