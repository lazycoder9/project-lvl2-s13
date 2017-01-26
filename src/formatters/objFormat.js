import _ from 'lodash';

const dataCheck = (data, level) => {
  if (typeof data === 'object') {
    const tabs = n => `\n${_.repeat(' ', 4 * n)}`
    const result = JSON.stringify(data, null, ' ');
    return `{${tabs(level + 1)}${result.split('\n').map(e => e.trim())[1]}${tabs(level)}}`;
  }
  return data;
};

const parseObject = (name, data, level) => `${_.repeat(' ', 4 * level)}${name}: {
${data.map(e => iterDiffObject(e, level + 1))}
${_.repeat(' ', 4 * (level))}}`;

const parseUnchanged = (name, data, level) => `${_.repeat(' ', 4 * level)}${name}: ${dataCheck(data, level)}`;

const parseCreated = (name, data, level) => `${_.repeat(' ', 4 * (level - 1))}  + ${name}: ${dataCheck(data, level)}`;

const parseDeleted = (name, data, level) => `${_.repeat(' ', 4 * (level - 1))}  - ${name}: ${dataCheck(data, level)}`;

const parseUpdated = (name, data, level) => `${parseCreated(name, data[0], level)}\n${parseDeleted(name, data[1], level)}`;

const iterDiffObject = (key, level) => {
  switch (key.type) {
    case 'object':
      return parseObject(key.name, key.data, level);
    case 'unchanged':
      return parseUnchanged(key.name, key.data, level);
    case 'created':
      return parseCreated(key.name, key.data, level);
    case 'deleted':
      return parseDeleted(key.name, key.data, level);
    case 'updated':
      return parseUpdated(key.name, key.data, level);
    default: break;
  }
};

export default diffObject => `{\n${diffObject.map(e => iterDiffObject(e, 1))}\n}`.split(',').join('\n');
