'use strict';

const {resolveRequestPath} = require('../lib/resolve'),
      read = require('../lib/read');

module.exports = ({directory}) => {
  return (req, res, next) => {
    const path = resolveRequestPath(req, directory);
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
      next();
    });
  };
};
