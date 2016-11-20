'use strict';

const {apply, parallel} = require('async'),
      {readFile} = require('fs'),
      {join} = require('path');

const {
  HEADERS_FILE,
  BODY_FILE
} = require('./constants');

module.exports = (dir, done) => {
  const read = (path) => apply(readFile, join(dir, path));
  const process = (_, results) => {
    const {headers, body} = results;
    done({
      headers: JSON.parse(headers).toString(),
      body: body.toString(),
    });
  };
  return parallel({
    headers: read(HEADERS_FILE),
    body: read(BODY_FILE)
  }, process);
};
