// @flow
import _ from 'lodash';
import util from 'util';

const getType = {
  added: '  + ',
  removed: '  - ',
  unchanged: '    ',
  updated: '    ',
};

const isObject = obj => ((obj instanceof Object) && !(obj instanceof Array));

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
      return { type: 'unchanged', key, children: compare(obj1[key], obj2[key]) };
    }

    return { type: 'updated', key, oldValue: obj1[key], newValue: obj2[key] };
  });

  return _.flatten(compareData);
};

const render = (node) => {
  switch (node.type) {
    case 'added':
      return `${getType[node.type]}${JSON.stringify({ [node.key]: node.newValue }, '', 2)}`;
    case 'removed':
      return `${getType[node.type]}${JSON.stringify({ [node.key]: node.oldValue }, '', 2)}`;
    case 'updated':
      return JSON.stringify({ [node.key]}: node.oldValue, [node.key]: node.newValue }, '', 2);
    case 'unchanged':
      if (node.children) {
        return `{${getType[node.type]}${node.key}: {${node.children.map(render)}}`;
      }
      return `${getType[node.type]}${JSON.stringify({ [node.key]: node.oldValue }, '', 2)}`;
    // case default
    //   return 'unknown type';
  }
};

export default (obj1, obj2) => {
  const ast = compare(obj1, obj2);
  return ast.map(render);
};
