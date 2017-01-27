import _ from 'lodash';

const tab = n => _.repeat(' ', 4 * n);

const dataCheck = (data, level) => {
  if (typeof data === 'object') {
    const result = JSON.stringify(data, ' ', 4);
    return `{\n${tab(level)}${result.split('\n')[1]}\n${tab(level)}}`;
  }
  return data;
};

const parseObject = (name, data, level) => `${tab(level)}${name}: {
${data.map(e => iterDiffObject(e, level + 1))}
${tab(level)}}`;

const parseUnchanged = (name, data, level) => `${tab(level)}${name}: ${dataCheck(data, level)}`;

const parseCreated = (name, data, level) => `${tab(level - 1)}  + ${name}: ${dataCheck(data, level)}`;

const parseDeleted = (name, data, level) => `${tab(level - 1)}  - ${name}: ${dataCheck(data, level)}`;

const parseUpdated = (name, data, level) => `${parseCreated(name, data[0], level)}\n${parseDeleted(name, data[1], level)}`;

const typeParser = {
  object: parseObject,
  unchanged: parseUnchanged,
  created: parseCreated,
  deleted: parseDeleted,
  updated: parseUpdated,
};

const iterDiffObject = (key, level) => typeParser[key.type](key.name, key.data, level);

export default diffObject => `{\n${diffObject.map(e => iterDiffObject(e, 1))}\n}`.split(',').join('\n');
