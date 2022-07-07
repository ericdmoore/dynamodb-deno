.PHONY: tests, local_dl, local_run, coverage_tests

# sync this with the vars in the `local_db_avail.sh` file
URL = "https://s3.eu-central-1.amazonaws.com/dynamodb-local-frankfurt/dynamodb_local_latest.tar.gz"
DIR = "./dynamodb_local_latest"

wait5:
	sleep 5.1

test:
	deno test --allow-run --allow-net

local_tests: local_db_start wait5 test local_db_stop
	
local_dl:
	./local_db_avail.sh $(DIR) $(URL)

local_db_start:
	java -D"java.library.path=$(DIR)/DynamoDBLocal_lib" -jar "$(DIR)/DynamoDBLocal.jar" -sharedDb &

local_db_stop:
	pkill java

coverage_tests:
	deno test --allow-run --allow-net --coverage=./.coverage

coverage_prev_clear:
	rm -rf .coverage/
	rm -rf cov_profile/

coverage_ci: coverage_tests
	deno coverage .coverage/ --lcov --output=.coverage/_deno.lcov;

coverage: local_db_start coverage_prev_clear wait5 coverage_tests coverage_ci
	genhtml -o cov_profile/html .coverage/_deno.lcov;
	open cov_profile/html/index.html
