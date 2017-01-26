#!/usr/bin/env node
import program from 'commander';
import differ from '../index';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<first_config> <second_config>')
  .option('-f, --format [type]', 'Output format')
  .action(function (firstConfig, secondConfig) {
    console.log(differ(firstConfig, secondConfig, program.format));
  })
  .parse(process.argv);
