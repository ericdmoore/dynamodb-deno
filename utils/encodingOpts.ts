import {
    decode as hexDecode,
    encode as hexEncode,
} from 'https://deno.land/std@0.181.0/encoding/hex.ts';

import {
    decode as b64Decode,
    encode as b64Encode,
} from 'https://deno.land/std@0.181.0/encoding/base64.ts';

import {
    decode as b64urlDecode,
    encode as b64urlEncode,
} from 'https://deno.land/std@0.181.0/encoding/base64url.ts';

export type EncodingFormatOptions = 'hex' | 'base64' | 'base64url' | 'utf8';

export type AlreadyEncoded = { msg: Uint8Array; enc?: string };
export type NeedsEncoding = { msg: string; enc: EncodingFormatOptions };
export type EncodingInputs = { msg: string | Uint8Array; enc: EncodingFormatOptions };

export type DecodingInputs = { msg: string | Uint8Array; enc: EncodingFormatOptions };
export type NeedsDecoding = { msg: Uint8Array; enc: EncodingFormatOptions };
export type AlreadyDecoded = { msg: string; enc?: string };

export const encode = (encodeTo: NeedsEncoding | AlreadyEncoded | EncodingInputs): Uint8Array => {
    const enc = new TextEncoder();

    if (typeof encodeTo.msg === 'string') {
        switch (encodeTo.enc) {
            case 'hex':
                return hexEncode(enc.encode(encodeTo.msg));
            case 'base64':
                return enc.encode(b64Encode(encodeTo.msg));
            case 'base64url':
                return enc.encode(b64urlEncode(encodeTo.msg));
            case 'utf8':
                return enc.encode(encodeTo.msg);
            default:
                return new Uint8Array() as never;
        }
    } else {
        return encodeTo.msg;
    }
};

export const decode = (input: AlreadyDecoded | NeedsDecoding | DecodingInputs): string => {
    const dec = new TextDecoder();
    const enc = new TextEncoder();

    if (typeof input.msg === 'string') {
        switch (input.enc) {
            case 'hex':
                return dec.decode(hexDecode(enc.encode(input.msg))) as string;
            case 'base64':
                return dec.decode(b64Decode(input.msg)) as string;
            case 'base64url':
                return dec.decode(b64urlDecode(input.msg)) as string;
            case 'utf8':
                return dec.decode(enc.encode(input.msg)) as string;
            default:
                return '' as never;
        }
    } else {
        return dec.decode(input.msg) as string;
    }
};

export const base64string = (msg: string): string =>
    decode({ msg: encode({ msg, enc: 'base64' }), enc: 'utf8' });
export const stringFromBase64 = (msg: string): string => decode({ msg, enc: 'base64' });

export const base64UrlString = (msg: string): string =>
    decode({ msg: encode({ msg, enc: 'base64url' }), enc: 'utf8' });
export const stringFromBase64Url = (msg: string): string => decode({ msg, enc: 'base64url' });

export const hexString = (msg: string): string =>
    decode({ msg: encode({ msg, enc: 'hex' }), enc: 'utf8' });
export const stringFromHex = (msg: string): string => decode({ msg, enc: 'hex' });

export const toHex = hexString;
export const fromHex = stringFromHex;

export const toBase64 = base64string;
export const fromBase64 = stringFromBase64;

export const toBase64URL = base64UrlString;
export const fromBase64URL = stringFromBase64Url;

export default { encode, decode };
