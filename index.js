/***
 * Copyright (c) 2016 Alex Grant (@localnerve), LocalNerve LLC
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file
 * for terms.
 */
'use strict';

const fs = require('fs');

/**
 * Pull strings from multiple input files, write to structured json.
 *
 * json output file structure:
 * {
 *   manifest: {
 *     // any output manifest data supplied in options
 *   },
 *   anyname: [
 *     'some captured string',
 *     'another captured string'
 *   ]
 * }
 *
 * @param {Object} options - Cannibalizr options.
 * @param {Object} options.input - input options.
 * @param {Object} options.input.anyname - At least one input is required,
 * use a name that makes sense for what is being captured.
 * @param {String} options.input.anyname.file - The path of the input file.
 * @param {Array} options.input.anyname.captures - The captures to run against
 * the input file.
 * @param {Boolean} options.input.anyname.captures.n.global - true if the regex
 * is global, false otherwise.
 * @param {Number} options.input.anyname.captures.n.matchIndex - The match index
 * to use to capture data for the regex.
 * @param {Regex} options.input.anyname.captures.n.re - The capturing regex to
 * use to get data.
 * @param {Object} options.output - output options.
 * @param {String} options.output.file - The path of the json output file.
 * @param {Object} [options.output.manifest] - An arbitrary manifest to write
 * to the json output file.
 * @param {Function} [options.logger] - A logger to use.
 * @returns {Undefined} Nothing.
 */
module.exports = function cannibalizr (options) {
  const output = {};

  // used to trim "|' from the beginning and end of a captured result.
  const reClean = /^(?:\s+|"|')|(?:\s+|"|')$/g;

  // basic input check
  const inputOk = options.input && Object.keys(options.input).length &&
    options.output && options.output.file;

  if (!inputOk) {
    throw new Error(
      'Cannibalizr received invalid options. Please review readme'
    );
  }

  if (options.output.manifest) {
    output.manifest = options.output.manifest;
  }

  /**
   * Report output results
   *
   * @param {Object} items - An array of output values.
   * @param {String} name - The name assocaited with the output.
   * @returns {Undefined} Nothing.
   */
  const report = function (items, name) {
    if (options.logger) {
      if (items && items.length) {
        items.forEach((str) => {
          options.logger(`"${name}": ${str}`);
        });
      } else {
        options.logger(`nothing found for "${name}"`);
      }
    }
  };

  //console.log('@@@ options.input' + require('util').inspect(options.input));

  Object.keys(options.input).forEach((item) => {
    options.input[item].forEach((input) => {
      const contents = fs.readFileSync(input.file, { encoding: 'utf8' });

      input.captures.forEach((capSpec) => {
        let m;

        output[item] || (output[item] = []);

        if (capSpec.global) {
          while ((m = capSpec.re.exec(contents)) !== null) {
            output[item].push(m[capSpec.matchIndex].replace(reClean, ''));
          }
        } else {
          m = capSpec.re.exec(contents);
          if (m) {
            output[item].push(m[capSpec.matchIndex].replace(reClean, ''));
          }
        }
      });
    });
    report(output[item], item);
  });

  fs.writeFileSync(options.output.file, JSON.stringify(
    output
  ));
};
