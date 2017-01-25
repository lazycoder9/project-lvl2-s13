import jsonParser from './jsonParser';
import yamlParser from './yamlParser';
import iniParser from './iniParser';

export default {
  '.json': (obj1, obj2) => [jsonParser(obj1), jsonParser(obj2)],
  '.yml': (obj1, obj2) => [yamlParser(obj1), yamlParser(obj2)],
  '.ini': (obj1, obj2) => [iniParser(obj1), iniParser(obj2)],
};
