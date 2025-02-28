import { Api } from './api.ts';

const _Api: any = Api;

export const API: any = new _Api(JSON.parse(`
{
  "version": "2.0",
  "metadata": {
    "apiVersion": "2012-08-10",
    "endpointPrefix": "dynamodb",
    "jsonVersion": "1.0",
    "protocol": "json",
    "serviceAbbreviation": "DynamoDB",
    "serviceFullName": "Amazon DynamoDB",
    "serviceId": "DynamoDB",
    "signatureVersion": "v4",
    "targetPrefix": "DynamoDB_20120810",
    "uid": "dynamodb-2012-08-10"
  },
  "operations": {
    "BatchGetItem": {
      "input": {
        "type": "structure",
        "required": [
          "RequestItems"
        ],
        "members": {
          "RequestItems": {
            "shape": "S2"
          },
          "ReturnConsumedCapacity": {}
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "Responses": {
            "type": "map",
            "key": {},
            "value": {
              "shape": "Sr"
            }
          },
          "UnprocessedKeys": {
            "shape": "S2"
          },
          "ConsumedCapacity": {
            "shape": "St"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "BatchWriteItem": {
      "input": {
        "type": "structure",
        "required": [
          "RequestItems"
        ],
        "members": {
          "RequestItems": {
            "shape": "S10"
          },
          "ReturnConsumedCapacity": {},
          "ReturnItemCollectionMetrics": {}
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "UnprocessedItems": {
            "shape": "S10"
          },
          "ItemCollectionMetrics": {
            "shape": "S18"
          },
          "ConsumedCapacity": {
            "shape": "St"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "CreateBackup": {
      "input": {
        "type": "structure",
        "required": [
          "TableName",
          "BackupName"
        ],
        "members": {
          "TableName": {},
          "BackupName": {}
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "BackupDetails": {
            "shape": "S1h"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "CreateGlobalTable": {
      "input": {
        "type": "structure",
        "required": [
          "GlobalTableName",
          "ReplicationGroup"
        ],
        "members": {
          "GlobalTableName": {},
          "ReplicationGroup": {
            "shape": "S1p"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "GlobalTableDescription": {
            "shape": "S1t"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "CreateTable": {
      "input": {
        "type": "structure",
        "required": [
          "AttributeDefinitions",
          "TableName",
          "KeySchema"
        ],
        "members": {
          "AttributeDefinitions": {
            "shape": "S1z"
          },
          "TableName": {},
          "KeySchema": {
            "shape": "S23"
          },
          "LocalSecondaryIndexes": {
            "type": "list",
            "member": {
              "type": "structure",
              "required": [
                "IndexName",
                "KeySchema",
                "Projection"
              ],
              "members": {
                "IndexName": {},
                "KeySchema": {
                  "shape": "S23"
                },
                "Projection": {
                  "shape": "S28"
                }
              }
            }
          },
          "GlobalSecondaryIndexes": {
            "type": "list",
            "member": {
              "type": "structure",
              "required": [
                "IndexName",
                "KeySchema",
                "Projection"
              ],
              "members": {
                "IndexName": {},
                "KeySchema": {
                  "shape": "S23"
                },
                "Projection": {
                  "shape": "S28"
                },
                "ProvisionedThroughput": {
                  "shape": "S2e"
                }
              }
            }
          },
          "BillingMode": {},
          "ProvisionedThroughput": {
            "shape": "S2e"
          },
          "StreamSpecification": {
            "shape": "S2h"
          },
          "SSESpecification": {
            "shape": "S2k"
          },
          "Tags": {
            "shape": "S2o"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "TableDescription": {
            "shape": "S2t"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "DeleteBackup": {
      "input": {
        "type": "structure",
        "required": [
          "BackupArn"
        ],
        "members": {
          "BackupArn": {}
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "BackupDescription": {
            "shape": "S3g"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "DeleteItem": {
      "input": {
        "type": "structure",
        "required": [
          "TableName",
          "Key"
        ],
        "members": {
          "TableName": {},
          "Key": {
            "shape": "S6"
          },
          "Expected": {
            "shape": "S3t"
          },
          "ConditionalOperator": {},
          "ReturnValues": {},
          "ReturnConsumedCapacity": {},
          "ReturnItemCollectionMetrics": {},
          "ConditionExpression": {},
          "ExpressionAttributeNames": {
            "shape": "Sm"
          },
          "ExpressionAttributeValues": {
            "shape": "S41"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "Attributes": {
            "shape": "Ss"
          },
          "ConsumedCapacity": {
            "shape": "Su"
          },
          "ItemCollectionMetrics": {
            "shape": "S1a"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "DeleteTable": {
      "input": {
        "type": "structure",
        "required": [
          "TableName"
        ],
        "members": {
          "TableName": {}
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "TableDescription": {
            "shape": "S2t"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "DescribeBackup": {
      "input": {
        "type": "structure",
        "required": [
          "BackupArn"
        ],
        "members": {
          "BackupArn": {}
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "BackupDescription": {
            "shape": "S3g"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "DescribeContinuousBackups": {
      "input": {
        "type": "structure",
        "required": [
          "TableName"
        ],
        "members": {
          "TableName": {}
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "ContinuousBackupsDescription": {
            "shape": "S4a"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "DescribeEndpoints": {
      "input": {
        "type": "structure",
        "members": {}
      },
      "output": {
        "type": "structure",
        "required": [
          "Endpoints"
        ],
        "members": {
          "Endpoints": {
            "type": "list",
            "member": {
              "type": "structure",
              "required": [
                "Address",
                "CachePeriodInMinutes"
              ],
              "members": {
                "Address": {},
                "CachePeriodInMinutes": {
                  "type": "long"
                }
              }
            }
          }
        }
      },
      "endpointoperation": true
    },
    "DescribeGlobalTable": {
      "input": {
        "type": "structure",
        "required": [
          "GlobalTableName"
        ],
        "members": {
          "GlobalTableName": {}
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "GlobalTableDescription": {
            "shape": "S1t"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "DescribeGlobalTableSettings": {
      "input": {
        "type": "structure",
        "required": [
          "GlobalTableName"
        ],
        "members": {
          "GlobalTableName": {}
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "GlobalTableName": {},
          "ReplicaSettings": {
            "shape": "S4m"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "DescribeLimits": {
      "input": {
        "type": "structure",
        "members": {}
      },
      "output": {
        "type": "structure",
        "members": {
          "AccountMaxReadCapacityUnits": {
            "type": "long"
          },
          "AccountMaxWriteCapacityUnits": {
            "type": "long"
          },
          "TableMaxReadCapacityUnits": {
            "type": "long"
          },
          "TableMaxWriteCapacityUnits": {
            "type": "long"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "DescribeTable": {
      "input": {
        "type": "structure",
        "required": [
          "TableName"
        ],
        "members": {
          "TableName": {}
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "Table": {
            "shape": "S2t"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "DescribeTimeToLive": {
      "input": {
        "type": "structure",
        "required": [
          "TableName"
        ],
        "members": {
          "TableName": {}
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "TimeToLiveDescription": {
            "shape": "S3p"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "GetItem": {
      "input": {
        "type": "structure",
        "required": [
          "TableName",
          "Key"
        ],
        "members": {
          "TableName": {},
          "Key": {
            "shape": "S6"
          },
          "AttributesToGet": {
            "shape": "Sj"
          },
          "ConsistentRead": {
            "type": "boolean"
          },
          "ReturnConsumedCapacity": {},
          "ProjectionExpression": {},
          "ExpressionAttributeNames": {
            "shape": "Sm"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "Item": {
            "shape": "Ss"
          },
          "ConsumedCapacity": {
            "shape": "Su"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "ListBackups": {
      "input": {
        "type": "structure",
        "members": {
          "TableName": {},
          "Limit": {
            "type": "integer"
          },
          "TimeRangeLowerBound": {
            "type": "timestamp"
          },
          "TimeRangeUpperBound": {
            "type": "timestamp"
          },
          "ExclusiveStartBackupArn": {},
          "BackupType": {}
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "BackupSummaries": {
            "type": "list",
            "member": {
              "type": "structure",
              "members": {
                "TableName": {},
                "TableId": {},
                "TableArn": {},
                "BackupArn": {},
                "BackupName": {},
                "BackupCreationDateTime": {
                  "type": "timestamp"
                },
                "BackupExpiryDateTime": {
                  "type": "timestamp"
                },
                "BackupStatus": {},
                "BackupType": {},
                "BackupSizeBytes": {
                  "type": "long"
                }
              }
            }
          },
          "LastEvaluatedBackupArn": {}
        }
      },
      "endpointdiscovery": {}
    },
    "ListGlobalTables": {
      "input": {
        "type": "structure",
        "members": {
          "ExclusiveStartGlobalTableName": {},
          "Limit": {
            "type": "integer"
          },
          "RegionName": {}
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "GlobalTables": {
            "type": "list",
            "member": {
              "type": "structure",
              "members": {
                "GlobalTableName": {},
                "ReplicationGroup": {
                  "shape": "S1p"
                }
              }
            }
          },
          "LastEvaluatedGlobalTableName": {}
        }
      },
      "endpointdiscovery": {}
    },
    "ListTables": {
      "input": {
        "type": "structure",
        "members": {
          "ExclusiveStartTableName": {},
          "Limit": {
            "type": "integer"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "TableNames": {
            "type": "list",
            "member": {}
          },
          "LastEvaluatedTableName": {}
        }
      },
      "endpointdiscovery": {}
    },
    "ListTagsOfResource": {
      "input": {
        "type": "structure",
        "required": [
          "ResourceArn"
        ],
        "members": {
          "ResourceArn": {},
          "NextToken": {}
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "Tags": {
            "shape": "S2o"
          },
          "NextToken": {}
        }
      },
      "endpointdiscovery": {}
    },
    "PutItem": {
      "input": {
        "type": "structure",
        "required": [
          "TableName",
          "Item"
        ],
        "members": {
          "TableName": {},
          "Item": {
            "shape": "S14"
          },
          "Expected": {
            "shape": "S3t"
          },
          "ReturnValues": {},
          "ReturnConsumedCapacity": {},
          "ReturnItemCollectionMetrics": {},
          "ConditionalOperator": {},
          "ConditionExpression": {},
          "ExpressionAttributeNames": {
            "shape": "Sm"
          },
          "ExpressionAttributeValues": {
            "shape": "S41"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "Attributes": {
            "shape": "Ss"
          },
          "ConsumedCapacity": {
            "shape": "Su"
          },
          "ItemCollectionMetrics": {
            "shape": "S1a"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "Query": {
      "input": {
        "type": "structure",
        "required": [
          "TableName"
        ],
        "members": {
          "TableName": {},
          "IndexName": {},
          "Select": {},
          "AttributesToGet": {
            "shape": "Sj"
          },
          "Limit": {
            "type": "integer"
          },
          "ConsistentRead": {
            "type": "boolean"
          },
          "KeyConditions": {
            "type": "map",
            "key": {},
            "value": {
              "shape": "S5w"
            }
          },
          "QueryFilter": {
            "shape": "S5x"
          },
          "ConditionalOperator": {},
          "ScanIndexForward": {
            "type": "boolean"
          },
          "ExclusiveStartKey": {
            "shape": "S6"
          },
          "ReturnConsumedCapacity": {},
          "ProjectionExpression": {},
          "FilterExpression": {},
          "KeyConditionExpression": {},
          "ExpressionAttributeNames": {
            "shape": "Sm"
          },
          "ExpressionAttributeValues": {
            "shape": "S41"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "Items": {
            "shape": "Sr"
          },
          "Count": {
            "type": "integer"
          },
          "ScannedCount": {
            "type": "integer"
          },
          "LastEvaluatedKey": {
            "shape": "S6"
          },
          "ConsumedCapacity": {
            "shape": "Su"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "RestoreTableFromBackup": {
      "input": {
        "type": "structure",
        "required": [
          "TargetTableName",
          "BackupArn"
        ],
        "members": {
          "TargetTableName": {},
          "BackupArn": {}
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "TableDescription": {
            "shape": "S2t"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "RestoreTableToPointInTime": {
      "input": {
        "type": "structure",
        "required": [
          "SourceTableName",
          "TargetTableName"
        ],
        "members": {
          "SourceTableName": {},
          "TargetTableName": {},
          "UseLatestRestorableTime": {
            "type": "boolean"
          },
          "RestoreDateTime": {
            "type": "timestamp"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "TableDescription": {
            "shape": "S2t"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "Scan": {
      "input": {
        "type": "structure",
        "required": [
          "TableName"
        ],
        "members": {
          "TableName": {},
          "IndexName": {},
          "AttributesToGet": {
            "shape": "Sj"
          },
          "Limit": {
            "type": "integer"
          },
          "Select": {},
          "ScanFilter": {
            "shape": "S5x"
          },
          "ConditionalOperator": {},
          "ExclusiveStartKey": {
            "shape": "S6"
          },
          "ReturnConsumedCapacity": {},
          "TotalSegments": {
            "type": "integer"
          },
          "Segment": {
            "type": "integer"
          },
          "ProjectionExpression": {},
          "FilterExpression": {},
          "ExpressionAttributeNames": {
            "shape": "Sm"
          },
          "ExpressionAttributeValues": {
            "shape": "S41"
          },
          "ConsistentRead": {
            "type": "boolean"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "Items": {
            "shape": "Sr"
          },
          "Count": {
            "type": "integer"
          },
          "ScannedCount": {
            "type": "integer"
          },
          "LastEvaluatedKey": {
            "shape": "S6"
          },
          "ConsumedCapacity": {
            "shape": "Su"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "TagResource": {
      "input": {
        "type": "structure",
        "required": [
          "ResourceArn",
          "Tags"
        ],
        "members": {
          "ResourceArn": {},
          "Tags": {
            "shape": "S2o"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "TransactGetItems": {
      "input": {
        "type": "structure",
        "required": [
          "TransactItems"
        ],
        "members": {
          "TransactItems": {
            "type": "list",
            "member": {
              "type": "structure",
              "required": [
                "Get"
              ],
              "members": {
                "Get": {
                  "type": "structure",
                  "required": [
                    "Key",
                    "TableName"
                  ],
                  "members": {
                    "Key": {
                      "shape": "S6"
                    },
                    "TableName": {},
                    "ProjectionExpression": {},
                    "ExpressionAttributeNames": {
                      "shape": "Sm"
                    }
                  }
                }
              }
            }
          },
          "ReturnConsumedCapacity": {}
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "ConsumedCapacity": {
            "shape": "St"
          },
          "Responses": {
            "type": "list",
            "member": {
              "type": "structure",
              "members": {
                "Item": {
                  "shape": "Ss"
                }
              }
            }
          }
        }
      },
      "endpointdiscovery": {}
    },
    "TransactWriteItems": {
      "input": {
        "type": "structure",
        "required": [
          "TransactItems"
        ],
        "members": {
          "TransactItems": {
            "type": "list",
            "member": {
              "type": "structure",
              "members": {
                "ConditionCheck": {
                  "type": "structure",
                  "required": [
                    "Key",
                    "TableName",
                    "ConditionExpression"
                  ],
                  "members": {
                    "Key": {
                      "shape": "S6"
                    },
                    "TableName": {},
                    "ConditionExpression": {},
                    "ExpressionAttributeNames": {
                      "shape": "Sm"
                    },
                    "ExpressionAttributeValues": {
                      "shape": "S41"
                    },
                    "ReturnValuesOnConditionCheckFailure": {}
                  }
                },
                "Put": {
                  "type": "structure",
                  "required": [
                    "Item",
                    "TableName"
                  ],
                  "members": {
                    "Item": {
                      "shape": "S14"
                    },
                    "TableName": {},
                    "ConditionExpression": {},
                    "ExpressionAttributeNames": {
                      "shape": "Sm"
                    },
                    "ExpressionAttributeValues": {
                      "shape": "S41"
                    },
                    "ReturnValuesOnConditionCheckFailure": {}
                  }
                },
                "Delete": {
                  "type": "structure",
                  "required": [
                    "Key",
                    "TableName"
                  ],
                  "members": {
                    "Key": {
                      "shape": "S6"
                    },
                    "TableName": {},
                    "ConditionExpression": {},
                    "ExpressionAttributeNames": {
                      "shape": "Sm"
                    },
                    "ExpressionAttributeValues": {
                      "shape": "S41"
                    },
                    "ReturnValuesOnConditionCheckFailure": {}
                  }
                },
                "Update": {
                  "type": "structure",
                  "required": [
                    "Key",
                    "UpdateExpression",
                    "TableName"
                  ],
                  "members": {
                    "Key": {
                      "shape": "S6"
                    },
                    "UpdateExpression": {},
                    "TableName": {},
                    "ConditionExpression": {},
                    "ExpressionAttributeNames": {
                      "shape": "Sm"
                    },
                    "ExpressionAttributeValues": {
                      "shape": "S41"
                    },
                    "ReturnValuesOnConditionCheckFailure": {}
                  }
                }
              }
            }
          },
          "ReturnConsumedCapacity": {},
          "ReturnItemCollectionMetrics": {},
          "ClientRequestToken": {
            "idempotencyToken": true
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "ConsumedCapacity": {
            "shape": "St"
          },
          "ItemCollectionMetrics": {
            "shape": "S18"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "UntagResource": {
      "input": {
        "type": "structure",
        "required": [
          "ResourceArn",
          "TagKeys"
        ],
        "members": {
          "ResourceArn": {},
          "TagKeys": {
            "type": "list",
            "member": {}
          }
        }
      },
      "endpointdiscovery": {}
    },
    "UpdateContinuousBackups": {
      "input": {
        "type": "structure",
        "required": [
          "TableName",
          "PointInTimeRecoverySpecification"
        ],
        "members": {
          "TableName": {},
          "PointInTimeRecoverySpecification": {
            "type": "structure",
            "required": [
              "PointInTimeRecoveryEnabled"
            ],
            "members": {
              "PointInTimeRecoveryEnabled": {
                "type": "boolean"
              }
            }
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "ContinuousBackupsDescription": {
            "shape": "S4a"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "UpdateGlobalTable": {
      "input": {
        "type": "structure",
        "required": [
          "GlobalTableName",
          "ReplicaUpdates"
        ],
        "members": {
          "GlobalTableName": {},
          "ReplicaUpdates": {
            "type": "list",
            "member": {
              "type": "structure",
              "members": {
                "Create": {
                  "type": "structure",
                  "required": [
                    "RegionName"
                  ],
                  "members": {
                    "RegionName": {}
                  }
                },
                "Delete": {
                  "type": "structure",
                  "required": [
                    "RegionName"
                  ],
                  "members": {
                    "RegionName": {}
                  }
                }
              }
            }
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "GlobalTableDescription": {
            "shape": "S1t"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "UpdateGlobalTableSettings": {
      "input": {
        "type": "structure",
        "required": [
          "GlobalTableName"
        ],
        "members": {
          "GlobalTableName": {},
          "GlobalTableBillingMode": {},
          "GlobalTableProvisionedWriteCapacityUnits": {
            "type": "long"
          },
          "GlobalTableProvisionedWriteCapacityAutoScalingSettingsUpdate": {
            "shape": "S74"
          },
          "GlobalTableGlobalSecondaryIndexSettingsUpdate": {
            "type": "list",
            "member": {
              "type": "structure",
              "required": [
                "IndexName"
              ],
              "members": {
                "IndexName": {},
                "ProvisionedWriteCapacityUnits": {
                  "type": "long"
                },
                "ProvisionedWriteCapacityAutoScalingSettingsUpdate": {
                  "shape": "S74"
                }
              }
            }
          },
          "ReplicaSettingsUpdate": {
            "type": "list",
            "member": {
              "type": "structure",
              "required": [
                "RegionName"
              ],
              "members": {
                "RegionName": {},
                "ReplicaProvisionedReadCapacityUnits": {
                  "type": "long"
                },
                "ReplicaProvisionedReadCapacityAutoScalingSettingsUpdate": {
                  "shape": "S74"
                },
                "ReplicaGlobalSecondaryIndexSettingsUpdate": {
                  "type": "list",
                  "member": {
                    "type": "structure",
                    "required": [
                      "IndexName"
                    ],
                    "members": {
                      "IndexName": {},
                      "ProvisionedReadCapacityUnits": {
                        "type": "long"
                      },
                      "ProvisionedReadCapacityAutoScalingSettingsUpdate": {
                        "shape": "S74"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "GlobalTableName": {},
          "ReplicaSettings": {
            "shape": "S4m"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "UpdateItem": {
      "input": {
        "type": "structure",
        "required": [
          "TableName",
          "Key"
        ],
        "members": {
          "TableName": {},
          "Key": {
            "shape": "S6"
          },
          "AttributeUpdates": {
            "type": "map",
            "key": {},
            "value": {
              "type": "structure",
              "members": {
                "Value": {
                  "shape": "S8"
                },
                "Action": {}
              }
            }
          },
          "Expected": {
            "shape": "S3t"
          },
          "ConditionalOperator": {},
          "ReturnValues": {},
          "ReturnConsumedCapacity": {},
          "ReturnItemCollectionMetrics": {},
          "UpdateExpression": {},
          "ConditionExpression": {},
          "ExpressionAttributeNames": {
            "shape": "Sm"
          },
          "ExpressionAttributeValues": {
            "shape": "S41"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "Attributes": {
            "shape": "Ss"
          },
          "ConsumedCapacity": {
            "shape": "Su"
          },
          "ItemCollectionMetrics": {
            "shape": "S1a"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "UpdateTable": {
      "input": {
        "type": "structure",
        "required": [
          "TableName"
        ],
        "members": {
          "AttributeDefinitions": {
            "shape": "S1z"
          },
          "TableName": {},
          "BillingMode": {},
          "ProvisionedThroughput": {
            "shape": "S2e"
          },
          "GlobalSecondaryIndexUpdates": {
            "type": "list",
            "member": {
              "type": "structure",
              "members": {
                "Update": {
                  "type": "structure",
                  "required": [
                    "IndexName",
                    "ProvisionedThroughput"
                  ],
                  "members": {
                    "IndexName": {},
                    "ProvisionedThroughput": {
                      "shape": "S2e"
                    }
                  }
                },
                "Create": {
                  "type": "structure",
                  "required": [
                    "IndexName",
                    "KeySchema",
                    "Projection"
                  ],
                  "members": {
                    "IndexName": {},
                    "KeySchema": {
                      "shape": "S23"
                    },
                    "Projection": {
                      "shape": "S28"
                    },
                    "ProvisionedThroughput": {
                      "shape": "S2e"
                    }
                  }
                },
                "Delete": {
                  "type": "structure",
                  "required": [
                    "IndexName"
                  ],
                  "members": {
                    "IndexName": {}
                  }
                }
              }
            }
          },
          "StreamSpecification": {
            "shape": "S2h"
          },
          "SSESpecification": {
            "shape": "S2k"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "TableDescription": {
            "shape": "S2t"
          }
        }
      },
      "endpointdiscovery": {}
    },
    "UpdateTimeToLive": {
      "input": {
        "type": "structure",
        "required": [
          "TableName",
          "TimeToLiveSpecification"
        ],
        "members": {
          "TableName": {},
          "TimeToLiveSpecification": {
            "shape": "S7s"
          }
        }
      },
      "output": {
        "type": "structure",
        "members": {
          "TimeToLiveSpecification": {
            "shape": "S7s"
          }
        }
      },
      "endpointdiscovery": {}
    }
  },
  "shapes": {
    "S2": {
      "type": "map",
      "key": {},
      "value": {
        "type": "structure",
        "required": [
          "Keys"
        ],
        "members": {
          "Keys": {
            "type": "list",
            "member": {
              "shape": "S6"
            }
          },
          "AttributesToGet": {
            "shape": "Sj"
          },
          "ConsistentRead": {
            "type": "boolean"
          },
          "ProjectionExpression": {},
          "ExpressionAttributeNames": {
            "shape": "Sm"
          }
        }
      }
    },
    "S6": {
      "type": "map",
      "key": {},
      "value": {
        "shape": "S8"
      }
    },
    "S8": {
      "type": "structure",
      "members": {
        "S": {},
        "N": {},
        "B": {
          "type": "blob"
        },
        "SS": {
          "type": "list",
          "member": {}
        },
        "NS": {
          "type": "list",
          "member": {}
        },
        "BS": {
          "type": "list",
          "member": {
            "type": "blob"
          }
        },
        "M": {
          "type": "map",
          "key": {},
          "value": {
            "shape": "S8"
          }
        },
        "L": {
          "type": "list",
          "member": {
            "shape": "S8"
          }
        },
        "NULL": {
          "type": "boolean"
        },
        "BOOL": {
          "type": "boolean"
        }
      }
    },
    "Sj": {
      "type": "list",
      "member": {}
    },
    "Sm": {
      "type": "map",
      "key": {},
      "value": {}
    },
    "Sr": {
      "type": "list",
      "member": {
        "shape": "Ss"
      }
    },
    "Ss": {
      "type": "map",
      "key": {},
      "value": {
        "shape": "S8"
      }
    },
    "St": {
      "type": "list",
      "member": {
        "shape": "Su"
      }
    },
    "Su": {
      "type": "structure",
      "members": {
        "TableName": {},
        "CapacityUnits": {
          "type": "double"
        },
        "ReadCapacityUnits": {
          "type": "double"
        },
        "WriteCapacityUnits": {
          "type": "double"
        },
        "Table": {
          "shape": "Sw"
        },
        "LocalSecondaryIndexes": {
          "shape": "Sx"
        },
        "GlobalSecondaryIndexes": {
          "shape": "Sx"
        }
      }
    },
    "Sw": {
      "type": "structure",
      "members": {
        "ReadCapacityUnits": {
          "type": "double"
        },
        "WriteCapacityUnits": {
          "type": "double"
        },
        "CapacityUnits": {
          "type": "double"
        }
      }
    },
    "Sx": {
      "type": "map",
      "key": {},
      "value": {
        "shape": "Sw"
      }
    },
    "S10": {
      "type": "map",
      "key": {},
      "value": {
        "type": "list",
        "member": {
          "type": "structure",
          "members": {
            "PutRequest": {
              "type": "structure",
              "required": [
                "Item"
              ],
              "members": {
                "Item": {
                  "shape": "S14"
                }
              }
            },
            "DeleteRequest": {
              "type": "structure",
              "required": [
                "Key"
              ],
              "members": {
                "Key": {
                  "shape": "S6"
                }
              }
            }
          }
        }
      }
    },
    "S14": {
      "type": "map",
      "key": {},
      "value": {
        "shape": "S8"
      }
    },
    "S18": {
      "type": "map",
      "key": {},
      "value": {
        "type": "list",
        "member": {
          "shape": "S1a"
        }
      }
    },
    "S1a": {
      "type": "structure",
      "members": {
        "ItemCollectionKey": {
          "type": "map",
          "key": {},
          "value": {
            "shape": "S8"
          }
        },
        "SizeEstimateRangeGB": {
          "type": "list",
          "member": {
            "type": "double"
          }
        }
      }
    },
    "S1h": {
      "type": "structure",
      "required": [
        "BackupArn",
        "BackupName",
        "BackupStatus",
        "BackupType",
        "BackupCreationDateTime"
      ],
      "members": {
        "BackupArn": {},
        "BackupName": {},
        "BackupSizeBytes": {
          "type": "long"
        },
        "BackupStatus": {},
        "BackupType": {},
        "BackupCreationDateTime": {
          "type": "timestamp"
        },
        "BackupExpiryDateTime": {
          "type": "timestamp"
        }
      }
    },
    "S1p": {
      "type": "list",
      "member": {
        "type": "structure",
        "members": {
          "RegionName": {}
        }
      }
    },
    "S1t": {
      "type": "structure",
      "members": {
        "ReplicationGroup": {
          "type": "list",
          "member": {
            "type": "structure",
            "members": {
              "RegionName": {}
            }
          }
        },
        "GlobalTableArn": {},
        "CreationDateTime": {
          "type": "timestamp"
        },
        "GlobalTableStatus": {},
        "GlobalTableName": {}
      }
    },
    "S1z": {
      "type": "list",
      "member": {
        "type": "structure",
        "required": [
          "AttributeName",
          "AttributeType"
        ],
        "members": {
          "AttributeName": {},
          "AttributeType": {}
        }
      }
    },
    "S23": {
      "type": "list",
      "member": {
        "type": "structure",
        "required": [
          "AttributeName",
          "KeyType"
        ],
        "members": {
          "AttributeName": {},
          "KeyType": {}
        }
      }
    },
    "S28": {
      "type": "structure",
      "members": {
        "ProjectionType": {},
        "NonKeyAttributes": {
          "type": "list",
          "member": {}
        }
      }
    },
    "S2e": {
      "type": "structure",
      "required": [
        "ReadCapacityUnits",
        "WriteCapacityUnits"
      ],
      "members": {
        "ReadCapacityUnits": {
          "type": "long"
        },
        "WriteCapacityUnits": {
          "type": "long"
        }
      }
    },
    "S2h": {
      "type": "structure",
      "members": {
        "StreamEnabled": {
          "type": "boolean"
        },
        "StreamViewType": {}
      }
    },
    "S2k": {
      "type": "structure",
      "members": {
        "Enabled": {
          "type": "boolean"
        },
        "SSEType": {},
        "KMSMasterKeyId": {}
      }
    },
    "S2o": {
      "type": "list",
      "member": {
        "type": "structure",
        "required": [
          "Key",
          "Value"
        ],
        "members": {
          "Key": {},
          "Value": {}
        }
      }
    },
    "S2t": {
      "type": "structure",
      "members": {
        "AttributeDefinitions": {
          "shape": "S1z"
        },
        "TableName": {},
        "KeySchema": {
          "shape": "S23"
        },
        "TableStatus": {},
        "CreationDateTime": {
          "type": "timestamp"
        },
        "ProvisionedThroughput": {
          "shape": "S2v"
        },
        "TableSizeBytes": {
          "type": "long"
        },
        "ItemCount": {
          "type": "long"
        },
        "TableArn": {},
        "TableId": {},
        "BillingModeSummary": {
          "shape": "S30"
        },
        "LocalSecondaryIndexes": {
          "type": "list",
          "member": {
            "type": "structure",
            "members": {
              "IndexName": {},
              "KeySchema": {
                "shape": "S23"
              },
              "Projection": {
                "shape": "S28"
              },
              "IndexSizeBytes": {
                "type": "long"
              },
              "ItemCount": {
                "type": "long"
              },
              "IndexArn": {}
            }
          }
        },
        "GlobalSecondaryIndexes": {
          "type": "list",
          "member": {
            "type": "structure",
            "members": {
              "IndexName": {},
              "KeySchema": {
                "shape": "S23"
              },
              "Projection": {
                "shape": "S28"
              },
              "IndexStatus": {},
              "Backfilling": {
                "type": "boolean"
              },
              "ProvisionedThroughput": {
                "shape": "S2v"
              },
              "IndexSizeBytes": {
                "type": "long"
              },
              "ItemCount": {
                "type": "long"
              },
              "IndexArn": {}
            }
          }
        },
        "StreamSpecification": {
          "shape": "S2h"
        },
        "LatestStreamLabel": {},
        "LatestStreamArn": {},
        "RestoreSummary": {
          "type": "structure",
          "required": [
            "RestoreDateTime",
            "RestoreInProgress"
          ],
          "members": {
            "SourceBackupArn": {},
            "SourceTableArn": {},
            "RestoreDateTime": {
              "type": "timestamp"
            },
            "RestoreInProgress": {
              "type": "boolean"
            }
          }
        },
        "SSEDescription": {
          "shape": "S3b"
        }
      }
    },
    "S2v": {
      "type": "structure",
      "members": {
        "LastIncreaseDateTime": {
          "type": "timestamp"
        },
        "LastDecreaseDateTime": {
          "type": "timestamp"
        },
        "NumberOfDecreasesToday": {
          "type": "long"
        },
        "ReadCapacityUnits": {
          "type": "long"
        },
        "WriteCapacityUnits": {
          "type": "long"
        }
      }
    },
    "S30": {
      "type": "structure",
      "members": {
        "BillingMode": {},
        "LastUpdateToPayPerRequestDateTime": {
          "type": "timestamp"
        }
      }
    },
    "S3b": {
      "type": "structure",
      "members": {
        "Status": {},
        "SSEType": {},
        "KMSMasterKeyArn": {}
      }
    },
    "S3g": {
      "type": "structure",
      "members": {
        "BackupDetails": {
          "shape": "S1h"
        },
        "SourceTableDetails": {
          "type": "structure",
          "required": [
            "TableName",
            "TableId",
            "KeySchema",
            "TableCreationDateTime",
            "ProvisionedThroughput"
          ],
          "members": {
            "TableName": {},
            "TableId": {},
            "TableArn": {},
            "TableSizeBytes": {
              "type": "long"
            },
            "KeySchema": {
              "shape": "S23"
            },
            "TableCreationDateTime": {
              "type": "timestamp"
            },
            "ProvisionedThroughput": {
              "shape": "S2e"
            },
            "ItemCount": {
              "type": "long"
            },
            "BillingMode": {}
          }
        },
        "SourceTableFeatureDetails": {
          "type": "structure",
          "members": {
            "LocalSecondaryIndexes": {
              "type": "list",
              "member": {
                "type": "structure",
                "members": {
                  "IndexName": {},
                  "KeySchema": {
                    "shape": "S23"
                  },
                  "Projection": {
                    "shape": "S28"
                  }
                }
              }
            },
            "GlobalSecondaryIndexes": {
              "type": "list",
              "member": {
                "type": "structure",
                "members": {
                  "IndexName": {},
                  "KeySchema": {
                    "shape": "S23"
                  },
                  "Projection": {
                    "shape": "S28"
                  },
                  "ProvisionedThroughput": {
                    "shape": "S2e"
                  }
                }
              }
            },
            "StreamDescription": {
              "shape": "S2h"
            },
            "TimeToLiveDescription": {
              "shape": "S3p"
            },
            "SSEDescription": {
              "shape": "S3b"
            }
          }
        }
      }
    },
    "S3p": {
      "type": "structure",
      "members": {
        "TimeToLiveStatus": {},
        "AttributeName": {}
      }
    },
    "S3t": {
      "type": "map",
      "key": {},
      "value": {
        "type": "structure",
        "members": {
          "Value": {
            "shape": "S8"
          },
          "Exists": {
            "type": "boolean"
          },
          "ComparisonOperator": {},
          "AttributeValueList": {
            "shape": "S3x"
          }
        }
      }
    },
    "S3x": {
      "type": "list",
      "member": {
        "shape": "S8"
      }
    },
    "S41": {
      "type": "map",
      "key": {},
      "value": {
        "shape": "S8"
      }
    },
    "S4a": {
      "type": "structure",
      "required": [
        "ContinuousBackupsStatus"
      ],
      "members": {
        "ContinuousBackupsStatus": {},
        "PointInTimeRecoveryDescription": {
          "type": "structure",
          "members": {
            "PointInTimeRecoveryStatus": {},
            "EarliestRestorableDateTime": {
              "type": "timestamp"
            },
            "LatestRestorableDateTime": {
              "type": "timestamp"
            }
          }
        }
      }
    },
    "S4m": {
      "type": "list",
      "member": {
        "type": "structure",
        "required": [
          "RegionName"
        ],
        "members": {
          "RegionName": {},
          "ReplicaStatus": {},
          "ReplicaBillingModeSummary": {
            "shape": "S30"
          },
          "ReplicaProvisionedReadCapacityUnits": {
            "type": "long"
          },
          "ReplicaProvisionedReadCapacityAutoScalingSettings": {
            "shape": "S4p"
          },
          "ReplicaProvisionedWriteCapacityUnits": {
            "type": "long"
          },
          "ReplicaProvisionedWriteCapacityAutoScalingSettings": {
            "shape": "S4p"
          },
          "ReplicaGlobalSecondaryIndexSettings": {
            "type": "list",
            "member": {
              "type": "structure",
              "required": [
                "IndexName"
              ],
              "members": {
                "IndexName": {},
                "IndexStatus": {},
                "ProvisionedReadCapacityUnits": {
                  "type": "long"
                },
                "ProvisionedReadCapacityAutoScalingSettings": {
                  "shape": "S4p"
                },
                "ProvisionedWriteCapacityUnits": {
                  "type": "long"
                },
                "ProvisionedWriteCapacityAutoScalingSettings": {
                  "shape": "S4p"
                }
              }
            }
          }
        }
      }
    },
    "S4p": {
      "type": "structure",
      "members": {
        "MinimumUnits": {
          "type": "long"
        },
        "MaximumUnits": {
          "type": "long"
        },
        "AutoScalingDisabled": {
          "type": "boolean"
        },
        "AutoScalingRoleArn": {},
        "ScalingPolicies": {
          "type": "list",
          "member": {
            "type": "structure",
            "members": {
              "PolicyName": {},
              "TargetTrackingScalingPolicyConfiguration": {
                "type": "structure",
                "required": [
                  "TargetValue"
                ],
                "members": {
                  "DisableScaleIn": {
                    "type": "boolean"
                  },
                  "ScaleInCooldown": {
                    "type": "integer"
                  },
                  "ScaleOutCooldown": {
                    "type": "integer"
                  },
                  "TargetValue": {
                    "type": "double"
                  }
                }
              }
            }
          }
        }
      }
    },
    "S5w": {
      "type": "structure",
      "required": [
        "ComparisonOperator"
      ],
      "members": {
        "AttributeValueList": {
          "shape": "S3x"
        },
        "ComparisonOperator": {}
      }
    },
    "S5x": {
      "type": "map",
      "key": {},
      "value": {
        "shape": "S5w"
      }
    },
    "S74": {
      "type": "structure",
      "members": {
        "MinimumUnits": {
          "type": "long"
        },
        "MaximumUnits": {
          "type": "long"
        },
        "AutoScalingDisabled": {
          "type": "boolean"
        },
        "AutoScalingRoleArn": {},
        "ScalingPolicyUpdate": {
          "type": "structure",
          "required": [
            "TargetTrackingScalingPolicyConfiguration"
          ],
          "members": {
            "PolicyName": {},
            "TargetTrackingScalingPolicyConfiguration": {
              "type": "structure",
              "required": [
                "TargetValue"
              ],
              "members": {
                "DisableScaleIn": {
                  "type": "boolean"
                },
                "ScaleInCooldown": {
                  "type": "integer"
                },
                "ScaleOutCooldown": {
                  "type": "integer"
                },
                "TargetValue": {
                  "type": "double"
                }
              }
            }
          }
        }
      }
    },
    "S7s": {
      "type": "structure",
      "required": [
        "Enabled",
        "AttributeName"
      ],
      "members": {
        "Enabled": {
          "type": "boolean"
        },
        "AttributeName": {}
      }
    }
  }
}  
`));
