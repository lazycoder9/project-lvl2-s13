import fs from 'fs';
import path from 'path';
import parser from './parsers/index';
import formatter from './formatters/index';
import differ from './differ';

const getExtension = pathToFile => path.extname(`${pathToFile}`).replace(/\./g, '');

export default (config1, config2, format = 'obj') => {
  const ext = getExtension(config1);
  const obj1 = fs.readFileSync(`${config1}`, 'utf-8');
  const obj2 = fs.readFileSync(`${config2}`, 'utf-8');
  const diff = differ(parser(ext)(obj1), parser(ext)(obj2));
  return formatter(format)(diff);
};
