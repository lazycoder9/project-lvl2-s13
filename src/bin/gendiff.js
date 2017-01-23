#!/usr/bin/env node
import program from 'commander';
import fs from 'fs';

let config1;
let config2;

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<first_config> <second_config>')
  .action(function (firstConfig, secondConfig) {
    config1 = JSON.parse(fs.readFileSync(firstConfig));
    config2 = JSON.parse(fs.readFileSync(secondConfig));
  })
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);

console.log(config1);
console.log(config2);
