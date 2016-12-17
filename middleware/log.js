'use strict';

require('colors');

module.exports = (req, res, next) => {
  const out = `[${req.id.magenta}] ${req.method.cyan} ${req.path.yellow}`;
  console.log(out);
  next();
};
