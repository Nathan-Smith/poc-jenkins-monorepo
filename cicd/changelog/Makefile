COMPOSE_BUILD_CHANGELOG = docker-compose build changelog
COMPOSE_BUILD_DEV = docker-compose build dev
COMPOSE_BUILD_TEST = docker-compose build test
COMPOSE_RUN_CHANGELOG = $(COMPOSE_BUILD_CHANGELOG); docker-compose run --rm changelog --verbose
COMPOSE_RUN_DEV = $(COMPOSE_BUILD_DEV); docker-compose run --rm dev $(1)
COMPOSE_RUN_TEST = $(COMPOSE_BUILD_TEST); docker-compose run --rm $(2) test /bin/bash -c "$(SETUP_TESTS) && $(1); $(TEARDOWN_TESTS)"
SETUP_TESTS = rsync -a \$$WORKING_DIR/ /opt/app --exclude node_modules && cd /opt/app
TEARDOWN_TESTS = cp -fr /opt/app/src \$$WORKING_DIR/

export WORKSPACE_PREFIX = /build
export WORKING_DIR = $(WORKSPACE_PREFIX)$(shell echo "$(WORKSPACE)" | sed -e 's|^'$(AGENT_ROOT)'||')
export WORKSPACE_MOUNT ?= ../..
export VERBOSE ?= 0
export JEST_ARGS ?=

# Pipeline Targets

ci: check test changelog

# Public Targets

changelog:
	$(COMPOSE_RUN_CHANGELOG)

check:
	docker run --rm -i hadolint/hadolint:v2.6.0-alpine < Dockerfile
	$(call COMPOSE_RUN_TEST, $(MAKE) _run-lint _run-format _run-tsc)

dev-deps:
	$(COMPOSE_RUN_DEV) npm install

dev-env:
	$(COMPOSE_RUN_DEV) /bin/bash

fix-lint:
	$(call COMPOSE_RUN_TEST, $(MAKE) _fix-lint)

_fix-lint:
	npm run fix-lint

fix-format:
	$(call COMPOSE_RUN_TEST, $(MAKE) _fix-format)

_fix-format:
	npm run fix-format

run-lint:
	$(call COMPOSE_RUN_TEST, $(MAKE) _run-lint)

_run-lint:
	npm run lint

run-format:
	$(call COMPOSE_RUN_TEST, $(MAKE) _run-format)

_run-format:
	npm run format

run-tsc:
	$(call COMPOSE_RUN_TEST, $(MAKE) _run-tsc)

_run-tsc:
	npx tsc

test:
	$(call COMPOSE_RUN_TEST, $(MAKE) _test)

_test:
	npm run test -- $(JEST_ARGS)

test-debugger:
	$(call COMPOSE_RUN_TEST, $(MAKE) _test-debugger, --service-ports)

_test-debugger:
	node --inspect-brk=0.0.0.0 -r ts-node/register node_modules/.bin/jest $(JEST_ARGS) --runInBand

test-env:
	$(call COMPOSE_RUN_TEST, /bin/bash)
