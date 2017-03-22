import _ from 'lodash';

const getType = {
  added: ' + ',
  removed: ' - ',
  unchanged: '   ',
  updated: '   ',
};

const getIndent = level => _.repeat('  ', level);

const toJson = (node, level = 1) => {
  const drawValue = value => (value instanceof Object ? JSON.stringify(value, null, 2) : value);
  switch (node.type) {
    case 'added':
      return `${getIndent(level)}${getType[node.type]}${node.key}: ${drawValue(node.newValue)}`;
    case 'removed':
      return `${getIndent(level)}${getType[node.type]}${node.key}: ${drawValue(node.oldValue)}`;
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
      return `${getIndent(level)}}${node.key}: ${node.oldValue}`;
  }
};

export default ast => `{\n${ast.map(node => toJson(node, 1)).join('\n')}\n}`;
