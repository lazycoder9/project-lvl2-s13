#!/usr/bin/env node
import program from 'commander';
import differ from '../../';

let conf1;
let conf2;

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<first_config> <second_config>')
  .action(function (firstConfig, secondConfig) {
    conf1 = firstConfig;
    conf2 = secondConfig;
  })
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);

console.log(differ.json(conf1, conf2));
