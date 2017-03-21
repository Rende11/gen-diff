const toJson = (node) => {
  switch (node.type) {
    case 'added':
      return { [node.key]: node.newValue };
    case 'removed':
      return { [node.key]: node.oldValue };
    case 'updated':
      return { [node.key]: node.oldValue, newValue: node.newValue };
    case 'unchanged':
      // if (node.children) {
      //   return { [node.key]: node.children.map(render) };
      // }
      return { [node.key]: node.oldValue };
    default :
      return { result: 'empty' };
  }
};

export default ast => ast.map(toJson);
