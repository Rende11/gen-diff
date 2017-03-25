// @flow

import pretty from './pretty';
import plain from './plain';
import json from './json';

const renders = { pretty, plain, json };

export default format => renders[format];
