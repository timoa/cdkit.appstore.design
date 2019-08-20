#!/usr/bin/env node

const Utils = require('./lib/utils');
const runner = require('./runner');

/**
 * Validates passing args
 * @param args
 * @returns {boolean}
 */
function validateArguments (args) {
  const platforms = ['android', 'ios']
  if (args.p && !platforms.includes(args.p)) {
    throw Error('Invalid platform: you must select one of ios or android')
  }
  return true
}

const argv = require('yargs') // eslint-disable-line
  .usage(`USAGE: $0 <options>\n\n App Stores Design Generator`)
  .options('app', {
    alias: 'a',
    describe: 'App bundle ID',
    required: true,
    requiresArg: true,
    type: 'string'
  })
  .options('screenshots', {
    alias: 's',
    describe: 'Path to the screenshots',
    requiresArg: true,
    type: 'string'
  })
  .options('platform', {
    alias: 'p',
    describe: 'Limit the generation to a specific platform',
    requiresArg: true,
    type: 'string'
  })
  .check(validateArguments)
  .help()
  .strict()
  .argv

// Environment information
Utils.logger('Environment', '', 'bold');
Utils.logger('Node version:', `${process.version}\n`, 'info');

// Design
Utils.logger('Design', '', 'bold');
Utils.logger('Platform:', `${argv.platform}`, 'info');
Utils.logger('App:', `${argv.app}`, 'info');
Utils.logger('Screenshots path:', `${(argv.screenshots ? argv.screenshots : 'nc')}\n`, 'info');

runner(argv);
