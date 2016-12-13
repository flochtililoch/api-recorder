'use strict';

const resolve = require('../lib/resolve'),
      read = require('../lib/read');

module.exports = ({dir}) => {
  return (req, res) => {
    const path = resolve(req, dir);
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
