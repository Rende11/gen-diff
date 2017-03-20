// @flow
import _ from 'lodash';

// const getType = {
//   added: '  + ',
//   removed: '  - ',
//   unchanged: '    ',
//   updated: '    ',
// };

const isObject = obj => ((obj instanceof Object) && !(obj instanceof Array));

// const toJson = obj => JSON.stringify(obj, null, 2);

const compare = (obj1: Object, obj2: Object) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const allKeys = _.union(keys1, keys2);

  const compareData = allKeys.map((key) => {
    if (obj1[key] === undefined) {
      return { type: 'added', key, newValue: obj2[key] };
    }
    if (obj2[key] === undefined) {
      return { type: 'removed', key, oldValue: obj1[key] };
    }
    if (obj1[key] === obj2[key]) {
      return { type: 'unchanged', key, oldValue: obj1[key] };
    }
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      return { type: 'unchanged', key, children: [...compare(obj1[key], obj2[key])] };
    }

    return { type: 'updated', key, oldValue: obj1[key], newValue: obj2[key] };
  });

  return _.flatten(compareData);
};

const render = (node) => {
  switch (node.type) {
    case 'added':
      return { [node.key]: node.newValue };
    case 'removed':
      return { [node.key]: node.oldValue };
    case 'updated':
      return { [node.key]: node.oldValue, newValue: node.newValue };
    case 'unchanged':
      // if (node.children) {
      //   return { [node.key]: node.children.map(render) };
      // }
      return { [node.key]: node.oldValue };
    default :
      return { result: 'empty' };
  }
};

export default (obj1, obj2) => {
  const ast = compare(obj1, obj2);

  return ast.map(render);
};
