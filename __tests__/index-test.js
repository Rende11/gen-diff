// @flow
import fs from 'fs';
import genDiff from '../src';

describe('Basic structure', () => {
  const beforeJSON = '__tests__/fixtures/before.json';
  const afterJSON = '__tests__/fixtures/after.json';
  const diff = '__tests__/fixtures/expectedJSON.txt';

  it('JSON configs', () => {
    const actual = genDiff(beforeJSON, afterJSON);
    const expected = fs.readFileSync(diff).toString();
    expect(actual).toBe(expected);
  });

  const beforeYAML = '__tests__/fixtures/before.yaml';
  const afterYAML = '__tests__/fixtures/after.yaml';
  it('YAML configs', () => {
    const actual = genDiff(beforeYAML, afterYAML);
    const expected = fs.readFileSync(diff).toString();
    expect(actual).toBe(expected);
  });

  const beforeIni = '__tests__/fixtures/before.ini';
  const afterIni = '__tests__/fixtures/after.ini';
  it('INI configs', () => {
    const actual = genDiff(beforeIni, afterIni);
    const expected = fs.readFileSync(diff).toString();
    expect(actual).toBe(expected);
  });
});

/*
describe('Complex structure', () => {
  const beforeJSON = '__tests__/fixtures/complexBefore.json';
  const afterJSON = '__tests__/fixtures/complexAfter.json';
  const diff = '__tests__/fixtures/expectedComplexJSON.txt';

  it('JSON configs', () => {
    const actual = genDiff(beforeJSON, afterJSON);
    const expected = fs.readFileSync(diff).toString();
    expect(actual).toBe(expected);
  });
});
*/
