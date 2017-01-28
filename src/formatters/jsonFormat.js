const toJson = diffObject => diffObject.reduce((acc, key) => {
  acc[key.name] = {
    type: key.type,
    data: key.data[0] instanceof Object ? toJson(key.data) : key.data,
  };
  return acc;
});

export default diffObject => JSON.stringify(toJson(diffObject), null, ' ');
