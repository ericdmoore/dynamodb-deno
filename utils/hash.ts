import { decode, encode, type EncodingFormatOptions } from './encodingOpts.ts';

export const sha256 = async (
    input: {
        msg: string;
        enc: EncodingFormatOptions;
    } | Uint8Array,
    outputEncoding?: EncodingFormatOptions,
) => {
    const mesageBytes = input instanceof Uint8Array ? input : encode(input);

    const hash = await crypto.subtle.digest('SHA-256', mesageBytes.buffer);

    return outputEncoding
        ? decode({ msg: new Uint8Array(hash), enc: outputEncoding })
        : new Uint8Array(hash);
};
