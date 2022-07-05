.PHONY: tests, local_dl, local_run

# sync this with the vars in the `local_db_avail.sh` file
URL = "https://s3.eu-central-1.amazonaws.com/dynamodb-local-frankfurt/dynamodb_local_latest.tar.gz"
DIR = "./dynamodb_local_latest"

tests:
	deno test --allow-run --allow-net

local_tests: local_db_start wait5 tests local_db_stop
	
local_dl:
	./local_db_avail.sh $(DIR) $(URL)

local_db_start:
	java -D"java.library.path=$(DIR)/DynamoDBLocal_lib" -jar "$(DIR)/DynamoDBLocal.jar" -sharedDb &

local_db_stop:
	pkill java

wait5:
	sleep 5.1