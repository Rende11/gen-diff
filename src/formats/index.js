// @flow
import json from './json';
import yaml from './yaml';
import ini from './ini';

const formatList = { json, yaml, ini };

export default extension => formatList[extension];
