#! /usr/bin/env node --harmony

'use strict';

const express = require('express'),
  bodyParser = require('body-parser'),
  fingerprint = require('./middleware/fingerprint'),
  record = require('./middleware/record'),
  replay = require('./middleware/replay'),
  log = require('./middleware/log'),
  {processArgv} = require('./lib/cli'),
  {resolvePath} = require('./lib/resolve');

const argsMap = {
    config: ['-c', '--config'],
    offline: ['-o', '--offline'],
    port: ['-p', '--port'],
    target: ['-t', '--target'],
    directory: ['-d', '--directory'],
  },
  args = processArgv(argsMap),
  config = Object.assign(
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
app.listen(config.port, () => console.log(`listening on port ${config.port}`));
