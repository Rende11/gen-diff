// @flow
import _ from 'lodash';

// const getAggregate = (agg) => {
//   switch (agg) {
//     case 'added':
//       return '  + ';
//     case 'removed':
//       return '  - ';
//     default:
//       return '    ';
//   }
// };

const statusObj = {
  added: '  + ',
  removed: '  - ',
  stable: '    ',
  object: 'object',
};

const isObject = obj => ((obj instanceof Object) && !(obj instanceof Array));
// const render = (array) => {
//   const renderArray = array.map((item) => {
//     if (item.status === 'object') {
//       return `${}`;
//     }
//     const state = statusObj[item.status];
//
//     return `${state}${item.key}: ${item.data}`;
//   });
//   return `{\n${renderArray.join('\n')}\n}`;
// };
const border = body => `{\n${body}\n}`;

const renderPlainBody = (array) => {
  const body = array.map((item) => {
    if (isObject(item.data) && item.status !== 'object') {
      console.log([item.data].map());
      return `${statusObj[item.status]}${item.key}:`;
    }
    if (item.status === 'object') {
      return `${statusObj.stable}${item.key}: ${renderPlainBody(item.data)}`;
    }
    const state = statusObj[item.status];
    return `${state}${item.key}: ${item.data}`;
  }).join('\n');
  return border(body);
};

const compare = (obj1: Object, obj2: Object) => {
  console.log(obj1);
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const allKeys = _.union(keys1, keys2);

  const setAdded = key => ({ status: 'added', key, data: obj2[key] });
  const setStable = key => ({ status: 'stable', key, data: obj1[key] });
  const setRemoved = key => ({ status: 'removed', key, data: obj1[key] });
  const setObject = key => ({ status: 'object', key, data: compare(obj1[key], obj2[key]) });

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
    if (isObject(obj1[key])) {
      return setObject(key);
    }
    return [setAdded(key), setRemoved(key)];
  });
  console.log(_.flatten(comparedObj));
  return _.flatten(comparedObj);
};

export default (obj1, obj2) => renderPlainBody(compare(obj1, obj2));
