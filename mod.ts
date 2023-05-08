import { baseOp, deriveConfig } from './client/mod.ts';
import { camelCase, Doc } from './utils/index.ts';

/** Convenience export. */
export type { Doc } from './utils/index.ts';

/** Generic representation of a DynamoDB client. */
export interface DynamoDBClient {
    scan: (params: Doc, options?: Doc) => Promise<Doc | AsyncIterableIterator<Doc>>;
    query: (params: Doc, options?: Doc) => Promise<Doc | AsyncIterableIterator<Doc>>;

    describeEndpoints: (options?: Doc) => Promise<Doc>;
    describeLimits: (options?: Doc) => Promise<Doc>;
    listTables: (options?: Doc) => Promise<Doc>;

    batchGetItem: (params: Doc, options?: Doc) => Promise<Doc>;
    batchWriteItem: (params: Doc, options?: Doc) => Promise<Doc>;
    createBackup: (params: Doc, options?: Doc) => Promise<Doc>;
    createGlobalTable: (params: Doc, options?: Doc) => Promise<Doc>;
    createTable: (params: Doc, options?: Doc) => Promise<Doc>;
    deleteBackup: (params: Doc, options?: Doc) => Promise<Doc>;
    deleteItem: (params: Doc, options?: Doc) => Promise<Doc>;
    deleteTable: (params: Doc, options?: Doc) => Promise<Doc>;
    describeBackup: (params: Doc, options?: Doc) => Promise<Doc>;
    describeContinuousBackups: (params: Doc, options?: Doc) => Promise<Doc>;
    describeGlobalTable: (params: Doc, options?: Doc) => Promise<Doc>;
    describeGlobalTableSettings: (params: Doc, options?: Doc) => Promise<Doc>;
    describeTable: (params: Doc, options?: Doc) => Promise<Doc>;
    describeTimeToLive: (params: Doc, options?: Doc) => Promise<Doc>;
    getItem: (params: Doc, options?: Doc) => Promise<Doc>;
    listBackups: (params: Doc, options?: Doc) => Promise<Doc>;
    listGlobalTables: (params: Doc, options?: Doc) => Promise<Doc>;
    listTagsOfResource: (params: Doc, options?: Doc) => Promise<Doc>;
    putItem: (params: Doc, options?: Doc) => Promise<Doc>;
    restoreTableFromBackup: (params: Doc, options?: Doc) => Promise<Doc>;
    restoreTableToPointInTime: (params: Doc, options?: Doc) => Promise<Doc>;
    tagResource: (params: Doc, options?: Doc) => Promise<Doc>;
    transactGetItems: (params: Doc, options?: Doc) => Promise<Doc>;
    transactWriteItems: (params: Doc, options?: Doc) => Promise<Doc>;
    untagResource: (params: Doc, options?: Doc) => Promise<Doc>;
    updateContinuousBackups: (params: Doc, options?: Doc) => Promise<Doc>;
    updateGlobalTable: (params: Doc, options?: Doc) => Promise<Doc>;
    updateGlobalTableSettings: (params: Doc, options?: Doc) => Promise<Doc>;
    updateItem: (params: Doc, options?: Doc) => Promise<Doc>;
    updateTable: (params: Doc, options?: Doc) => Promise<Doc>;
    updateTimeToLive: (params: Doc, options?: Doc) => Promise<Doc>;
    [otherFnName: string]: (params: Doc, options?: Doc) => Promise<Doc>;
}

/** Credentials. */
export interface Credentials {
    accessKeyId: string; // AKIAIOSFODNN7EXAMPLE
    secretAccessKey: string; // wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
    sessionToken?: string; // somesessiontoken
}

/** Client configuration. */
export interface ClientConfig {
    credentials: Credentials | (() => Credentials);
    region?: string; // us-west-2
    profile?: string; // default
    canonicalUri?: string; // fx /path/to/somewhere
    port?: number; // 80
    host?: string; // localhost
}

/** DynamoDB operations. */
export const OPS: Set<string> = new Set<string>([
    'BatchGetItem',
    'BatchWriteItem',
    'CreateBackup',
    'CreateGlobalTable',
    'CreateTable',
    'DeleteBackup',
    'DeleteItem',
    'DeleteTable',
    'DescribeBackup',
    'DescribeContinuousBackups',
    'DescribeEndpoints',
    'DescribeGlobalTable',
    'DescribeGlobalTableSettings',
    'DescribeLimits',
    'DescribeTable',
    'DescribeTimeToLive',
    'GetItem',
    'ListBackups',
    'ListGlobalTables',
    'ListTables',
    'ListTagsOfResource',
    'PutItem',
    'Query',
    'RestoreTableFromBackup',
    'RestoreTableToPointInTime',
    'Scan',
    'TagResource',
    'TransactGetItems',
    'TransactWriteItems',
    'UntagResource',
    'UpdateContinuousBackups',
    'UpdateGlobalTable',
    'UpdateGlobalTableSettings',
    'UpdateItem',
    'UpdateTable',
    'UpdateTimeToLive',
]);

/** Creates a DynamoDB client. */
export function createClient(conf: ClientConfig): DynamoDBClient {
    const dyno: DynamoDBClient = {} as DynamoDBClient;
    for (const op of OPS) {
        dyno[camelCase(op)] = baseOp.bind(null, deriveConfig(conf), op);
    }
    return dyno;
}
