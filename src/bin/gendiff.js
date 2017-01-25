#!/usr/bin/env node
import fs from 'fs';
import program from 'commander';
import differ from '../';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<first_config> <second_config>')
  .action(function (firstConfig, secondConfig) {
    const type = firstConfig.split('.')[1];
    const config1 = fs.readFileSync(`${firstConfig}`, 'utf-8');
    const config2 = fs.readFileSync(`${secondConfig}`, 'utf-8');

    switch (type) {
      case 'json': console.log(differ.json(config1, config2)); break;
      case 'yml': console.log(differ.yaml(config1, config2)); break;
      case 'ini': console.log(differ.ini(config1, config2)); break;
      default: console.log('Unsupported file type'); break;
    }
  })
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);
