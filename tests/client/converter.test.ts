// import { Buffer } from 'https://deno.land/std@0.147.0/io/buffer.ts'
import { assertEquals } from 'https://deno.land/std@0.147.0/testing/asserts.ts';
import { Converter } from '../../client/converter.ts';

Deno.test('Converter.input.Map', () => {
    const input = Converter.input({ alpha: 'a', beta: 'b' });
    assertEquals(input, { M: { alpha: { S: 'a' }, beta: { S: 'b' } } });
});

Deno.test('Converter.input.array', () => {
    const input = Converter.input([1, 2, 3, 4, 5]);
    assertEquals(input, { L: [{ N: '1' }, { N: '2' }, { N: '3' }, { N: '4' }, { N: '5' }] });
});

Deno.test('Converter.input.Set.Numbers', () => {
    const i = new Set([1, 2, 3, 4, 4]);
    const converted = Converter.input(i);
    assertEquals(converted, { NS: ['1', '2', '3', '4'] });
});

Deno.test('Converter.input.Set.Strings', () => {
    const i = new Set(['a', 'a', 'b', 'b', 'c']);
    const converted = Converter.input(i);
    assertEquals(converted, { SS: ['a', 'b', 'c'] });
});

Deno.test('Converter.input.Set.Binary', () => {
    const enc = new TextEncoder();
    const a = new Set([
        enc.encode('Hello World!'),
        enc.encode('Ima Buffer'),
    ]);
    const converted = Converter.input(a);
    assertEquals(converted, { BS: ['SGVsbG8gV29ybGQh', 'SW1hIEJ1ZmZlcg=='] });
});

Deno.test('Converter.input.boolean', () => {
    const converted = Converter.input(false);
    assertEquals(converted, { BOOL: false });
});

Deno.test('Converter.input.Number', () => {
    const i = 42;
    const converted = Converter.input(i);
    assertEquals(converted, { N: '42' });
});

Deno.test('Converter.marshall', () => {
    const converted = Converter.marshall({
        a: '1',
        b: true,
        c: 3,
        d: new Set([1, 2, 3, 4, 4, 4]),
        e: [1, 'a', 3, 'c'],
    });
    assertEquals(converted, {
        a: { S: '1' },
        b: { BOOL: true },
        c: { N: '3' },
        d: { NS: ['1', '2', '3', '4'] },
        e: { L: [{ N: '1' }, { S: 'a' }, { N: '3' }, { S: 'c' }] },
    });
});

Deno.test('Converter.input.String', ()=>{
    const i = 'Hello';
    const converted = Converter.input(i);
    assertEquals(converted, { S: i });
})



Deno.test('Converter.input.Set.String w/RemoveEmptyish', ()=>{
    const i = new Set(['Hello', undefined, 'World']);
    const converted = Converter.input(i, {convertEmptyValues: true});
    assertEquals(converted, { SS: ['Hello','World'] });
})

Deno.test('Converter.input.Set.String w/RemoveEmptyish - All Empties', ()=>{
    const i = new Set(['', null, '']);
    const converted = Converter.input(i, {convertEmptyValues: true});
    assertEquals(converted, { NULL: true });
})

Deno.test('Converter.input.Set.Number w/RemoveEmptyish', ()=>{
    const i = new Set([1,2,3]);
    const converted = Converter.input(i, {convertEmptyValues: true});
    assertEquals(converted, { NS: ['1','2','3'] });
})


