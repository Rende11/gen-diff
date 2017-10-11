#! /usr/bin/env node
// @flow
/* eslint no-console: 0 */

import commander from 'commander';
import run from '../';

commander
  .version('0.2.3')
  .arguments('<first_config> <second_config>')
  .description('Compares two configuration files and shows a difference.')
  .action((firstPath, secondPath) =>
    console.log(run(firstPath, secondPath, commander.format)))
  .option('-f, --format [type]', 'output format')
  .parse(process.argv);
