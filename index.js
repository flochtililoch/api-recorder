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

  const app = express(),
    handler = config.offline ? replay : record;

  app.disable('x-powered-by');
  app.use(bodyParser.json());
  app.use(fingerprint(config.fingerprint));
  if (!config.offline) app.use(log(config));
  app.use(handler(config));
  if (config.offline) app.use(log(config));
  return app.listen(config.port, serviceStarted(config));
};
