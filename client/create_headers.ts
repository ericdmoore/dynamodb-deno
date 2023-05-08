import { sha256 } from '../utils/hmac.ts';
import { awsSignatureV4 } from './aws_signature_v4.ts';
import { date, Doc } from '../utils/index.ts';
import { ClientConfig } from '../mod.ts';

/** Algorithm identifer. */
const ALGORITHM = 'AWS4-HMAC-SHA256';

/** Content type header value for POST requests. */
const CONTENT_TYPE = 'application/x-amz-json-1.0';

/** Required configuration for assembling headers. */
export interface HeadersConfig extends ClientConfig {
    host: string; // dynamodb.us-west-2.amazonaws.com
    method: string; // POST
    cache: Doc; // internal cache for expensive-2-make signing key (& credScope)
    date?: Date; // allows reusing a date for 5min (max signature timestamp diff)
}

/** Assembles a header object for a DynamoDB request. */
export async function createHeaders(
    op: string,
    payload: Uint8Array,
    conf: HeadersConfig,
    refreshCredentials = !conf.cache.signingKey,
): Promise<Headers> {
    if (refreshCredentials) {
        await conf.cache.refresh();
    }
    const enc = new TextEncoder();
    const amzTarget = `DynamoDB_20120810.${op}`;
    const amzDate = date.format(conf.date || new Date(), 'amz') as string;
    const canonicalUri = conf.canonicalUri || '/';
    const canonicalHeaders = `content-type:${CONTENT_TYPE}\n` +
        `host:${conf.host}\n` +
        `x-amz-date:${amzDate}\n` +
        `x-amz-target:${amzTarget}\n`;

    const signedHeaders = 'content-type;host;x-amz-date;x-amz-target';
    const payloadHash = await sha256(payload, 'utf8', 'hex');
    const canonicalRequest = `${conf.method}\n${canonicalUri}\n\n` +
        `${canonicalHeaders}` +
        `\n${signedHeaders}` +
        `\n${payloadHash}`;

    const canonicalRequestDigest = await sha256(
        enc.encode(canonicalRequest),
        'utf8',
        'hex',
    );

    const msg: Uint8Array = enc.encode(
        `${ALGORITHM}\n${amzDate}\n${conf.cache.credentialScope}\n${canonicalRequestDigest}`,
    );

    const signature: string = awsSignatureV4(
        conf.cache.signingKey,
        msg,
        'hex',
    ) as string;

    const authorizationHeader =
        `${ALGORITHM} Credential=${conf.cache.accessKeyId}/${conf.cache.credentialScope}, ` +
        `SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const headers: Headers = new Headers({
        'Content-Type': CONTENT_TYPE,
        'X-Amz-Date': amzDate,
        'X-Amz-Target': amzTarget,
        Authorization: authorizationHeader,
    });

    // https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp_use-resources.html
    if (conf.cache.sessionToken) {
        headers.append('X-Amz-Security-Token', conf.cache.sessionToken);
    }

    return headers;
}
