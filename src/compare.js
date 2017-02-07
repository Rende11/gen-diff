// @flow
import _ from 'lodash';

const getAggregate = (agg) => {
  switch (agg) {
    case 'added':
      return '  + ';
    case 'removed':
      return '  - ';
    default:
      return '    ';
  }
};

const render = (array) => {
  const renderArray = array.map((item) => {
    const state = getAggregate(item.status);
    return `${state}${item.key}: ${item.data}`;
  });
  return `{\n${renderArray.join('\n')}\n}`;
};

const compare = (obj1: Object, obj2: Object) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const allKeys = _.union(keys1, keys2);

  const setAdded = key => ({ status: 'added', key, data: obj2[key] });
  const setStable = key => ({ status: 'stable', key, data: obj1[key] });
  const setRemoved = key => ({ status: 'removed', key, data: obj1[key] });

  const comparedObj = allKeys.map((key) => {
    if (obj1[key] === undefined) {
      return setAdded(key);
    }
    if (obj2[key] === undefined) {
      return setRemoved(key);
    }
    if (obj1[key] === obj2[key]) {
      return setStable(key);
    }
    return [setAdded(key), setRemoved(key)];
  });

  return render(_.flatten(comparedObj));
};

export default compare;
