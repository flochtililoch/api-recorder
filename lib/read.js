'use strict';

const {apply, parallel} = require('async'),
      {readFile} = require('fs'),
      {join} = require('path');

const {
  HEADERS_FILE,
  BODY_FILE
} = require('./constants');

const parse = raw => {
  try {
    return JSON.parse(raw.toString());
  } catch (e) {
    return undefined;
  }
};

module.exports = (dir, done) => {
  const read = (path) => apply(readFile, join(dir, path));
  const process = (_, results) => {
    const {headers, body} = results;
    done({
      headers: parse(headers),
      body: parse(body),
    });
  };
  return parallel({
    headers: read(HEADERS_FILE),
    body: read(BODY_FILE)
  }, process);
};
