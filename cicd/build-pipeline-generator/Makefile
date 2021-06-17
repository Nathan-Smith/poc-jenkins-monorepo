COMPOSE_RUN_DEV = docker-compose run --rm dev
COMPOSE_RUN_DEV_DEBUG = docker-compose run --rm --service-ports dev
COMPOSE_RUN_TEST = docker-compose run --rm test
COMPOSE_RUN_BUILD_PIPELINE_GENERATOR = docker-compose run --rm build-pipeline-generator

export WORKSPACE_PREFIX = /build
export WORKING_DIR = $(WORKSPACE_PREFIX)$(shell echo "$(WORKSPACE)" | sed -e 's|^'$(AGENT_ROOT)'||')
export WORKSPACE_MOUNT ?= ../..

# Pipeline Targets

ci: validate-lint validate-format validate-ts test validate-build-pipeline

# Public Targets

debug-tests:
	$(COMPOSE_RUN_DEV_DEBUG) node --inspect-brk=0.0.0.0 -r ts-node/register node_modules/.bin/jest --runInBand

deps: _npm-install

dev-env:
	docker-compose build dev
	$(COMPOSE_RUN_DEV) /bin/bash

test:
	docker-compose build test
	$(COMPOSE_RUN_TEST) npm run test

test-env:
	docker-compose build test
	$(COMPOSE_RUN_TEST) /bin/bash

validate-lint:
	docker-compose build test
	$(COMPOSE_RUN_TEST) npm run lint

validate-format:
	docker-compose build test
	$(COMPOSE_RUN_TEST) npm run format

validate-ts:
	docker-compose build test
	$(COMPOSE_RUN_TEST) npx tsc

pipeline:
	docker-compose build build-pipeline-generator
	$(COMPOSE_RUN_BUILD_PIPELINE_GENERATOR)

validate-build-pipeline:
	docker-compose build build-pipeline-generator
	$(COMPOSE_RUN_BUILD_PIPELINE_GENERATOR) --validate

npm-run-%:
	docker-compose build dev
	$(COMPOSE_RUN_DEV) npm run $*

test-%:
	docker-compose build test
	$(COMPOSE_RUN_TEST) npm run test -- $*

update-test-snapshots:
	docker-compose build dev
	$(COMPOSE_RUN_DEV) npm run test -- --updateSnapshot

watch-tests:
	docker-compose build dev
	$(COMPOSE_RUN_DEV) npm run test -- --watch --updateSnapshot

npm-install-%:
	docker-compose build dev
	$(COMPOSE_RUN_DEV) npm install -DE $*

# Private Targets

_npm-%:
	docker-compose build dev
	$(COMPOSE_RUN_DEV) npm $*

_npx-%:
	docker-compose build dev
	$(COMPOSE_RUN_DEV) npx $*
