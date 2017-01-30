import _ from 'lodash';
import chalk from 'chalk';

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

const parseCreated = (name, data, level) => chalk.green(`${tab(level)}${name}: ${dataCheck(data, level)}`);

const parseDeleted = (name, data, level) => chalk.red(`${tab(level)}${name}: ${dataCheck(data, level)}`);

const parseUpdated = (name, data, level) => chalk.yellow(`${tab(level)}${name}: ${data[0]} => ${data[1]}`);

const typeParser = {
  object: parseObject,
  unchanged: parseUnchanged,
  created: parseCreated,
  deleted: parseDeleted,
  updated: parseUpdated,
};

const iterDiffObject = (key, level) => typeParser[key.type](key.name, key.data, level);

export default diffObject => `{\n${diffObject.map(e => iterDiffObject(e, 1))}\n}`.split(',').join('\n');
