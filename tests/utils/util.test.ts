import { date, DynamoDBNumberValue, DynamoDBSet, typeOf } from '../../utils/index.ts';
import { assertEquals, assertThrows } from 'https://deno.land/std@0.147.0/testing/asserts.ts';

Deno.test('f.TypeOf - null', () => {
    assertEquals(typeOf(null), 'null');
});

Deno.test('f.TypeOf - object', () => {
    assertEquals(typeOf({ a: 1 }), 'Object');
});

Deno.test('f.TypeOf - undefined', () => {
    assertEquals(typeOf(undefined), 'undefined');
});

Deno.test('f.TypeOf - Array', () => {
    assertEquals(typeOf([1, 2, 3]), 'Array');
});

Deno.test('f.TypeOf - Set', () => {
    assertEquals(typeOf(new Set([1, 2, 2])), 'Set');
});

Deno.test('f.DynamoDBSet - array of numbers', () => {
    const d = new DynamoDBSet([1, 2, 3, 4, 5, 5]);
    assertEquals(d.type, 'Number');
    assertEquals(d.values, [1, 2, 3, 4, 5, 5]);
    assertEquals(d.toJSON(), [1, 2, 3, 4, 5, 5]);
});

Deno.test('f.DynamoDBNumberValue', () => {
    const d = new DynamoDBNumberValue('5');
    assertEquals(d.toNumber(), 5);
    assertEquals(d.toJSON(), 5);
    assertEquals(d.toString(), '5');
    assertEquals(d.value, '5');
});

Deno.test('f.date ', () => {
    const dtstmp = Date.now() / 1000;
    const d = date.from(dtstmp);
    const d1 = date.iso8601(d);
    const d2 = date.rfc822(d);
    const unix = date.unixTimestamp(d);

    assertEquals(d1, date.format(d, 'iso8601'));
    assertEquals(d2, date.format(d, 'rfc822'));
    assertEquals(unix, date.format(d, 'unixTimestamp'));
});

Deno.test('DynamoDBSet - Throws with bad input types ', () => {
    assertThrows(() => new DynamoDBSet([() => {}, () => {}]));
});

Deno.test('DynamoDBSet - Throws with inconsistent input types ', () => {
    assertThrows(() => new DynamoDBSet([1, 'a', 2], { validate: true }));
});
