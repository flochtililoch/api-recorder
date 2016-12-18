'use strict';

const {resolve, join} = require('path');

const resolvePath = path => join(path[0] === '~' ? join(process.env.HOME, path.slice(1)) : resolve(path));
const resolveRequestPath = (req, path) => join(resolvePath(path), req.path, req.id);

module.exports = { resolvePath, resolveRequestPath };
