// @flow
import fs from 'fs';
import path from 'path';
import getParser from './formats';
import compare from './compare';
import getRenderer from './output';

const getDataFromFile = route => fs.readFileSync(route, 'utf8');

const getExtension = route => path.extname(route).substring(1);
// TODO remove hardcode -> substring(1);
export default (firstPath: string, secondPath: string, output: string = 'pretty') => {
  const data1 = getDataFromFile(firstPath);
  const data2 = getDataFromFile(secondPath);
  const extension1 = getExtension(firstPath);
  const extension2 = getExtension(secondPath);
  const object1 = getParser(extension1)(data1);
  const object2 = getParser(extension2)(data2);
  const diff = compare(object1, object2);
  return getRenderer(output)(diff);
};
