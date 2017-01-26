import obj from './objFormat';
import plain from './plainFormat';
import json from './jsonFormat';

const formatters = { obj, plain, json };

export default format => formatters[format];
