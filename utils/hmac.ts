import { changeEnc, type EncodingFormatOptions } from './encodingOpts.ts';

type SupportingTypes = 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512';

export const hmac = async (
    hashType: SupportingTypes,
    secret: Uint8Array,
    msg: Uint8Array,
    outputFmtr?: (i: Uint8Array) => string,
) => {
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        secret.buffer,
        { name: 'HMAC', hash: { name: hashType } },
        false,
        ['sign', 'verify'],
    );

    const signed = await crypto.subtle.sign(
        { name: 'HMAC' },
        cryptoKey,
        msg.buffer,
    );

    const signedBytes = new Uint8Array(signed);
    return outputFmtr ? outputFmtr(signedBytes) : signedBytes;
};

export const hash = async (
    hashType: SupportingTypes,
    secret: Uint8Array,
    msg: Uint8Array,
    outputFmtr?: (i: Uint8Array) => string,
) => {
    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        secret.buffer,
        { name: 'HMAC', hash: { name: hashType } },
        false,
        ['sign', 'verify'],
    );

    const signed = await crypto.subtle.sign(
        { name: 'HMAC' },
        cryptoKey,
        msg.buffer,
    );

    const signedBytes = new Uint8Array(signed);
    return outputFmtr ? outputFmtr(signedBytes) : signedBytes;
};

export const sha256 = async (
    msg: Uint8Array,
    inEnc: EncodingFormatOptions = 'utf8',
    outEnc: EncodingFormatOptions,
) => {
    const digest = await crypto.subtle.digest('SHA-256', msg.buffer);
    const signedBytes = new Uint8Array(digest);
    return changeEnc(signedBytes).from().to(outEnc).string();
};
