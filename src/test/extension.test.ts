import { describe, test } from '@jest/globals';
import * as assert from 'assert';
import { JapaneseNumberConverter } from '../japaneseNumberConverter';

describe('Extension Test Suite', () => {
	const converter = new JapaneseNumberConverter();

	test('基本的な数値変換', () => {
		assert.strictEqual(converter.convert('0'), '0');
		assert.strictEqual(converter.convert('1'), '1');
		assert.strictEqual(converter.convert('10'), '10');
		assert.strictEqual(converter.convert('100'), '100');
		assert.strictEqual(converter.convert('1000'), '1000');
		assert.strictEqual(converter.convert('1234'), '1234');
		assert.strictEqual(converter.convert('12345'), '1万2345');
		assert.strictEqual(converter.convert('123456'), '12万3456');
	});

	test('大きな数値の変換', () => {
		assert.strictEqual(converter.convert('1000000'), '100万');
		assert.strictEqual(converter.convert('10000000'), '1000万');
		assert.strictEqual(converter.convert('100000000'), '1億');
		assert.strictEqual(converter.convert('1000000000'), '10億');
		assert.strictEqual(converter.convert('10000000000'), '100億');
		assert.strictEqual(converter.convert('100000000000'), '1000億');
		assert.strictEqual(converter.convert('1000000000000'), '1兆');
	});

	test('各単位の変換', () => {
		assert.strictEqual(converter.convert('10000'), '1万');
		assert.strictEqual(converter.convert('100000000'), '1億');
		assert.strictEqual(converter.convert('1000000000000'), '1兆');
		assert.strictEqual(converter.convert('10000000000000000'), '1京');
		assert.strictEqual(converter.convert('100000000000000000000'), '1垓');
		assert.strictEqual(converter.convert('1000000000000000000000000'), '1秭');
		assert.strictEqual(converter.convert('10000000000000000000000000000'), '1穣');
		assert.strictEqual(converter.convert('100000000000000000000000000000000'), '1溝');
		assert.strictEqual(converter.convert('1000000000000000000000000000000000000'), '1澗');
		assert.strictEqual(converter.convert('10000000000000000000000000000000000000000'), '1正');
		assert.strictEqual(converter.convert('100000000000000000000000000000000000000000000'), '1載');
		assert.strictEqual(converter.convert('1000000000000000000000000000000000000000000000000'), '1極');
		assert.strictEqual(converter.convert('10000000000000000000000000000000000000000000000000000'), '1恒河沙');
		assert.strictEqual(converter.convert('100000000000000000000000000000000000000000000000000000000'), '1阿僧祇');
		assert.strictEqual(converter.convert('1000000000000000000000000000000000000000000000000000000000000'), '1那由他');
		assert.strictEqual(converter.convert('10000000000000000000000000000000000000000000000000000000000000000'), '1不可思議');
		assert.strictEqual(converter.convert('100000000000000000000000000000000000000000000000000000000000000000000'), '1無量大数');
	});

	test('複合的な数値の変換', () => {
		assert.strictEqual(converter.convert('1234567890123456789'), '123京4567兆8901億2345万6789');
		assert.strictEqual(converter.convert('10000000000000000000000000000000000000000000000000000000000000000001'), '1無量大数1');
	});

	test('アンダースコアとカンマの処理', () => {
		assert.strictEqual(converter.convert('1_000_000'), '100万');
		assert.strictEqual(converter.convert('1,000,000'), '100万');
	});

	// test('無量大数の特殊ケース', () => {
	// 	assert.strictEqual(converter.convert('1000000000000000000000000000000000000000000000000000000000000000000000'), '1無量大数');
	// 	assert.strictEqual(converter.convert('1000000000000000000000000000000000000000000000000000000000000000000001'), '1無量大数1');
	// });
});