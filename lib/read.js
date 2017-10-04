'use strict';

const {apply, parallel} = require('async'),
      {readFile} = require('fs'),
      {join} = require('path');

const {
  STATUS_FILE,
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
    const {status, headers, body} = results;
    done({
      status: parse(status),
      headers: parse(headers),
      body: parse(body),
    });
  };
  return parallel({
    status: read(STATUS_FILE),
    headers: read(HEADERS_FILE),
    body: read(BODY_FILE)
  }, process);
};
