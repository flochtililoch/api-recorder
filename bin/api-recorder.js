#! /usr/bin/env node --harmony

'use strict';

const apiRecorder = require('../'),
  {processArgv} = require('../lib/cli'),
  argsMap = {
    config: ['-c', '--config'],
    offline: ['-o', '--offline'],
    port: ['-p', '--port'],
    target: ['-t', '--target'],
    directory: ['-d', '--directory'],
  },
  args = processArgv(argsMap);

apiRecorder(args);
