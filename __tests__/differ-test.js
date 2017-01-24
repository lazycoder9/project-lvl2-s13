import fs from 'fs';
import differ from '../';

test('differ', () => {
  const config1 = fs.readFileSync('__tests__/__fixtures__/1.json', 'utf-8');
  const config2 = fs.readFileSync('__tests__/__fixtures__/2.json', 'utf-8');

  const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;
  expect(differ.json(config1, config2)).toBe(expected);
});
