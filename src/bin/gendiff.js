#!/usr/bin/env node
import fs from 'fs';
import program from 'commander';
import differ from '../';

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

const config1 = fs.readFileSync(`${conf1}`, 'utf-8');
const config2 = fs.readFileSync(`${conf2}`, 'utf-8');

const type = conf1.split('.')[1];
switch (type) {
  case 'json': console.log(differ.json(config1, config2)); break;
  case 'yml': console.log(differ.yaml(config1, config2)); break;
  default: console.log('Unsupported file type'); break;
}
