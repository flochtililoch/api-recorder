'use strict';

const hash = require('object-hash');

const filters = ['url', 'method', 'params', 'query', 'body'];

module.exports = (req, res, next) => {
  let dictionary = {};
  filters.forEach(filter => dictionary[filter] = req[filter]);
  req.fingerprint = hash(dictionary);
  next();
};
