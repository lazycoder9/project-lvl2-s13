#!/usr/bin/env node
import program from 'commander';
import differ from '../';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<first_config> <second_config>')
  .action(function (firstConfig, secondConfig) {
    const diff = differ.getDiff(firstConfig, secondConfig);
    console.log(differ.toString(diff));
  })
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);
