import fs from 'fs';
import differ from '../src';

test('JSON Differ', () => {
  const config1 = '__tests__/fixtures/1.json';
  const config2 = '__tests__/fixtures/2.json';

  const actual = differ.getDiff(config1, config2);

  const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;
  expect(differ.toString(actual)).toBe(expected);
});

test('YAML Differ', () => {
  const config1 = '__tests__/fixtures/1.yml';
  const config2 = '__tests__/fixtures/2.yml';

  const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

  const actual = differ.getDiff(config1, config2);
  expect(differ.toString(actual)).toBe(expected);
});

test('INI Differ', () => {
  const config1 = '__tests__/fixtures/1.ini';
  const config2 = '__tests__/fixtures/2.ini';

  const actual = differ.getDiff(config1, config2);

  const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;
  expect(differ.toString(actual)).toBe(expected);
});
