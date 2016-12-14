'use strict';

require('colors');

module.exports = (req, res, next) => {
  const out = `[${req.fingerprint.magenta}] ${req.method.cyan} ${req.url.yellow}`;
  console.log(out);
  next();
};
