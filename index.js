'use strict';

const express = require('express'),
  bodyParser = require('body-parser'),
  fingerprint = require('./middleware/fingerprint'),
  record = require('./middleware/record'),
  replay = require('./middleware/replay'),
  log = require('./middleware/log'),
  {resolvePath} = require('./lib/resolve');

module.exports = args => {
  const config = Object.assign(
    {},
    require(resolvePath(args.config)),
    args
  );

  const app = express(),
    handler = args.offline ? replay : record;

  app.disable('x-powered-by');
  app.use(bodyParser.json());
  app.use(fingerprint(config.fingerprint));
  app.use(log);
  app.use(handler(config));
  return app.listen(config.port, () => console.log(`listening on port ${config.port}`));
};
