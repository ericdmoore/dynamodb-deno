/**
 * Forked from github.com/chiefbiiko/dynamodb
 *
 * Revised the test suite to prefer the local dynamo service with a
 * setup and teardown process
 *
 * To accomplish this test harness for a localized service,
 * the test suite needs `Deno.Run` permissions
 */

console.log('preclient import');

import {
	assert,
	assertEquals,
	assertThrowsAsync,
} from 'https://deno.land/std@0.34.0/testing/asserts.ts';

import {
	type ClientConfig,
	createClient,
	type DynamoDBClient,
} from '../mod.ts';
import { deriveConfig } from '../client/derive_config.ts';
import { Doc } from '../util.ts';

const conf: ClientConfig = {
	credentials: {
		accessKeyId: 'DynamoDBLocal',
		secretAccessKey: 'DoesNotDoAnyAuth',
		sessionToken: 'preferTemporaryCredentials',
	},
	region: 'local',
	port: 8000, // DynamoDB Local's default port
};

console.log('preclient createClient ');

const dyno: DynamoDBClient = createClient(conf);
const TABLE_NAME = 'testing_table';

const exec = async (cmd: string) => {
	const encoder = new TextEncoder();
	const decoder = new TextDecoder();

	const p = Deno.run({
		cmd: ['bash'],
		stdin: 'piped',
		stdout: 'piped',
	});

	await p.stdin.write(encoder.encode(cmd));
	await p.stdin.close();

	const output = await p.output();
	p.close();

	return decoder.decode(output);
};

console.log('Start Tests');

Deno.test('Using The Local Dynamo DB Service', async (setup) => {
	await setup.step({
		name: 'Setup B. Start local server',
		fn: async (t) => {
			await t.step('Setup C. Ensure Tables', async () => {
				const result = await dyno.listTables();

				if (!result.TableNames.includes(TABLE_NAME)) {
					await dyno.createTable({
						TableName: TABLE_NAME,
						KeySchema: [{ KeyType: 'HASH', AttributeName: 'id' }],
						AttributeDefinitions: [{
							AttributeName: 'id',
							AttributeType: 'S',
						}],
						ProvisionedThroughput: {
							ReadCapacityUnits: 10,
							WriteCapacityUnits: 10,
						},
					});
				}
			});

			await t.step('1. Assert Needed Table', async () => {
				const result = await dyno.listTables();
				assertEquals(result.TableNames.includes(TABLE_NAME), true);
			});

			await t.step({
				name: '2. Sets specified dynamodb host',
				async fn(): Promise<void> {
					const _conf: ClientConfig = {
						credentials: {
							accessKeyId: 'DynamoDBLocal',
							secretAccessKey: 'DoesNotDoAnyAuth',
							sessionToken: 'preferTemporaryCredentials',
						},
						region: 'local',
						port: 8000, // DynamoDB Local's default port
						host: 'host.docker.internal', // Specific DynamoDB host
					};

					const result: Doc = await deriveConfig(_conf);
					assertEquals(_conf.host, result.host);
				},
			});

			await t.step({
				name: '3. Schema translation enabled by default',
				async fn(): Promise<void> {
					const id = 'abc';

					const friends: string[] = ['djb', 'devil', 'donkey kong'];

					let result: Doc = await dyno.putItem({
						TableName: TABLE_NAME,
						Item: { id, friends },
					});

					result = await dyno.getItem({
						TableName: TABLE_NAME,
						Key: { id },
					});

					assertEquals(result.Item.friends, friends);
				},
			});

			await t.step({
				name: '4. Opt-in raw queries',
				async fn(): Promise<void> {
					const id = 'def';

					let result: Doc = await dyno.putItem(
						{
							TableName: TABLE_NAME,
							Item: { id: { S: id }, role: { S: 'admin' } },
						},
						{ translateJSON: false },
					);

					assertEquals(result, {});

					result = await dyno.getItem(
						{
							TableName: TABLE_NAME,
							Key: { id: { S: id } },
						},
						{ translateJSON: false },
					);

					assertEquals(result.Item.role.S, 'admin');
				},
			});

			await t.step({
				name: '5. Batch write items',
				async fn(): Promise<void> {
					const N = 25;

					const params: Doc = {
						RequestItems: { [TABLE_NAME]: new Array(N) },
					};

					for (let i = 0; i < N; ++i) {
						params.RequestItems[TABLE_NAME][i] = {
							PutRequest: {
								Item: {
									id: String(i),
								},
							},
						};
					}

					const result: Doc = await dyno.batchWriteItem(params);

					assertEquals(
						Object.keys(result.UnprocessedItems).length,
						0,
					);
				},
			});

			await t.step({
				name: '6. Storing a binary value',
				async fn(): Promise<void> {
					const id = 'ghi';

					const buf: Uint8Array = new TextEncoder().encode(
						'deadbeefdeadbeef',
					);

					let result: Doc = await dyno.putItem({
						TableName: TABLE_NAME,
						Item: { id, buf },
					});

					assertEquals(result, {});

					result = await dyno.getItem({
						TableName: TABLE_NAME,
						Key: { id },
					});

					assertEquals(result.Item.buf, buf);
				},
			});

			await t.step({
				name: '7. Deleting an item',
				async fn(): Promise<void> {
					const id = 'jkl';

					let result: Doc = await dyno.putItem({
						TableName: TABLE_NAME,
						Item: { id, fraud: 'money' },
					});

					assertEquals(result, {});

					result = await dyno.deleteItem({
						TableName: TABLE_NAME,
						Key: { id },
					});

					assertEquals(result, {});
				},
			});

			await t.step({
				name: '8. Missing table throws a readable error',
				async fn(): Promise<void> {
					await assertThrowsAsync(
						async (): Promise<void> => {
							await dyno.scan({ TableName: 'notatable' });
						},
						Error,
						'Cannot do operations on a non-existent table',
					);
				},
			});

			await t.step({
				name:
					'9. Ops that receive paged results return an async iterator by default',
				async fn(): Promise<void> {
					const n = 25;
					const N = 20 * n;

					function batch(_: null, i: number): Promise<Doc> {
						const trash: Uint8Array = new Uint8Array(4096);

						const params: Doc = {
							RequestItems: { [TABLE_NAME]: new Array(n) },
						};

						for (let j = 0; j < n; ++j) {
							params.RequestItems[TABLE_NAME][j] = {
								PutRequest: {
									Item: {
										id: `batch${i} item${j}`,
										trash,
									},
								},
							};
						}

						return dyno.batchWriteItem(params);
					}

					// 20 * 25 items each gt 4096 bytes
					const batches: Promise<Doc>[] = new Array(20).fill(null)
						.map(batch);

					const results: Doc[] = await Promise.all(batches);

					const unprocessed: number = results.reduce(
						(acc: number, result: Doc): number =>
							acc + Object.keys(result.UnprocessedItems).length,
						0,
					);

					assertEquals(unprocessed, 0);

					const ait = await dyno.scan({
						TableName: TABLE_NAME,
					}) as AsyncIterableIterator<Doc>;

					let pages = 0;
					let items = 0;

					for await (const page of ait) {
						assert(Array.isArray(page.Items));
						assert(page.Items.length > 0);

						++pages;
						items += page.Count;
					}

					assert(pages >= 2);
					assert(items > N);
				},
			});

			await t.step({
				name: '10. Handling pagination manually',
				async fn(): Promise<void> {
					// only fetching 1 page - not async iterating
					const result: Doc = await dyno.scan(
						{ TableName: TABLE_NAME },
						{ iteratePages: false },
					);

					assert(Array.isArray(result.Items));
					assert(result.Items.length > 0);
					assert(!!result.LastEvaluatedKey);
				},
			});

			await t.step({
				name: '11. Conditional put item op',
				async fn(): Promise<void> {
					const id = 'remington';
					const caliber = 223;

					await dyno.putItem({
						TableName: TABLE_NAME,
						Item: { id, caliber },
					});

					let failed = false;

					try {
						// NOTE: fails bc the id already exists & we use a cond expr
						await dyno.putItem({
							TableName: TABLE_NAME,
							Item: { id, caliber: caliber - 1 },
							ConditionExpression: 'attribute_not_exists(id)',
						});
					} catch (err) {
						failed = true;
						assertEquals(
							err.message,
							'The conditional request failed',
						);
					} finally {
						assert(failed);
					}

					const result = await dyno.getItem({
						TableName: TABLE_NAME,
						Key: { id },
					});

					assertEquals(result.Item.caliber, caliber); // still caliber 223
				},
			});
		},
	});

	await setup.step({
		// ignore: true,
		name: 'TearDown-A. Kill local DB server/proess',
		fn: async () => {
			// heavy handed ??
			// dont just  kill all java?
			console.log('pkill java');
			await exec('pkill -9 java');
		},
	});
});
