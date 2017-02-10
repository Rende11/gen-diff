// @flow
import _ from 'lodash';


const statusObj = {
  added: '  + ',
  removed: '  - ',
  stable: '    ',
  object: '    ',
};

const isObject = obj => ((obj instanceof Object) && !(obj instanceof Array));

const compare = (obj1: Object, obj2: Object) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const allKeys = _.union(keys1, keys2);

  const compareData = allKeys.map((key) => {
    if (obj1[key] === undefined) {
      return { status: 'added', key, data: obj2[key] };
    }
    if (obj2[key] === undefined) {
      return { status: 'removed', key, data: obj1[key] };
    }
    if (obj1[key] === obj2[key]) {
      return { status: 'stable', key, data: obj1[key] };
    }
    if (isObject(obj1[key]) || isObject(obj2[key])) {
      return { status: 'object', key, data: compare(obj1[key], obj2[key]) };
    }

    return [{ status: 'added', key, data: obj2[key] }, { status: 'removed', key, data: obj1[key] }];
  });

  return _.flatten(compareData);
};
const render = ast => ast.map(item => `${statusObj[item.status]}${item.key}: ${item.data}`);
const border = rend => `{\n${rend.join('\n')}\n}`;

export default (obj1, obj2) => {
  const ast = compare(obj1, obj2);
  const renderArray = render(ast);
  return border(renderArray);
};
