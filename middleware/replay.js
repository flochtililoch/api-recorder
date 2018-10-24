'use strict';

require('colors');

const {requestsIdsIndexes, resolveRequestPath} = require('../lib/resolve'),
      read = require('../lib/read'),
      fs = require('fs');

module.exports = ({directory, offline, autofix}) => {
  return (req, res, next) => {
    if (!offline) {
      next();
      return;
    }
    let path = resolveRequestPath(req, directory);
    console.log(`Request resolving to ${path.cyan}`);
    if (!fs.existsSync(path)) {
      if (offline && autofix) {
        requestsIdsIndexes[req.id] -= 1;
        console.log('Path not found, will query real service'.yellow);
        next();
      } else {
        console.log('Path not found'.red);
        res.end();
      }
      return;
    }
    read(path, result => {
      const {status, headers, body} = result;
      if (status) {
        res.status(status.status);
      }
      if (headers) {
        res.set(headers);
      }
      if (body) {
        res.json(body);
      }
      res.end();
    });
  };
};
