#! /usr/bin/env node --harmony

'use strict';

const express = require('express'),
      fingerprint = require('./middleware/fingerprint'),
      record = require('./middleware/record'),
      replay = require('./middleware/replay'),
      log = require('./middleware/log'),
      {processArgv} = require('./lib/cli');

const argsMap = {
        port: ['-p', '--port'],
        dir: ['-d', '--dir'],
        target: ['-t', '--target'],
      },
      args = processArgv(argsMap);

const app = express(),
      handler = args.target ? record : replay;

app.disable('x-powered-by');
app.use(fingerprint);
app.use(log);
app.use(handler(args));
app.listen(args.port, () => console.log(`listening on port ${args.port}`));
