'use strict';

const mkdirp = require('mkdirp'),
      {apply, auto} = require('async'),
      {writeFile} = require('fs'),
      {join} = require('path'),
      {prettify} = require('./json');

const {
  HEADERS_FILE,
  BODY_FILE
} = require('./constants');

const format = data => {
  try {
    data = JSON.parse(data);
  } catch (e) {
    // swallow error
  }
  return prettify(data);
};

module.exports = (dir, headers, body) => {
  const write = (path, content) => {
    if (content) {
      return apply(writeFile, join(dir, path), format(content));
    } else {
      return function(){};
    }
  };

  auto({
    prepare: apply(mkdirp, dir),
    headers: ['prepare', write(HEADERS_FILE, headers)],
    body: ['prepare', write(BODY_FILE, body)]
  });
};
