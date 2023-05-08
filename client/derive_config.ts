import { ClientConfig } from '../mod.ts';
import { Doc } from '../utils/index.ts';
import { createCache } from './create_cache.ts';

/** Derives host and endpoint. */
function deriveHostEndpoint(
    region: string,
    port = 8000,
    host = 'localhost',
): { host: string; endpoint: string } {
    let _host: string = host;
    let endpoint: string;

    if (region === 'local') {
        endpoint = `http://${host}:${port}/`;
    } else {
        _host = `dynamodb.${region}.amazonaws.com`;
        endpoint = `https://${_host}:443/`;
    }

    return { host: _host, endpoint };
}

/** Derives an internal config object from a ClientConfig. */
export function deriveConfig(conf: ClientConfig): Doc {
    return {
        ...conf,
        cache: createCache(conf),
        method: 'POST',
        credentials: typeof conf.credentials === 'function' ? conf.credentials() : conf.credentials,
        ...deriveHostEndpoint(conf.region!, conf.port!, conf.host!),
    };
}
