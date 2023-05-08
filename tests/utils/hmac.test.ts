import { hmac } from '../../utils/hmac.ts';
import { changeEnc } from '../../utils/encodingOpts.ts';
import { assertEquals } from 'https://deno.land/std@0.34.0/testing/asserts.ts';

Deno.test('hmac.hex.1', async () => {
    const msg = changeEnc('Here is my Key').from('utf8').to().array();
    const sec = changeEnc('Here is my secret').from('utf8').to().array();

    const hmacBytes = (await hmac('SHA-256', sec, msg)) as Uint8Array;
    const actual = changeEnc(hmacBytes).from().to('hex').string();
    const expected = 'd8c02836b07bce0f088456767e5af18427e9dfc58b175c7b035b0194f9917a84';

    assertEquals(
        actual,
        expected,
        `Hex string should match actual:: ${actual} - shoujld be:: ${expected}`,
    );
});

Deno.test('hmac.hex.2', async () => {
    const msg = changeEnc('Here is my Key').from().to().array();
    const sec = changeEnc('Here is my secret').from().to().array();

    const actualHmacHexString = await hmac(
        'SHA-256',
        sec,
        msg,
        (i) => changeEnc(i).from().to('hex').string(),
    );
    const expected = 'd8c02836b07bce0f088456767e5af18427e9dfc58b175c7b035b0194f9917a84';

    assertEquals(
        actualHmacHexString,
        expected,
        `Hex string should match actual:: ${actualHmacHexString} - shoujld be:: ${expected}`,
    );
});

Deno.test('hmac.base64.1', async () => {
    const msg = changeEnc('Here is my Key').from().to().array();
    const sec = changeEnc('Here is my secret').from().to().array();

    const actualHmacHexString = await hmac(
        'SHA-256',
        sec,
        msg,
        (i) => changeEnc(i).from().to('base64').string(),
    );
    const expected = '2MAoNrB7zg8IhFZ2flrxhCfp38WLF1x7A1sBlPmReoQ=';

    assertEquals(
        actualHmacHexString,
        expected,
        `Hex string should match actual:: ${actualHmacHexString} - shoujld be:: ${expected}`,
    );
});

Deno.test('hmac.base64url.1', async () => {
    const msg = changeEnc('Here is my Key').from().to().array();
    const sec = changeEnc('Here is my secret').from().to().array();

    const actualHmacb64urlString = await hmac(
        'SHA-256',
        sec,
        msg,
        (i) => changeEnc(i).from().to('base64url').string(),
    );
    const expected = '2MAoNrB7zg8IhFZ2flrxhCfp38WLF1x7A1sBlPmReoQ';

    assertEquals(
        actualHmacb64urlString,
        expected,
        `Hex string should match actual:: ${actualHmacb64urlString} - shoujld be:: ${expected}`,
    );
});
