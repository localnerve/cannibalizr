# Cannibalizr

[![npm version](https://badge.fury.io/js/cannibalizr.svg)](http://badge.fury.io/js/cannibalizr)
![Verify](https://github.com/localnerve/cannibalizr/workflows/Verify/badge.svg)
[![Coverage Status](https://coveralls.io/repos/localnerve/cannibalizr/badge.svg?branch=master)](https://coveralls.io/r/localnerve/cannibalizr?branch=master)


> A tool to pull strings from multiple files into a json file using regexes.

## What?
> "Turns an old pile of rusty files into a shiny, new json data source!"

This tool pulls select strings from multiple files and writes them to a
structured json file.
So, it allows you to use those files as input to something else, making them the
single source of truth.

*This is not the tool you are looking for.*

**Use this as a last resort.**

By nature, this is a brittle solution as the input files will (presumably) change
over time, and inevitably evade your capturing regexes at some point.
The usefulness of this tool depends on your regexes and the nature of the input
they capture against (and other viable options available to you in your timeframe).

Ideally, you should never have to do this, but sometimes, things are not ideal.
However, if there are strings in your code that are NOT easy available in any
other data form (**I'm looking at you, asset references in CSS**), this could be
a useful way to keep DRY without overcomplicating things.

## Example using all options

```javascript
import cannibalizr from 'cannibalizr';

cannibalizr({
  output: {
    // manifest is an optional object with arbitrary data to store in the output
    manifest: {
      id: 123,
      version: '0.1.0',
      whatever: 'data I want here'
    }
    file: 'data.json' // the json output file path, always overwritten.
  },
  input: {
    someIdentifier: [{
      file: 'somefile.css',
      captures: [{
        global: true, // true if the regex is global (/g)
        matchIndex: 1, // the match index to pull data from
        re: /url\(([^\)]+)\)/ig // the actual regex
      }]
    }],
    anotherIdentifier: [{
      file: 'somefile.js',
      captures: [{
        global: false,
        matchIndex: 1,
        re: /xhrPath\s*\:\s*(?:'|")([^'"]+)/
      }]
    }]
  },
  // A logging function. If omitted, nothing is logged.
  logger: console.log
});

// data.json:
{
  "manifest": {
    "id": 123,
    "version": "0.1.0",
    "whatever": "data I want here"
  },
  "someIdentifier": [
    "//fonts.gstatic.com/s/sourcesanspro/v9/guid.woff2",
    "//fonts.gstatic.com/s/sourcesanspro/v9/guid.woff",
    "//fonts.gstatic.com/s/sourcesanspro/v9/guid.ttf"
  ]
  "anotherIdentifier": [
    "/api"
  ]
}
```
