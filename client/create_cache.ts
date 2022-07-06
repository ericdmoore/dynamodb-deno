import { ClientConfig } from '../mod.ts';
import { kdf } from './aws_signature_v4.ts';
import { date, Doc } from '../util.ts';

/** Service name. */
const SERVICE = 'dynamodb';

/** Cache for credentialScope and expensive signature key. */
export function createCache(conf: ClientConfig): Doc {
    return {
        _credentialScope: '',
        _signingKey: null,
        _accessKeyId: '',
        _sessionToken: '',
        // deno-lint-ignore require-await
        async refresh(): Promise<void> {
            const dateStamp = date.format(new Date(), 'dateStamp') as string;
            const credentials = typeof conf.credentials === 'function'
                ? conf.credentials()
                : conf.credentials;

            this._signingKey = kdf(
                credentials.secretAccessKey,
                dateStamp,
                conf.region!,
                SERVICE,
            ) as Uint8Array;

            this._credentialScope = `${dateStamp}/${conf.region}/${SERVICE}/aws4_request`;
            this._accessKeyId = credentials.accessKeyId;
            this._sessionToken = credentials.sessionToken;
        },
        get signingKey(): Uint8Array {
            return this._signingKey;
        },
        get credentialScope(): string {
            return this._credentialScope;
        },
        get accessKeyId(): string {
            return this._accessKeyId;
        },
        get sessionToken(): string {
            return this._sessionToken;
        },
    };
}
