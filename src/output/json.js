import _ from 'lodash';

const getType = {
  added: '+ ',
  removed: '- ',
  unchanged: '  ',
  updated: '  ',
};

const getIndent = level => _.repeat('  ', level);

const renderObj = (obj, level) => {
  const keys = Object.keys(obj);
  const arr = keys.map(key => (obj[key] instanceof Object ?
  `${getIndent(level + 1)}${key}: ${renderObj(obj[key], level + 2)}` :
  `${getIndent(level + 2)}${getType.unchanged}${key}: ${obj[key]}`));
  return `{\n${arr.join('\n')}\n  ${getIndent(level)}}`;
};

const drawValue = (value, level) => {
  if (value instanceof Object) {
    return renderObj(value, level);
  }
  return value;
};

const toJson = (node, level) => {
  switch (node.type) {
    case 'added':
      return `${getIndent(level)}${getType[node.type]}${node.key}: ${drawValue(node.newValue, level)}`;
    case 'removed':
      return `${getIndent(level)}${getType[node.type]}${node.key}: ${drawValue(node.oldValue, level)}`;
    case 'updated':
      return [`${getIndent(level)}${getType.added}${node.key}: ${node.newValue}`,
        `${getIndent(level)}${getType.removed}${node.key}: ${node.oldValue}`].join('\n');
    case 'unchanged':
      if (node.children) {
        return `${getIndent(level)}${getType[node.type]}${node.key}: {
${node.children.map(item => toJson(item, level + 2)).join('\n')}\n${getIndent(level + 1)}}`;
      }
      return `${getIndent(level)}${getType[node.type]}${node.key}: ${node.oldValue}`;
    default :
      return `default_case ${node}`;
  }
};

export default ast => `{\n${ast.map(node => toJson(node, 1)).join('\n')}\n}`;
