'use strict';

require('colors');

const {resolveRequestPath} = require('../lib/resolve');
const {
  STATUS_FILE,
  HEADERS_FILE,
  BODY_FILE
} = require('../lib/constants');

module.exports = config => {
  return (req, res, next) => {
    // For now, just allow disable logging from config.
    // Might add more options in the future.
    if (config.log !== false) {
      const dir = resolveRequestPath(req, config.directory);
      const out = `
${'request:'.cyan}
  ${'id'.magenta}: ${req.id.yellow}
  ${'method'.magenta}: ${req.method.yellow}
  ${'path'.magenta}: ${req.path.yellow}
${'response:'.cyan}
  ${'status'.magenta}: ${res.statusCode.toString().yellow}
  ${'headers'.magenta}: ${(dir + '/' + HEADERS_FILE).yellow}
  ${'body'.magenta}: ${(dir + '/' + BODY_FILE).yellow}
      `;
      console.log(out);
    }
    next();
  };
};
