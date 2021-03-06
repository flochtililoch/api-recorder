'use strict';

require('colors');

const mkdirp = require('mkdirp'),
      {apply, auto} = require('async'),
      {writeFile} = require('fs'),
      {join} = require('path'),
      {prettify} = require('./json');

const {
  STATUS_FILE,
  HEADERS_FILE,
  BODY_FILE,
  FINGERPRINT_FILE,
  REQUEST_FILE
} = require('./constants');

const format = data => {
  try {
    data = JSON.parse(data);
  } catch (e) {
    // swallow error
  }
  return prettify(data);
};

module.exports = (dir, status, headers, body, fingerprint, request) => {
  const write = (path, content) => {
    const formattedContent = content
      ? format(content)
      : '';
    return apply(writeFile, join(dir, path), formattedContent);
  };

  auto({
    prepare: apply(mkdirp, dir),
    status: ['prepare', write(STATUS_FILE, status)],
    headers: ['prepare', write(HEADERS_FILE, headers)],
    body: ['prepare', write(BODY_FILE, body)],
    fingerprint: ['prepare', write(FINGERPRINT_FILE, fingerprint)],
    request: ['prepare', write(REQUEST_FILE, request)],
  }, (err) => {
    if (err) {
      console.log(err.red);
    } else {
      console.log(`Wrote response files to: ${dir.green}`);
    }
  });
};
