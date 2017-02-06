#! /usr/bin/env node
// @flow
/*eslint no-console: "error"*/

import commander from 'commander';
import run from '../';

commander
    .version('1.0.0')
    .arguments('<first_config> <second_config>')
    .description('Compares two configuration files and shows a difference.')
    .action((firstPath, secondPath) =>
        console.log(run(firstPath, secondPath)))
    .option('-f, --format [type]', 'output format')
    .parse(process.argv);