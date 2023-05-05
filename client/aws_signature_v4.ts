// import { decode, encode } from '../deps.ts';
import { hmac } from '../deps.ts';
import { date } from '../utils/index.ts';
import type { EncodingFormatOptions } from '../utils/encodingOpts.ts';

/** Some magic bytes. */
// why not - enc.encode('AWS4') as Uint8Array

const enc = new TextEncoder();

const AWS4: Uint8Array = enc.encode('AWS4');

/** Creates a HMAC-SHA256 mac.*/
export function awsSignatureV4(
    key: Uint8Array,
    msg: Uint8Array,
    outputEncoding?: EncodingFormatOptions,
) {
    return hmac('SHA-256', key, msg, 'utf8', outputEncoding);
}

/** Creates a key for generating an aws signature version 4. */
export async function kdf(
    key: string | Uint8Array,
    dateStamp: Date | string,
    region: string,
    service: string,
): Promise<Uint8Array> {
    const key_ = typeof key === 'string' ? enc.encode(key) : key;

    const paddedKey: Uint8Array = new Uint8Array(4 + key_.byteLength);

    paddedKey.set(AWS4, 0);
    paddedKey.set(key_, 4);

    const date_ = typeof dateStamp !== 'string'
        ? date.format(dateStamp, 'dateStamp') as string
        : dateStamp;

    if (!date.DATE_STAMP_REGEX.test(date_)) {
        throw new TypeError('date stamp format must be yyyymmdd');
    }

    let mac = await hmac('SHA-256', paddedKey, date_, 'utf8', undefined) as Uint8Array;
    mac = await hmac('SHA-256', mac, region, 'utf8', undefined) as Uint8Array;
    mac = await hmac('SHA-256', mac, service, 'utf8', undefined) as Uint8Array;
    mac = await hmac('SHA-256', mac, 'aws4_request', 'utf8', undefined) as Uint8Array;

    return mac;
}
