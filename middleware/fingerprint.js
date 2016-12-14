'use strict';

const hash = require('object-hash'),
  {prettify} = require('../lib/json');

module.exports = filters => (req, res, next) => {
  const process = filter => {
    switch (filter.constructor) {
      case Object:
      return Object
        .keys(filter)
        .map(key => filter[key].map(subfilter => req[key][subfilter]));
      case String:
        return {[filter]: req[filter]};
    }
  };

  req.fingerprint = prettify(filters.map(process));
  req.id = hash(req.fingerprint);

  next();
};
