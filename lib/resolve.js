'use strict';

const {resolve, join} = require('path');

module.exports = (req, path) => {
  let dir = resolve(path);
  if (path[0] === '~') {
      dir = join(process.env.HOME, path.slice(1));
  }
  return join(dir, req.path, req.fingerprint);
};
