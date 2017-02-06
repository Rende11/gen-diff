// @flow
import json from './formats/json';
import yaml from './formats/yaml';
import ini from './formats/ini';

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
