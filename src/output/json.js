import _ from 'lodash';

const getType = {
  added: ' + ',
  removed: ' - ',
  unchanged: '   ',
};

const getIndent = level => _.repeat(' ', level);

const toJson = (node, level = 1) => {
  switch (node.type) {
    case 'added':
      return `${getIndent(level)}${getType[node.type]}${node.key}: ${node.newValue}`;
    case 'removed':
      return `${getIndent(level)}${getType[node.type]}${node.key}: ${node.oldValue}`;
    case 'updated':
      return [`${getIndent(level)}${getType.added}${node.key}: ${node.newValue}`,
        `${getIndent(level)}${getType.removed}${node.key}: ${node.oldValue}`].join('\n');
    case 'unchanged':
      if (node.children) {
        return `${getIndent(level)}${getType[node.type]}${node.key}: {
          ${node.children.map(item => toJson(item, level + 1)).join('\n')}\n}`;
      }
      return `${getIndent(level)}${getType[node.type]}${node.key}: ${node.oldValue}`;
    default :
      return { result: 'empty' };
  }
};

export default ast => `{\n${ast.map(node => toJson(node, 1)).join('\n')}\n}`;
