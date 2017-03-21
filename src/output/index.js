import json from './json';

const renders = { json };

export default format => renders[format];
