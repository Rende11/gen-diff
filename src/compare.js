// @flow

import _ from 'lodash';

const arrayToString = array => `{\n${array.map(item => `${item.status}
  ${item.key}: ${item.data}`).join('\n')}\n}`;

const compare = (obj1: Object, obj2: Object) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const allKeys = _.union(keys1, keys2);

  const setAdded = key => ({ status: '  + ', key, data: obj2[key] });
  const setStable = key => ({ status: '    ', key, data: obj1[key] });
  const setRemoved = key => ({ status: '  - ', key, data: obj1[key] });

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

  return arrayToString(_.flatten(comparedObj));
};

export default compare;
