import { assertEquals } from 'https://deno.land/std@0.34.0/testing/asserts.ts';
import { awsSignatureV4, kdf } from '../../client/aws_signature_v4.ts';

const enc = new TextEncoder();

Deno.test({
    name: 'aws signature v4 flow',
    async fn() {
        const expectedSignature =
            '31fac5ed29db737fbcafac527470ca6d9283283197c5e6e94ea40ddcec14a9c1';

        const key: Uint8Array = await kdf(
            'secret',
            '20310430',
            'region',
            'dynamodb',
        ) as Uint8Array;

        const msg: Uint8Array = enc.encode(
            'AWS4-HMAC-SHA256\n20310430T201613Z\n20310430/region/dynamodb/aws4_request\n4be20e7bf75dc6c7e93873b5f49096771729b8a28f0c62010db431fea79220ef',
            // 'utf8',
        );

        const actualSignature: string = await awsSignatureV4(
            key,
            msg,
            'hex',
        ) as string;

        assertEquals(actualSignature, expectedSignature);
    },
});
