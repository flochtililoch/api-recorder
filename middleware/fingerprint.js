'use strict';

const hash = require('object-hash');

const filters = {
  url: null,
  method: null,
  params: null,
  query: null,
  body: null,
  headers: ['user-agent', 'accept-language']
};

const process = (subfilters, data) => {
  if (subfilters && subfilters.length > 0) {
    return Object.keys(data)
      .filter(key => subfilters.includes(key))
      .reduce((obj, key) => {
        obj[key] = data[key];
        return obj;
      }, {});
  } else {
    return data;
  }
};

module.exports = (req, res, next) => {
  const dictionary = Object.keys(filters).map(filter => {
    return process(filters[filter], req[filter]);
  });
  req.fingerprint = hash(dictionary);
  next();
};
