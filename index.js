#! /usr/bin/env node --harmony

'use strict';

const express = require('express'),
      fingerprint = require('./middleware/fingerprint'),
      record = require('./middleware/record'),
      replay = require('./middleware/replay'),
      {processArgv} = require('./lib/cli');

const argsMap = {
        port: ['-p', '--port'],
        dir: ['-d', '--dir'],
        target: ['-t', '--target'],
      },
      args = processArgv(argsMap);

const app = express(),
      handler = args.target ? record : replay;

app.use(fingerprint);
app.use(handler(args));
app.listen(args.port, () => console.log(`listening on port ${args.port}`));
