// @flow
import parseYML from 'js-yaml';

export default data => parseYML.safeLoad(data);
