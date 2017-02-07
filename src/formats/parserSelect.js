// @flow
import json from './json';
import yaml from './yaml';
import ini from './ini';

export default (extension: string) => {
  switch (extension) {
    case '.json':
      return json;
    case '.yaml':
      return yaml;
    case '.ini':
      return ini;
    default:
      return 'unknown extension';
  }
};
