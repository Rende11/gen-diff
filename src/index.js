// @flow
import fs from 'fs';
import path from 'path';
import getParser from './formats';
import compare from './compare';

const getDataFromFile = route => fs.readFileSync(route, 'utf8');
const getExtension = route => path.extname(route);

export default (firstPath: string, secondPath: string) => {
  const data1 = getDataFromFile(firstPath);
  const data2 = getDataFromFile(secondPath);
  const extension1 = getExtension(firstPath);
  const extension2 = getExtension(secondPath);
  const object1 = getParser(extension1)(data1);
  const object2 = getParser(extension2)(data2);
  return compare(object1, object2);
};
