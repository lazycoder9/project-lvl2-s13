import json from './jsonParser';
import yml from './yamlParser';
import ini from './iniParser';

const parsers = { json, yml, ini };

export default extension => parsers[extension];
