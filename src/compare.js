// @flow
import _ from 'lodash';

const compare = (obj1: Object, obj2: Object) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const allKeys = _.union(keys1, keys2);

  const compareData = allKeys.map((key) => {
    if (_.isUndefined(obj1[key])) {
      return { type: 'added', key, newValue: obj2[key] };
    }
    if (_.isUndefined(obj2[key])) {
      return { type: 'removed', key, oldValue: obj1[key] };
    }
    if (_.isEqual(obj1[key], obj2[key])) {
      return { type: 'unchanged', key, oldValue: obj1[key] };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { type: 'unchanged', key, children: compare(obj1[key], obj2[key]) };
    }
    return { type: 'updated', key, oldValue: obj1[key], newValue: obj2[key] };
  });

  return compareData;
};

export default (obj1, obj2) => compare(obj1, obj2);
