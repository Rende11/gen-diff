// @flow

const toPlain = (node) => {
  switch (node.type) {
    case 'added':
      return `Property '${node.key}' was added with value: '${node.newValue}'`;
    case 'removed':
      return `Property '${node.key}' was removed`;
    case 'updated':
      return `Property '${node.key}' was updated. From '${node.oldValue}' to '${node.newValue}'`;
  }
};


export default ast => ast.map(toPlain).join('\n');
