# dynamodb

[![local ci][ci_img]](ci_url)

DynamoDB client that loves Deno - forked from [chiefbiiko](https://github.com/chiefbiiko/dynamodb)

## Usage

```ts
import { createClient } from "https://denopkg.com/ericdmoore/dynamodb-deno/mod.ts";

// config/credentials WILL NOT BE READ from the env/fs
// you MUST pass them in
// you can OPTIONALLY use chiefbiiko's other pkg to handle that if you like
//
// import { get as grabAwsCreds } from "https://denopkg.com/chiefbiiko/get-aws-config/mod.ts";

const dyno = createClient({credentials: grabAwsCreds() });

// the client has all of DynamoDB's operations as camelCased async methods
const result = await dyno.listTables();
```

## Fork Reason

Philosophically I perfer my libraries to not escalate permissions. 
The `chiefbiiko` package is incredible, however, I prefer clarity over convenience. It has some of automagically fetching credentials functions, and I leave those to the user's application. 
As shown in the [Usage](#Usage) documentation above; it assumes the user can manage their own credentials, but if that it too dificult, users can recreate a similar experience by leveraging the oother `chiefbiiko` package.

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
  credentials?: Credentials | (() => Credentials | Promise<Credentials>);
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

#### createClient

 ##### [`createClient(conf: ClientConfig): DynamoDBClient`

Creates a DynamoDB client.

### Ops

The client supports all DynamoDB operations. Check the linked aws docs for info
about parameters of a specific operation.

#### BatchGetItem

##### [`batchGetItem(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_BatchGetItem.html)

#### BatchWriteItem

##### [`batchWriteItem(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_BatchWriteItem.html)

#### CreateBackup

##### [`createBackup(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_CreateBackup.html)

#### CreateGlobalTable

##### [`createGlobalTable(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_CreateGlobalTable.html)

#### CreateTable

##### [`createTable(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_CreateTable.html)

#### DeleteBackup

##### [`deleteBackup(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DeleteBackup.html)

#### DeleteItem

##### [`deleteItem(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DeleteItem.html)

#### DeleteTable

##### [`deleteTable(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DeleteTable.html)

#### DescribeBackup

 ##### [`describeBackup(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DescribeBackup.html)

#### DescribeContinuousBackups

 ##### [`describeContinuousBackups(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DescribeContinuousBackups.html)

#### DescribeEndpoints

 ##### [`describeEndpoints(options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DescribeEndpoints.html)

#### DescribeGlobalTable

 ##### [`describeGlobalTable(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DescribeGlobalTable.html)

#### DescribeGlobalTableSettings

 ##### [`describeGlobalTableSettings(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DescribeGlobalTableSettings.html)

#### DescribeLimits

 ##### [`describeLimits(options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DescribeLimits.html)

#### DescribeTable

 ##### [`describeTable(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DescribeTable.html)

#### DescribeTimeToLive

 ##### [`describeTimeToLive(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_DescribeTimeToLive.html)

#### GetItem

 ##### [`getItem(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_GetItem.html)

#### ListBackups

 ##### [`listBackups(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_ListBackups.html)

#### ListGlobalTables

 ##### [`listGlobalTables(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_ListGlobalTables.html)

#### ListTables

 ##### [`listTables(options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_ListTables.html)

#### ListTagsOfResource

 ##### [`listTagsOfResource(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_ListTagsOfResource.html)

#### PutItem

 ##### [`putItem(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_PutItem.html)

#### Query

 ##### [`query(params: Doc, options?: OpOptions): Promise<Doc | AsyncIterableIterator<Doc>>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html)

#### RestoreTableFromBackup

 ##### [`restoreTableFromBackup(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_RestoreTableFromBackup.html)

#### RestoreTableToPointInTime

 ##### [`restoreTableToPointInTime(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_RestoreTableToPointInTime.html)

#### Scan

 ##### [`scan(params: Doc, options?: OpOptions): Promise<Doc | AsyncIterableIterator<Doc>>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Scan.html)

#### TagResource

 ##### [`tagResource(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_TagResource.html)

#### TransactGetItems

 ##### [`transactGetItems(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_TransactGetItems.html)

#### TransactWriteItems

 ##### [`transactWriteItems(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_TransactWriteItems.html)

#### UntagResource

 ##### [`untagResource(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UntagResource.html)

#### UpdateContinuousBackups

 ##### [`updateContinuousBackups(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateContinuousBackups.html)

#### UpdateGlobalTable

 ##### [`updateGlobalTable(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateGlobalTable.html)

#### UpdateGlobalTableSettings

 ##### [`updateGlobalTableSettings(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateGlobalTableSettings.html)

#### UpdateItem

 ##### [`updateItem(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateItem.html)

#### UpdateTable

 ##### [`updateTable(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateTable.html)

#### UpdateTimeToLive

 ##### [`updateTimeToLive(params: Doc, options?: OpOptions): Promise<Doc>`](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_UpdateTimeToLive.html)

## License

[MIT](./LICENSE)

[ci_url]:https://github.com/ericdmoore/dynamodb-deno/actions/workflows/local_ci.yml
[ci_img]:https://github.com/ericdmoore/dynamodb-deno/actions/workflows/local_ci.yml/badge.svg?branch=master