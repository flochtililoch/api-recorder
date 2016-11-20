'use strict';

const mkdirp = require('mkdirp'),
      {apply, auto} = require('async'),
      {writeFile} = require('fs'),
      {join} = require('path');

const {
  HEADERS_FILE,
  BODY_FILE
} = require('./constants');

module.exports = (dir, headers, body) => {
  const format = data => JSON.stringify(data, null, '  '),
        write = (path, content) => apply(writeFile, join(dir, path), content);

  auto({
    prepare: apply(mkdirp, dir),
    headers: ['prepare', write(HEADERS_FILE, format(headers))],
    body: ['prepare', write(BODY_FILE, format(body))]
  });
};
