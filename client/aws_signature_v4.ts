import { hmac } from '../deps.ts';
import { date } from '../utils/index.ts';
import  {type EncodingFormatOptions, changeEnc}  from '../utils/encodingOpts.ts'

/** Some magic bytes. */
const enc = new TextEncoder();
const AWS4: Uint8Array = enc.encode('AWS4');

/** Creates a HMAC-SHA256 mac.*/
export function awsSignatureV4(
    key: Uint8Array,
    msg: Uint8Array,
    outputEncoding?: EncodingFormatOptions,
): Promise<Uint8Array | string> {
    const outputter = (i: Uint8Array)=> changeEnc(i).from().to(outputEncoding ?? 'hex').string()
    return outputEncoding 
        ? hmac('SHA-256', key, msg, outputter) as Promise<string>
        : hmac('SHA-256', key, msg) ;
}

/** Creates a key for generating an aws signature version 4. */
export function kdf(
    key: string | Uint8Array,
    dateStamp: Date | string,
    region: string,
    service: string,
): Promise<Uint8Array> {
    let dateStamp_validated: string;
    if (typeof dateStamp === 'string') {
        if(!date.DATE_STAMP_REGEX.test(dateStamp)){
            throw new TypeError('date stamp format must be yyyymmdd');
        }else{
            dateStamp_validated = dateStamp
        }
    }else{
        dateStamp_validated = date.format(dateStamp, 'dateStamp') as string;
    }

    const key_ = typeof key === 'string' ? enc.encode(key) : key;
    const paddedKey: Uint8Array = new Uint8Array(4 + key_.byteLength);

    paddedKey.set(AWS4, 0);
    paddedKey.set(key_, 4);

    // let mac = await hmac('SHA-256', paddedKey, enc.encode(dateStamp_validated)) as Uint8Array
    // mac = await hmac('SHA-256', mac, enc.encode(region)) as Uint8Array;
    // mac = await hmac('SHA-256', mac, enc.encode(service)) as Uint8Array;
    // mac = await hmac('SHA-256', mac, enc.encode('aws4_request')) as Uint8Array;
    // return mac;

    return [dateStamp_validated, region, service, 'aws4_request']
        .reduce(async (mac, str) => 
            hmac('SHA-256', (await mac), enc.encode(str)) as Promise<Uint8Array>
        ,Promise.resolve(paddedKey) as Promise<Uint8Array>)

}
