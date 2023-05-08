import { hmac } from '../deps.ts';
import { date } from '../utils/index.ts';

/** Some magic bytes. */
const enc = new TextEncoder();

const AWS4: Uint8Array = enc.encode('AWS4');

/** Creates a HMAC-SHA256 mac.*/
export function awsSignatureV4(
    key: Uint8Array,
    msg: Uint8Array,
    outputEncoding?: string,
): string | Uint8Array {
    return hmac('sha256', key, msg, undefined, outputEncoding);
}

/** Creates a key for generating an aws signature version 4. */
export function kdf(
    key: string | Uint8Array,
    dateStamp: Date | string,
    region: string,
    service: string,
): Uint8Array {
    const key_ = typeof key === 'string' ? enc.encode(key) : key;

    if (typeof dateStamp !== 'string') {
        dateStamp = date.format(dateStamp, 'dateStamp') as string;
    } else if (!date.DATE_STAMP_REGEX.test(dateStamp)) {
        throw new TypeError('date stamp format must be yyyymmdd');
    }

    const paddedKey: Uint8Array = new Uint8Array(4 + key_.byteLength);

    paddedKey.set(AWS4, 0);
    paddedKey.set(key_, 4);

    let mac: Uint8Array = hmac(
        'sha256',
        paddedKey,
        dateStamp as string,
        'utf8',
    ) as Uint8Array;

    mac = hmac('sha256', mac, region, 'utf8') as Uint8Array;
    mac = hmac('sha256', mac, service, 'utf8') as Uint8Array;
    mac = hmac('sha256', mac, 'aws4_request', 'utf8') as Uint8Array;
    return mac;
}
