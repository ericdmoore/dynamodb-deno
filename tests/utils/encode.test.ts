import { changeEnc, encode } from '../../utils/encodingOpts.ts';
import { assertEquals } from 'https://deno.land/std@0.181.0/testing/asserts.ts';

const enc = new TextEncoder();
const msg = 'Hello World!';

Deno.test('UTF8:: Hello World', () => {
    const unit8 = encode({ msg, enc: 'utf8' });
    assertEquals(
        unit8,
        Uint8Array.from([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33]),
        'Hello World in utf8 ascii code',
    );
});

Deno.test('B64:: Hello World', () => {
    const b64UInt8 = encode({ msg, enc: 'base64' });
    assertEquals(b64UInt8, enc.encode(btoa(msg)), 'Hello World in base64 ascii code');
});

Deno.test('B64_URL:: Hello World', () => {
    const b64UInt8 = encode({ msg, enc: 'base64url' });
    assertEquals(
        b64UInt8,
        enc.encode(
            btoa(msg)
                .replaceAll('+', '-')
                .replaceAll('/', '_')
                .replaceAll('=', ''),
        ),
        'Hello World in base64 ascii code',
    );
});

Deno.test('HEX :: Hello World', () => {
    const hexUInt8 = encode({ msg, enc: 'hex' });

    assertEquals(
        hexUInt8,
        Uint8Array.from([
            52,
            56,
            54,
            53,
            54,
            99,
            54,
            99,
            54,
            102,
            50,
            48,
            53,
            55,
            54,
            102,
            55,
            50,
            54,
            99,
            54,
            52,
            50,
            49,
        ]),
        'Hello World in hex ascii codes',
    );
});

Deno.test('HEX String:: Hello World', () => {
    const hexString = changeEnc(msg).from().to('hex').string();
    assertEquals(
        hexString,
        '48656c6c6f20576f726c6421',
        'Hello World in a hex string',
    );
});

Deno.test('Bijective Hex String:: Hello World', () => {
    const hexString = changeEnc(msg).from().to('hex').string();
    const hopefullyOrigString = changeEnc(hexString).from('hex').to('utf8').string();

    assertEquals(
        hopefullyOrigString,
        msg,
        'Hello World to hex and back shoudl get back the original string',
    );
});
