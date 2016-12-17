'use strict';

const {resolveRequestPath} = require('../lib/resolve'),
      read = require('../lib/read');

module.exports = ({directory}) => {
  return (req, res) => {
    const path = resolveRequestPath(req, directory);
    read(path, result => {
      const {headers, body} = result;
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
