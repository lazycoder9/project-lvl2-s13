import fs from 'fs';
import path from 'path';
import parser from './parsers';
import differ from './differ';

export default (config1, config2) => {
  const type = path.extname(`${config1}`);
  const obj1 = fs.readFileSync(`${config1}`, 'utf-8');
  const obj2 = fs.readFileSync(`${config2}`, 'utf-8');

  return differ(parser[type](obj1), parser[type](obj2));
};
