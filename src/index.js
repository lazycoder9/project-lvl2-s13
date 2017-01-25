import { jsonDiffer, yamlDiffer, iniDiffer } from './differ';

export default {
  json: jsonDiffer,
  yaml: yamlDiffer,
  ini: iniDiffer,
};
