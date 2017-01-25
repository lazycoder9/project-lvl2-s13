import jsonParser from './jsonParser';
import yamlParser from './yamlParser';
import iniParser from './iniParser';

export default {
  '.json': (obj) => jsonParser(obj),
  '.yml': (obj) => yamlParser(obj),
  '.ini': (obj) => iniParser(obj),
};
