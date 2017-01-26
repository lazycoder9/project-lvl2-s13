import fs from 'fs';
import differ from '../src';

test('JSON Differ', () => {
  const config1 = '__tests__/fixtures/1.json';
  const config2 = '__tests__/fixtures/2.json';

  const actual = differ(config1, config2);

  const expected = `{
    common: {
        setting1: Value 1
      - setting2: 200
        setting3: true
      - setting6: {
            "key": "value"
        }
      + setting4: blah blah
      + setting5: {
            "key5": "value5"
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
    }
  - group2: {
        "abc": "12345"
    }
  + group3: {
        "fee": "100500"
    }
}`;
  expect(actual).toBe(expected);
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

  const actual = differ(config1, config2);
  expect(actual).toBe(expected);
});

test('INI Differ', () => {
  const config1 = '__tests__/fixtures/1.ini';
  const config2 = '__tests__/fixtures/2.ini';

  const actual = differ(config1, config2);

  const expected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;
  expect(actual).toBe(expected);
});
