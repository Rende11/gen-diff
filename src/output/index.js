import pretty from './pretty';
import plain from './plain';

const renders = { pretty, plain };

export default format => renders[format];
