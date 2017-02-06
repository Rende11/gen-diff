// @flow

import _ from 'lodash';

const objToArray = (obj) => {
  const keys = Object.keys(obj);
  return keys.map(key => ['    ', key, obj[key]]);
};


const arrayToString = array => `{\n${array.map(item => `${item[0]}${item[1]}:
  ${item[2] instanceof Object ? arrayToString(objToArray(item[2])) : item[2]}`).join('\n')}\n}`;

const compare = (obj1: Object, obj2: Object) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const allKeys = _.union(keys1, keys2);

  const setAdded = key => ['  + ', key, obj2[key]];
  const setStable = key => ['    ', key, obj1[key]];
  const setRemoved = key => ['  - ', key, obj1[key]];

  const comparedObj2 = allKeys.map((key) => {
    if (obj1[key] === undefined) {
      return [setAdded(key)];
    }
    if (obj2[key] === undefined) {
      return [setRemoved(key)];
    }
    if (obj1[key] === obj2[key]) {
      return [setStable(key)];
    }
    return [setAdded(key), setRemoved(key)];
  });


// arrayToString(_.flatten(comparedObj3))
  console.log((comparedObj2));
  return arrayToString(_.flatten(comparedObj2));
};

export default compare;
