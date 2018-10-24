'use strict';

require('colors');

module.exports = config => {
  return (req, res, next) => {
    // For now, just allow disable logging from config.
    // Might add more options in the future.
    if (config.log !== false) {
      const out = `
Request:
  ${'id'.magenta}: ${req.id.cyan}
  ${'method'.magenta}: ${req.method.cyan}
  ${'path'.magenta}: ${req.path.cyan}
  ${'status'.magenta}: ${res.statusCode.toString().cyan}
      `;
      console.log(out);
    }
    next();
  };
};
