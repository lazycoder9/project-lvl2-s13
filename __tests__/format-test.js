import fs from 'fs';
import differ from '../src';

test('JSON Plain format', () => {
  const config1 = '__tests__/fixtures/1.json';
  const config2 = '__tests__/fixtures/2.json';

  const actual = differ(config1, config2, 'plain');

  const expected = `Property 'common.setting2' was removed
Property 'common.setting6' was removed
Property 'common.setting4' was added with value: blah blah
Property 'common.setting5' was added with complex value
Property 'group1.baz' was updated. From 'bars' to 'bas'
Property 'group2' was removed
Property 'group3' was added with complex value`;
  expect(actual).toBe(expected);
});
