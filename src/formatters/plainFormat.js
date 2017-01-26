const dataCheck = (data) => {
  if (typeof data === 'object') {
    return 'complex value';
  }
  return `value: ${data}`;
};

const parentCheck = parent => typeof parent !== 'number' ? `${parent}.` : '';

const parseObject = (name, data) => data.map(e => `${iterDiffObject(e, name)}`);

const parseUnchanged = () => '';

const parseCreated = (name, data, parent = '') => `Property '${parentCheck(parent)}${name}' was added with ${dataCheck(data)}`;

const parseDeleted = (name, data, parent = '') => `Property '${parentCheck(parent)}${name}' was removed`;

const parseUpdated = (name, data, parent = '') => `Property '${parentCheck(parent)}${name}' was updated. From '${data[0]}' to '${data[1]}'`;

const typeParser = {
  object: parseObject,
  unchanged: parseUnchanged,
  created: parseCreated,
  deleted: parseDeleted,
  updated: parseUpdated,
};

const iterDiffObject = (key, parent) => typeParser[key.type](key.name, key.data, parent);

export default diffObject => `${diffObject.map(iterDiffObject)}`.split(',').filter(e => e).join('\n');
