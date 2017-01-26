const objToString = (obj) => {
  let result = '{\n';
  for (let key in obj) {
    result += `        "${key}": "${obj[key]}"`;
  }
  result += '\n    }';

  return result;
}

const addTab = string => string.split('\n').map(e => `    ${e}`).join('\n').trim();

export const toString = (diffObject) => {
  const keys = Object.keys(diffObject);
  let result = '{';

  keys.forEach(function (key) {
    switch (diffObject[key].type) {
      case 'object': result += `\n    ${key}: ${addTab(diffObject[key].data)}`; break;
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

const differ = (obj1, obj2) => {
  const diff = {};
  for (let key in obj1) {
    const value2 = obj2 === undefined ? undefined : obj2[key];
    diff[key] = compareValues(obj1[key], value2);
  }
  for (let key in obj2) {
    diff[key] = compareValues(obj1[key], obj2[key]);
  }
  return toString(diff);
};

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
      data: typeof value2 === 'object' ? objToString(value2) : value2,
    };
  }
  if (value2 === undefined) {
    return {
      type: 'deleted',
      data: typeof value1 === 'object' ? objToString(value1) : value1,
    };
  }
  if (typeof value1 === 'object') {
    return {
      type: 'object',
      data: differ(value1, value2),
    };
  }
  return {
    type: 'updated',
    data: [value2, value1],
  };
};

export default differ;
