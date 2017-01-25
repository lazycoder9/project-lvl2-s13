import yaml from 'js-yaml';
import ini from 'ini';
import chalk from 'chalk';

const compareValues = (value1, value2) => {
  if (value1 === value2) {
    return {
      type: 'unchanged',
      data: value1,
    };
  }
  if (value1 === undefined) {
    return {
      type: 'created',
      data: value2,
    };
  }
  if (value2 === undefined) {
    return {
      type: 'deleted',
      data: value1,
    };
  }

  return {
    type: 'updated',
    data: [value2, value1],
  };
};

const uniqueKeys = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  keys2.reduce((acc, key) => {
    if (!keys1.includes(key)) {
      acc.push(key);
    }

    return acc;
  }, keys1);

  return keys1;
};

const toString = (diffObject) => {
  const keys = Object.keys(diffObject);
  let result = '{';

  keys.forEach(function (key) {
    switch (diffObject[key].type) {
      case 'unchanged': result += `\n    ${key}: ${diffObject[key].data}`; break;
      case 'updated': result += `\n  + ${key}: ${diffObject[key].data[0]}\n  - ${key}: ${diffObject[key].data[1]}`; break;
      case 'created': result += `\n  + ${key}: ${diffObject[key].data}`; break;
      case 'deleted': result += `\n  - ${key}: ${diffObject[key].data}`; break;
      default: break;
    }
  });

  result += '\n}';

  return result;
};

const mainDiffer = (obj1, obj2) => {
  const diff = {};
  const keys = uniqueKeys(obj1, obj2);

  keys.forEach(function (key) {
    diff[key] = compareValues(obj1[key], obj2[key]);
  });

  return toString(diff);
};

export const jsonDiffer = (config1, config2) => {
  const obj1 = JSON.parse(config1);
  const obj2 = JSON.parse(config2);

  return mainDiffer(obj1, obj2);
};

export const yamlDiffer = (config1, config2) => {
  const obj1 = yaml.safeLoad(config1);
  const obj2 = yaml.safeLoad(config2);

  return mainDiffer(obj1, obj2);
};

export const iniDiffer = (config1, config2) => {
  const obj1 = ini.parse(config1);
  const obj2 = ini.parse(config2);

  return mainDiffer(obj1, obj2);
};
