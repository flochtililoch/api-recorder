'use strict';

const resolve = require('../lib/resolve'),
      read = require('../lib/read');

module.exports = ({dir}) => {
  return (req, res) => {
    const path = resolve(req, dir);
    read(path, ({headers, body}) => {
      res.set(headers);
      res.json(body);
    });
  };
};
