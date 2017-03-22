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


describe('Complex structure', () => {
  const beforeJSON = '__tests__/fixtures/complexBefore.json';
  const afterJSON = '__tests__/fixtures/complexAfter.json';

  const beforeYAML = '__tests__/fixtures/complexBefore.yaml';
  const afterYAML = '__tests__/fixtures/complexAfter.yaml';

  const beforeINI = '__tests__/fixtures/complexBefore.ini';
  const afterINI = '__tests__/fixtures/complexAfter.ini';

  const diff = '__tests__/fixtures/expectedComplexJSON.txt';

  it('JSON configs', () => {
    const actual = genDiff(beforeJSON, afterJSON);
    const expected = fs.readFileSync(diff).toString();
    expect(actual).toBe(expected);
  });

  it('YAML configs', () => {
    const actual = genDiff(beforeYAML, afterYAML);
    const expected = fs.readFileSync(diff).toString();
    expect(actual).toBe(expected);
  });

  it('INI configs', () => {
    const actual = genDiff(beforeINI, afterINI);
    const expected = fs.readFileSync(diff).toString();
    expect(actual).toBe(expected);
  });
});
