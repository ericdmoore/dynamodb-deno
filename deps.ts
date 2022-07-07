export { decode, encode } from 'https://denopkg.com/chiefbiiko/std-encoding@v1.1.0/mod.ts';
export { hmac } from 'https://denopkg.com/chiefbiiko/hmac@v1.0.2/mod.ts';
export { sha256 } from 'https://denopkg.com/chiefbiiko/sha256@v1.0.2/mod.ts';

const dec = new TextDecoder();
const enc = new TextEncoder();

export const b64FromUint8Array = (buf: Uint8Array) => btoa(dec.decode(buf));
export const b64toUint8Array = (b64: string) => enc.encode(atob(b64));
