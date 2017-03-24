// @flow
import _ from 'lodash';

const getValue = value => (_.isObject(value) ? 'complex value' : `value: ${value}`);

const toPlain = (node, parent) => {
  switch (node.type) {
    case 'added':
      return `Property '${parent}${node.key}' was added with ${getValue(node.newValue)}`;
    case 'removed':
      return `Property '${parent}${node.key}' was removed`;
    case 'updated':
      return `Property '${parent}${node.key}' was updated. From '${node.oldValue}' to '${node.newValue}'`;
    case 'unchanged':
      if (node.children) {
        return node.children.map(item => toPlain(item, `${parent}${node.key}.`)).filter(_.identity).join('\n');
      }
      return '';
    default:
      return 'Unknown case';
  }
};


export default ast => ast.map(item => toPlain(item, '')).join('\n');
