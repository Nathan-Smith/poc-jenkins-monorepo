COMPOSE_RUN_NODE = docker-compose run --rm --service-ports node

export WORKSPACE_PREFIX = /build
export WORKING_DIR = $(WORKSPACE_PREFIX)$(shell echo "$(WORKSPACE)" | sed -e 's|^'$(AGENT_ROOT)'||')
export WORKSPACE_MOUNT ?= ../..

# Pipeline Targets

ci: ci-deps test pipeline pipeline-check

# Public Targets

ci-deps: deps

debug-tests:
	$(COMPOSE_RUN_NODE) node --inspect-brk=0.0.0.0 -r ts-node/register node_modules/.bin/jest --runInBand

deps: _npm-install

test: npm-run-lint npm-run-format _npx-tsc npm-run-test

pipeline:
	$(COMPOSE_RUN_NODE) npx ts-node src/index.ts -o ../../Jenkinsfile

pipeline-check:
	$(COMPOSE_RUN_NODE) sh ./src/pipeline-check.sh

npm-run-%:
	$(COMPOSE_RUN_NODE) npm run $*

test-%:
	$(COMPOSE_RUN_NODE) npm run test -- $*

watch-tests:
	$(COMPOSE_RUN_NODE) npm run test -- --watch --updateSnapshot

# Private Targets

_npm-%:
	$(COMPOSE_RUN_NODE) npm $*

_npx-%:
	$(COMPOSE_RUN_NODE) npx $*
