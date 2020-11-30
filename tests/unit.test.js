import { BlockType } from '../lib/typedefs';
import { parseBlockId, parseTrayUrl, parseUploadUrl } from '../lib/utils';

test('parseBlockId', () => {
  expect(parseBlockId('foo')).toEqual(BlockType.Unknown);
  expect(parseBlockId('b.link')).toEqual(BlockType.Unknown);
  expect(parseBlockId('b.link.123')).toEqual(BlockType.Link);
  expect(parseBlockId('b.text.123')).toEqual(BlockType.Text);
});

test('parseTrayUrl', () => {
  expect(parseTrayUrl('http://127.0.0.1:3000/@bgdotjpg')).toEqual(['bgdotjpg', null]);
  expect(parseTrayUrl('https://tray.club/@bgdotjpg/12345')).toEqual(['bgdotjpg', '12345']);
  expect(parseTrayUrl('https://tray.club/pay/@bgdotjpg')).toEqual(['bgdotjpg', null]);
  expect(parseTrayUrl('https://twitter.com/bgdotjpg')).toEqual([null, null]);
});

test('parseUploadUrl', () => {
  expect(
    parseUploadUrl(
      'https://traydata.s3.us-west-1.amazonaws.com/%40bgdotjpg/7946803587?AWSAccessKeyId=AKIA4Q4IY4K6YNXGW4WP&Content-Type=application%2Fjson&Expires=1606716598&Signature=Ndj7n2sqqFhonwQX%2FYaPP%2FlmWk0%3D',
    ),
  ).toEqual(['bgdotjpg', '7946803587']);
  expect(
    parseUploadUrl(
      'https://traydata.s3.us-west-1.amazonaws.com/%40bgdotjpg?AWSAccessKeyId=AKIA4Q4IY4K6YNXGW4WP&Content-Type=application%2Fjson&Expires=1606716598&Signature=kXYlY7FylV%2Bgxw%2FP29zAsD0twOg%3D',
    ),
  ).toEqual(['bgdotjpg', null]);
  expect(parseUploadUrl('https://tray.club/@bgdotjpg/12345')).toEqual([null, null]);
});
