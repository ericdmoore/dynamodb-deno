import { createHeaders, HeadersConfig } from './create_headers.ts';
import { Doc } from '../utils/index.ts';

/** Base fetch. */
export async function baseFetch(
    conf: Doc,
    op: string,
    params: Doc,
): Promise<Doc> {
    const enc = new TextEncoder();
    const payload: Uint8Array = enc.encode(JSON.stringify(params));

    let headers: Headers = await createHeaders(
        op,
        payload,
        conf as HeadersConfig,
    );

    let response: Response = await fetch(conf.endpoint, {
        method: conf.method,
        headers,
        body: payload,
    });

    let body: Doc = await response.json();

    if (!response.ok) {
        if (response.status === 403) {
            // retry once with refreshed credenttials
            headers = await createHeaders(op, payload, conf as HeadersConfig, true);

            response = await fetch(conf.endpoint, {
                method: conf.method,
                headers,
                body: payload,
            });

            if (response.ok) {
                body = await response.json();

                return body;
            }
        }

        throw new Error(body.message || body.Message);
    }

    return body;
}
