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

export const toString = (diffObject) => {
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

export default (obj1, obj2) => {
  const diff = {};
  const keys = uniqueKeys(obj1, obj2);

  keys.forEach(function (key) {
    diff[key] = compareValues(obj1[key], obj2[key]);
  });

  return toString(diff);
};
