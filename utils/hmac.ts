import { decode, encode, type EncodingFormatOptions } from './encodingOpts.ts';
type SupportingTypes = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

export const hmac = async (
    hashType: SupportingTypes,
    secret: string | Uint8Array,
    msg: string | Uint8Array,
    inputEncoding: EncodingFormatOptions,
    outputEncoding?: EncodingFormatOptions,
) => {
    const enc = new TextEncoder();
    const secretBytes = typeof secret === 'string' ? enc.encode(secret) : secret;

    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        secretBytes.buffer,
        { name: 'HMAC', hash: { name: hashType } },
        false,
        ['sign', 'verify'],
    );

    const mbytes = encode({ msg, enc: inputEncoding });

    const signed = await crypto.subtle.sign(
        { name: 'HMAC' },
        cryptoKey,
        mbytes.buffer,
    );

    return outputEncoding
        ? decode({ msg: new Uint8Array(signed), enc: outputEncoding })
        : new Uint8Array(signed);
};
