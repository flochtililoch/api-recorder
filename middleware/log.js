'use strict';

require('colors');

module.exports = config => {
  return (req, res, next) => {
    // For now, just allow disable logging from config.
    // Might add more options in the future.
    if (config.log !== false) {
      const out = `[${req.id.magenta}] ${req.method.cyan} ${req.path.yellow}`;
      console.log(out);
    }
    next();
  };
};
