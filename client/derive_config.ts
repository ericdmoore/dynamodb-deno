import { ClientConfig } from "../mod.ts";
import { Doc } from "../util.ts";
import { createCache } from "./create_cache.ts";

/** Derives host and endpoint. */
function deriveHostEndpoint(
  region: string,
  port = 8000,
  host = "localhost",
): { host: string; endpoint: string } {
  let _host: string = host;
  let endpoint: string;

  if (region === "local") {
    endpoint = `http://${host}:${port}/`;
  } else {
    _host = `dynamodb.${region}.amazonaws.com`;
    endpoint = `https://${_host}:443/`;
  }

  return { host: _host, endpoint };
}

/** Derives an internal config object from a ClientConfig. */
export function deriveConfig(conf: ClientConfig): Doc {
  const _conf: ClientConfig = { ...conf };

  if (typeof _conf.credentials === "function") {
    try {
      _conf.credentials = _conf.credentials();
    } catch (e) {
      throw new Error(e);
    }
  }

  return {
    ..._conf,
    cache: createCache(_conf),
    method: "POST",
    ...deriveHostEndpoint(_conf.region!, _conf.port!, _conf.host!),
  };
}
