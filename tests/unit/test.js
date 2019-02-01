/***
 * Copyright (c) 2016 - 2019 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file
 * for terms.
 */
/* global before, beforeEach, describe, it */

const fs = require('fs');
const path = require('path');
const expect = require('chai').expect;
const mkdirp = require('mkdirp').sync;

describe('cannibalizr', () => {
  const inputFixture = require('../fixtures/options');
  const outputFixture = require('../fixtures/output.json');
  const cannibalizr = require('../../index.js');

  before('cannibalizr', () => {
    const outputDir = path.dirname(inputFixture.output.file);
    mkdirp(outputDir);
  });

  beforeEach(() => {
    if (fs.existsSync(inputFixture.output.file)) {
      fs.unlinkSync(inputFixture.output.file);
    }
  });

  it('should produce the expected output', (done) => {
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

    expect(function () {
      cannibalizr(badOptions);
    }).to.throw(Error);

    expect(fs.existsSync(inputFixture.output.file)).to.be.false;
  });
});
