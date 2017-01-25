import fs from 'fs';
import { jsonDiffer, yamlDiffer, iniDiffer } from './differ';

export default (config1, config2) => {
  const type = config1.split('.')[1];
  const obj1 = fs.readFileSync(`${config1}`, 'utf-8');
  const obj2 = fs.readFileSync(`${config2}`, 'utf-8');

  switch (type) {
    case 'json': return jsonDiffer(obj1, obj2);
    case 'yml': return yamlDiffer(obj1, obj2);
    case 'ini': return iniDiffer(obj1, obj2);
    default: return undefined;
  }
};
