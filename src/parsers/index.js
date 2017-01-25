import jsonParser from './jsonParser';
import yamlParser from './yamlParser';
import iniParser from './iniParser';

export default (obj1, obj2, type) => {
  switch (type) {
    case '.json': return [jsonParser(obj1), jsonParser(obj2)];
    case '.yml': return [yamlParser(obj1), yamlParser(obj2)];
    case '.ini': return [iniParser(obj1), iniParser(obj2)];
    default: return undefined;
  }
};
