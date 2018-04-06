'use strict';

const express = require('express'),
  bodyParser = require('body-parser'),
  fingerprint = require('./middleware/fingerprint'),
  record = require('./middleware/record'),
  replay = require('./middleware/replay'),
  log = require('./middleware/log'),
  {resolvePath} = require('./lib/resolve'),
  {serviceStarted} = require('./lib/log');

module.exports = args => {
  const config = Object.assign(
    {},
    require(resolvePath(args.config)),
    args
  );

  const app = express();

  app.disable('x-powered-by');
  app.use(bodyParser.json());
  app.use(fingerprint(config.fingerprint));
  app.use(log(config));
  app.use(replay(config));
  app.use(record(config));
  app.use(log(config));
  return app.listen(config.port, serviceStarted(config));
};
