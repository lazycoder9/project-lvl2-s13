import obj from './objFormat';
import plain from './plainFormat';

const formatters = { obj, plain };

export default format => formatters[format];
