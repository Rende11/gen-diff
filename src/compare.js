// @flow
import _ from 'lodash';


const statusObj = {
  added: '  + ',
  removed: '  - ',
  stable: '    ',
};

const isObject = obj => ((obj instanceof Object) && !(obj instanceof Array));

const border = body => `{\n${body}\n}`;

// const renderPlainBody = (array) => {
//   const body = array.map((item) => {
//     if (isObject(item.data) && item.status !== 'object') {
//       // console.log([item.data].map());
//       return `${statusObj[item.status]}${item.key}:`;
//     }
//     if (item.status === 'object') {
//       return `${statusObj.stable}${item.key}: ${renderPlainBody(item.data)}`;
//     }
//     const state = statusObj[item.status];
//     return `${state}${item.key}: ${item.data}`;
//   }).join('\n');
//   return border(body);
// };

const render = (ast) => {
  const result = ast.map((item) => {
    return `${statusObj[item.status]}${item.key}: ${item.type === 'object' ? (item.data.map(val => `${val.key}: ${val.value}`)) : item.data}`;
  });
  return result;
};

const compare = (obj1: Object, obj2: Object) => {
  // console.log(obj1);
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const allKeys = _.union(keys1, keys2);

  const setAdded = key => ({ status: 'added', key, data: obj2[key] });
  const setStable = key => ({ status: 'stable', key, data: obj1[key] });
  const setRemoved = key => ({ status: 'removed', key, data: obj1[key] });
  const setObject = key => ({ status: 'object', key, data: compare(obj1[key], obj2[key]) });

  const comparedObj = allKeys.map((key) => {
    if (obj1[key] === undefined) {
      if (isObject(obj2[key])) {
      return { status: 'added', type, key, data: [obj2[key]] };
    }
    if (obj2[key] === undefined) {
      const type = isObject(obj1[key]) ? 'object' : 'notObject';
      return { status: 'removed', type, key, data: [obj1[key]] };
    }
    if (obj1[key] === obj2[key]) {
      const type = isObject(obj1[key]) ? 'object' : 'notObject';
      return { status: 'stable', type, key, data: [obj1[key]] };
    }
    if (isObject(obj1[key])) {
      return { status: 'stable', type: 'object', key, data: [...compare(obj1[key], obj2[key])] };
    }
    const type1 = isObject(obj1[key]) ? 'object' : 'notObject';
    const type2 = isObject(obj2[key]) ? 'object' : 'notObject';
    return [{ status: 'added', type2, key, data: [obj2[key]] }, { status: 'removed', type1, key, data: [obj1[key]] }];
  });
  // console.log(_.flatten(comparedObj));
  return _.flatten(comparedObj);
};

export default (obj1, obj2) => {
  const ast = compare(obj1, obj2);
  // console.log('AST !!!')
  console.log(ast[1]);
  console.log(ast[1].data);
  // console.log('RENDER AST')
  // console.log(render(ast));
  return render(ast);
};
