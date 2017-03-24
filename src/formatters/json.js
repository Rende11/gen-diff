const toJson = ast => ast.reduce((acc, node) => ({ ...acc, ...getNode(node) }), {});

const getNode = (node) => {
  switch (node.type) {
    case 'added':
      return { [node.key]: { newValue: node.newValue } };
    case 'removed':
      return { [node.key]: { oldValue: node.oldValue } };
    case 'updated':
      return { [node.key]: { newValue: node.newValue, oldValue: node.oldValue } };
    case 'unchanged':
      if (node.children) {
        return { [node.key]: toJson(node.children) };
      }
      return { [node.key]: node.oldValue };
    default:
      return { key: 'unknown' };
  }
};

export default ast => JSON.stringify(toJson(ast), null, 4);
