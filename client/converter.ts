// deno-lint-ignore-file no-explicit-any
import { Doc, DynamoDBNumberValue, DynamoDBSet, typeOf } from '../utils/index.ts';
// import {encode, decode} from '../utils/encodingOpts.ts'

type ValidSetTypes = Set<string> | Set<number> | Set<Uint8Array>;

interface FilterableInput {
    type: 'String' | 'Number' | 'Binary';
    values: string[] | number[] | Uint8Array[];
}

interface FormatInputOptions {
    convertEmptyValues: boolean;
    wrapNumbers: boolean;
}

// type BinarayLike =
//     | File
//     | Blob
//     | Buffer
//     | ArrayBuffer
//     | DataView
//     | Int8Array
//     | Uint8Array
//     | Uint8ClampedArray
//     | Int16Array
//     | Uint16Array
//     | Int32Array
//     | Uint32Array
//     | Float32Array
//     | Float64Array;

type ConvertableInputs =
    | Doc
    | string
    | number
    | Array<unknown>
    | unknown
    | Set<string | number | Uint8Array>
    | boolean
    | null
    | Uint8Array;
// | BinarayLike

// const b64toUint8Array = (b64: string) => encode({msg: b64, enc: 'base64'})
// const b64FromUint8Array = (buf: Uint8Array) => decode({msg: buf, enc: 'base64'})

const dec = new TextDecoder();
const enc = new TextEncoder();

const b64FromUint8Array = (buf: Uint8Array) => btoa(dec.decode(buf));
const b64toUint8Array = (b64: string) => enc.encode(atob(b64));

/** Formats a list. */
function formatList(data: unknown[], options?: FormatInputOptions): Doc {
    const list: Doc = { L: [] };

    for (let i = 0; i < data.length; i++) {
        list['L'].push(Converter.input(data[i], options));
    }

    return list;
}

/** Converts a number. */
function convertNumber(value: string, options?: FormatInputOptions): any {
    return options?.wrapNumbers ? new DynamoDBNumberValue(value) : Number(value);
}

/** Formats a map. */
export function formatMap(data: Doc, options?: FormatInputOptions): Doc {
    const map: Doc = { M: {} };

    for (const key in data) {
        const formatted: Doc = Converter.input(data[key], options);

        if (formatted !== undefined) {
            map['M'][key] = formatted;
        }
    }

    return map;
}

/** Formats a set. */
export function formatSet(
    data: ValidSetTypes,
    options?: FormatInputOptions,
): Doc {
    const values = [...data.values()] as string[] | number[] | Uint8Array[];
    const setType: 'String' | 'Number' | 'Binary' = typeof values[0] === 'string'
        ? 'String'
        : typeof values[0] === 'number'
        ? 'Number'
        : 'Binary';

    if (
        options?.convertEmptyValues && filterEmptySetValues({ type: setType, values }).length === 0
    ) {
        return Converter.input(null);
    }

    const map: Doc = {};
    switch (setType) {
        case 'String':
            map['SS'] = options?.convertEmptyValues
                ? filterEmptySetValues({ type: setType, values })
                : values;
            break;
        case 'Binary':
            map['BS'] = (values as Uint8Array[])
                .filter((v) => !options?.convertEmptyValues || v?.length > 0)
                .map((v) => b64FromUint8Array(v));
            break;
        case 'Number':
            // NO Empties - therefore no filtering
            map['NS'] = values.map((n) => (n as number).toString());
    }

    return map;
}

/** Filters empty set values. */
/** Filters empty set values. */
export function filterEmptySetValues(set: FilterableInput): unknown[] {
    return set.type !== 'Number'
        ? (set.values as (string | Uint8Array)[]).filter((e) => e && e.length > 0)
        : set.values;
}

/** aws DynamoDB req/res document converter. */
export class Converter {
    /**
     * Convert a JavaScript value to its equivalent DynamoDB AttributeValue type
     *
     * @param data [any] The data to convert to a DynamoDB AttributeValue
     * @param options [map]
     * @option options convertEmptyValues [Boolean] Whether to automatically
     *                                              convert empty strings, blobs,
     *                                              and sets to `null`
     * @option options wrapNumbers [Boolean]  Whether to return numbers as a
     *                                        NumberValue object instead of
     *                                        converting them to native JavaScript
     *                                        numbers. This allows for the safe
     *                                        round-trip transport of numbers of
     *                                        arbitrary size.
     * @return [map] An object in the Amazon DynamoDB AttributeValue format
     *
     * @see AWS.DynamoDB.Converter.marshall AWS.DynamoDB.Converter.marshall to
     *    convert entire records (rather than individual attributes)
     */
    static input(data: ConvertableInputs, options?: FormatInputOptions): Doc {
        const type: string = typeOf(data);
        if (type === 'Object') {
            return formatMap(data as Doc, options);
        } else if (type === 'Array') {
            return formatList(data as Array<unknown>, options);
        } else if (type === 'Set') {
            return formatSet(data as ValidSetTypes, options);
        } else if (type === 'String') {
            if ((data as string).length === 0 && options?.convertEmptyValues) {
                return Converter.input(null);
            }
            return { S: data };
        } else if (type === 'Number' || type === 'NumberValue') {
            return { N: (data as number).toString() };
        } else if (type === 'Binary') {
            if ((data as Uint8Array).length === 0 && options?.convertEmptyValues) {
                return Converter.input(null);
            }
            return { B: b64FromUint8Array(data as Uint8Array) };
        } else if (type === 'Boolean') {
            return { BOOL: data };
        } else if (type === 'null') {
            return { NULL: true };
        } else if (type !== 'undefined' && type !== 'Function') {
            // this value has a custom constructor
            return formatMap(data as Doc, options);
        }
        return {};
    }

    /**
     * Convert a JavaScript object into a DynamoDB record.
     *
     * @param data [any] The data to convert to a DynamoDB record
     * @param options [map]
     * @option options convertEmptyValues [Boolean] Whether to automatically
     *                                              convert empty strings, blobs,
     *                                              and sets to `null`
     * @option options wrapNumbers [Boolean]  Whether to return numbers as a
     *                                        NumberValue object instead of
     *                                        converting them to native JavaScript
     *                                        numbers. This allows for the safe
     *                                        round-trip transport of numbers of
     *                                        arbitrary size.
     *
     * @return [map] An object in the DynamoDB record format.
     *
     * @example Convert a JavaScript object into a DynamoDB record
     *  var marshalled = AWS.DynamoDB.Converter.marshall({
     *    string: 'foo',
     *    list: ['fizz', 'buzz', 'pop'],
     *    map: {
     *      nestedMap: {
     *        key: 'value',
     *      }
     *    },
     *    number: 123,
     *    nullValue: null,
     *    boolValue: true,
     *    stringSet: new DynamoDBSet(['foo', 'bar', 'baz'])
     *  });
     */
    static marshall(data: Doc, options?: FormatInputOptions): Doc {
        return Converter.input(data, options).M;
    }

    /**
     * Convert a DynamoDB AttributeValue object to its equivalent JavaScript type.
     *
     * @param data [map] An object in the Amazon DynamoDB AttributeValue format
     * @param options [map]
     * @option options convertEmptyValues [Boolean] Whether to automatically
     *                                              convert empty strings, blobs,
     *                                              and sets to `null`
     * @option options wrapNumbers [Boolean]  Whether to return numbers as a
     *                                        NumberValue object instead of
     *                                        converting them to native JavaScript
     *                                        numbers. This allows for the safe
     *                                        round-trip transport of numbers of
     *                                        arbitrary size.
     *
     * @return [Object|Array|String|Number|Boolean|null]
     *
     * @see AWS.DynamoDB.Converter.unmarshall AWS.DynamoDB.Converter.unmarshall to
     *    convert entire records (rather than individual attributes)
     */
    static output(data: Doc, options: Doc = {}): any {
        for (const type in data) {
            const values: any = data[type];

            if (type === 'M') {
                const map: Doc = {};

                for (const key in values) {
                    map[key] = Converter.output(values[key], options);
                }

                return map;
            } else if (type === 'L') {
                // list = [];
                // for (i = 0; i < values.length; i++) {
                //   list.push(Converter.output(values[i], options));
                // }
                // return list;
                return values.map((value: any): any => Converter.output(value, options));
            } else if (type === 'SS') {
                // list = [];
                // for (i = 0; i < values.length; i++) {
                //   list.push(values[i] + '');
                // }
                // return new DynamoDBSet(list);
                return new DynamoDBSet(values.map(String));
            } else if (type === 'NS') {
                // list = [];
                // for (i = 0; i < values.length; i++) {
                //   list.push(convertNumber(values[i], options.wrapNumbers));
                // }
                // return new DynamoDBSet(list);
                return new DynamoDBSet(
                    values.map((value: any): number => convertNumber(value, options.wrapNumbers)),
                );
            } else if (type === 'BS') {
                // list = [];
                // for (i = 0; i < values.length; i++) {
                //   list.push(base64ToUint8Array(values[i]));
                // }
                // return new DynamoDBSet(list);
                return new DynamoDBSet(values.map(b64toUint8Array));
            } else if (type === 'S') {
                return String(values);
            } else if (type === 'N') {
                return convertNumber(values, options.wrapNumbers);
            } else if (type === 'B') {
                return b64toUint8Array(values);
            } else if (type === 'BOOL') {
                return values === 'true' || values === 'TRUE' || values === true;
            } else if (type === 'NULL') {
                return null;
            }
        }
    }

    /**
     * Convert a DynamoDB record into a JavaScript object.
     *
     * @param data [any] The DynamoDB record
     * @param options [map]
     * @option options convertEmptyValues [Boolean] Whether to automatically
     *                                              convert empty strings, blobs,
     *                                              and sets to `null`
     * @option options wrapNumbers [Boolean]  Whether to return numbers as a
     *                                        NumberValue object instead of
     *                                        converting them to native JavaScript
     *                                        numbers. This allows for the safe
     *                                        round-trip transport of numbers of
     *                                        arbitrary size.
     *
     * @return [map] An object whose properties have been converted from
     *    DynamoDB's AttributeValue format into their corresponding native
     *    JavaScript types.
     *
     * @example Convert a record received from a DynamoDB stream
     *  var unmarshalled = AWS.DynamoDB.Converter.unmarshall({
     *    string: {S: 'foo'},
     *    list: {L: [{S: 'fizz'}, {S: 'buzz'}, {S: 'pop'}]},
     *    map: {
     *      M: {
     *        nestedMap: {
     *          M: {
     *            key: {S: 'value'}
     *          }
     *        }
     *      }
     *    },
     *    number: {N: '123'},
     *    nullValue: {NULL: true},
     *    boolValue: {BOOL: true}
     *  });
     */
    static unmarshall(data: Doc, options?: Doc): Doc {
        return Converter.output({ M: data }, options);
    }
}
