# dynamodb-deno

[![CI Badge][ci_img]][ci_url] [![Coverage Badge][coverage_img]][coverage_url]

DynamoDB client that loves Deno - forked from
[chiefbiiko](https://github.com/chiefbiiko/dynamodb)

## Usage

```ts
import { createClient } from 'https://denopkg.com/ericdmoore/dynamodb-deno/mod.ts';

// config/credentials WILL NOT BE READ from the env/fs
// you MUST pass them in
// you can OPTIONALLY use chiefbiiko's other pkg to handle that if you like
//
// import { get as grabAwsCreds } from "https://denopkg.com/chiefbiiko/get-aws-config/mod.ts";

const dyno = createClient({ credentials: grabAwsCreds() });

// the client has all of DynamoDB's operations as camelCased async methods
const result = await dyno.listTables();
```

## Fork Reason

Philosophically I perfer my libraries to not escalate permissions. The
`chiefbiiko` package is incredible, however, I prefer clarity over convenience.
It has some of automagically fetching credentials functions, and I leave those
to the user's application. As shown in the [Usage](#Usage) documentation above;
it assumes the user can manage their own credentials, but if that it too
dificult, users can recreate a similar experience by leveraging the oother
`chiefbiiko` package.

There have also been some non-material stylistic changes - since I intend to
maintain this fork.

## API

### Contents

1. [Basics](#Basics)

2. [Factory](#Factory)

3. [Ops](#Ops)

   - [BatchGetItem](#BatchGetItem)

   - [BatchWriteItem](#BatchWriteItem)

   - [CreateBackup](#CreateBackup)

   - [CreateGlobalTable](#CreateGlobalTable)

   - [CreateTable](#CreateTable)

   - [DeleteBackup](#DeleteBackup)

   - [DeleteItem](#DeleteItem)

   - [DeleteTable](#DeleteTable)

   - [DescribeBackup](#DescribeBackup)

   - [DescribeContinuousBackups](#DescribeContinuousBackups)

   - [DescribeEndpoints](#DescribeEndpoints)

   - [DescribeGlobalTable](#DescribeGlobalTable)

   - [DescribeGlobalTableSettings](#DescribeGlobalTableSettings)

   - [DescribeLimits](#DescribeLimits)

   - [DescribeTable](#DescribeTable)

   - [DescribeTimeToLive](#DescribeTimeToLive)

   - [GetItem](#GetItem)

   - [ListBackups](#ListBackups)

   - [ListGlobalTables](#ListGlobalTables)

   - [ListTables](#ListTables)

   - [ListTagsOfResource](#ListTagsOfResource)

   - [PutItem](#PutItem)

   - [Query](#Query)

   - [RestoreTableFromBackup](#RestoreTableFromBackup)

   - [RestoreTableToPointInTime](#RestoreTableToPointInTime)

   - [Scan](#Scan)

   - [TagResource](#TagResource)

   - [TransactGetItems](#TransactGetItems)

   - [TransactWriteItems](#TransactWriteItems)

   - [UntagResource](#UntagResource)

   - [UpdateContinuousBackups](#UpdateContinuousBackups)

   - [UpdateGlobalTable](#UpdateGlobalTable)

   - [UpdateGlobalTableSettings](#UpdateGlobalTableSettings)

   - [UpdateItem](#UpdateItem)

   - [UpdateTable](#UpdateTable)

   - [UpdateTimeToLive](#UpdateTimeToLive)

### Basics

```ts
/** Generic document. */
export interface Doc {
    [key: string]: any;
}

/** Generic representation of a DynamoDB client. */
export interface DynamoDBClient {
    describeEndpoints: (options?: Doc) => Promise<Doc>;
    describeLimits: (options?: Doc) => Promise<Doc>;
    listTables: (options?: Doc) => Promise<Doc>;
    scan: (
        params: Doc,
        options?: Doc,
    ) => Promise<Doc | AsyncIterableIterator<Doc>>;
    query: (
        params: Doc,
        options?: Doc,
    ) => Promise<Doc | AsyncIterableIterator<Doc>>;
    [key: string]: (params: Doc, options?: Doc) => Promise<Doc>;
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

/** Op options. */
export interface OpOptions {
    wrapNumbers?: boolean; // wrap numbers to a special number value type? [false]
    convertEmptyValues?: boolean; // convert empty strings and binaries? [false]
    translateJSON?: boolean; // translate I/O JSON schemas? [true]
    iteratePages?: boolean; // if a result is paged, async-iterate it? [true]
}
```

### Factory

##### `createClient(conf: ClientConfig): DynamoDBClient`

Creates a DynamoDB client.

### Ops

The client supports all DynamoDB operations. Check the linked aws docs for info
about parameters of a specific operation.

1. [`batchGetItem(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_BatchGetItem.html)

1. [`batchWriteItem(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_BatchWriteItem.html)

1. [`createBackup(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_CreateBackup.html)

1. [`createGlobalTable(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_CreateGlobalTable.html)

1. [`createTable(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_CreateTable.html)

1. [`deleteBackup(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DeleteBackup.html)

1. [`deleteItem(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DeleteItem.html)

1. [`deleteTable(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DeleteTable.html)

1. [`describeBackup(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DescribeBackup.html)

1. [`describeContinuousBackups(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DescribeContinuousBackups.html)

1. [`describeEndpoints(options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DescribeEndpoints.html)

1. [`describeGlobalTable(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DescribeGlobalTable.html)

1. [`describeGlobalTableSettings(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DescribeGlobalTableSettings.html)

1. [`describeLimits(options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DescribeLimits.html)

1. [`describeTable(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DescribeTable.html)

1. [`describeTimeToLive(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DescribeTimeToLive.html)

1. [`getItem(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_GetItem.html)

1. [`listBackups(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_ListBackups.html)

1. [`listGlobalTables(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_ListGlobalTables.html)

1. [`listTables(options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_ListTables.html)

1. [`listTagsOfResource(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_ListTagsOfResource.html)

1. [`putItem(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_PutItem.html)

1. [`query(params: Doc, options?: OpOptions): Promise<Doc | AsyncIterableIterator<Doc>>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html)

1. [`restoreTableFromBackup(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_RestoreTableFromBackup.html)

1. [`restoreTableToPointInTime(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_RestoreTableToPointInTime.html)

1. [`scan(params: Doc, options?: OpOptions): Promise<Doc | AsyncIterableIterator<Doc>>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html)

1. [`tagResource(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_TagResource.html)

1. [`transactGetItems(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_TransactGetItems.html)

1. [`transactWriteItems(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_TransactWriteItems.html)

1. [`untagResource(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UntagResource.html)

1. [`updateContinuousBackups(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateContinuousBackups.html)

1. [`updateGlobalTable(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateGlobalTable.html)

1. [`updateGlobalTableSettings(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateGlobalTableSettings.html)

1. [`updateItem(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html)

1. [`updateTable(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateTable.html)

1. [`updateTimeToLive(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateTimeToLive.html)

## License

[MIT](./LICENSE)

<!-- References -->

[ci_url]: https://github.com/ericdmoore/dynamodb-deno/actions/workflows/local_ci.yml
[ci_img]: https://github.com/ericdmoore/dynamodb-deno/actions/workflows/local_ci.yml/badge.svg?branch=master
[coverage_img]: https://img.shields.io/codecov/c/github/ericdmoore/dynamodb-deno
[coverage_url]: https://codecov.io/gh/ericdmoore/dynamodb-deno/branch/master
