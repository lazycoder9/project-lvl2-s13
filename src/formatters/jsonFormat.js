const toJson = (diffObject) => {
  const json = {};
  diffObject.map(key => {
    json[key.name] = {
      type: key.type,
      data: key.data[0] instanceof Object ? toJson(key.data) : key.data,
    };
  });

  return json;
};

export default diffObject => JSON.stringify(toJson(diffObject), null, ' ');
