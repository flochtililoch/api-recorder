'use strict';

require('colors');

module.exports = config => {
  return (req, res, next) => {
    // For now, just allow disable logging from config.
    // Might add more options in the future.
    if (config.log !== false) {
      const out = `
  ${'id'.magenta}: ${req.id.yellow}
  ${'method'.magenta}: ${req.method.yellow}
  ${'path'.magenta}: ${req.path.yellow}
  ${'status'.magenta}: ${res.statusCode.toString().yellow}
      `;
      console.log(out);
    }
    next();
  };
};
