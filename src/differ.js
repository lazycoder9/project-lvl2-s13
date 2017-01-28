import _ from 'lodash';

const differ = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  return keys.reduce((acc, key) => {
    const { type, data } = compareValues(obj1[key], obj2[key]);
    acc.push({ name: key, type, data });
    return acc;
  }, []);
};

const compareValues = (value1, value2) => {
  if (value1 === value2) {
    return {
      type: 'unchanged',
      data: value1,
    };
  }
  if (!value1) {
    return {
      type: 'created',
      data: value2,
    };
  }
  if (!value2) {
    return {
      type: 'deleted',
      data: value1,
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

export default (obj1, obj2) => differ(obj1, obj2);
