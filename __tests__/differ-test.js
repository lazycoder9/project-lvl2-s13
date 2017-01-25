import fs from 'fs';
import differ from '../src';

test('JSON Differ', () => {
  const config1 = fs.readFileSync('__tests__/fixtures/1.json', 'utf-8');
  const config2 = fs.readFileSync('__tests__/fixtures/2.json', 'utf-8');

  const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;
  expect(differ.json(config1, config2)).toBe(expected);
});

test('YAML Differ', () => {
  const config1 = fs.readFileSync('__tests__/fixtures/1.yml', 'utf-8');
  const config2 = fs.readFileSync('__tests__/fixtures/2.yml', 'utf-8');

  const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;
  expect(differ.yaml(config1, config2)).toBe(expected);
});

test('INI Differ', () => {
  const config1 = fs.readFileSync('__tests__/fixtures/1.ini', 'utf-8');
  const config2 = fs.readFileSync('__tests__/fixtures/2.ini', 'utf-8');

  const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;
  expect(differ.ini(config1, config2)).toBe(expected);
});
