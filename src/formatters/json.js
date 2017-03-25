const toJson = ast => ast.reduce((acc, item) => {
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
  return { ...acc, ...getNode(item) };
}, {});

export default ast => JSON.stringify(toJson(ast), null, 4);
