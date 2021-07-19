COMPOSE_BUILD_BUILD_PIPELINE_GENERATOR = docker-compose build build-pipeline-generator
COMPOSE_BUILD_DEV = docker-compose build dev
COMPOSE_BUILD_TEST = docker-compose build test
COMPOSE_RUN_BUILD_PIPELINE_GENERATOR = $(COMPOSE_BUILD_BUILD_PIPELINE_GENERATOR); docker-compose run --rm build-pipeline-generator --verbose
COMPOSE_RUN_DEV = $(COMPOSE_BUILD_DEV); docker-compose run --rm dev $(1)
COMPOSE_RUN_TEST = $(COMPOSE_BUILD_TEST); docker-compose run --rm $(2) test /bin/bash -c "$(SETUP_TESTS); $(1); $(TEARDOWN_TESTS)"
SETUP_TESTS = rm -r /opt/app/src; cp -fr \$$WORKING_DIR/src /opt/app/; cd /opt/app
TEARDOWN_TESTS = cp -fr /opt/app/src \$$WORKING_DIR/

export WORKSPACE_PREFIX = /build
export WORKING_DIR = $(WORKSPACE_PREFIX)$(shell echo "$(WORKSPACE)" | sed -e 's|^'$(AGENT_ROOT)'||')
export WORKSPACE_MOUNT ?= ../..
export VERBOSE ?= 0
export JEST_ARGS ?=

# Pipeline Targets

ci: check test build-pipeline-generator

# Public Targets

build-pipeline-generator:
	$(MAKE) _clean-docker _start-jenkins
	$(COMPOSE_RUN_BUILD_PIPELINE_GENERATOR) --validate
	$(MAKE) _clean-docker

check:
	docker run --rm -i hadolint/hadolint:v2.6.0-alpine < Dockerfile
	docker run --rm -i hadolint/hadolint:v2.6.0-alpine < jenkins.Dockerfile
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
	$(MAKE) _clean-docker _start-jenkins
	$(call COMPOSE_RUN_TEST, $(MAKE) _test)
	$(MAKE) _clean-docker

_test:
	npm run test -- $(JEST_ARGS)

test-debugger:
	$(MAKE) _clean-docker _start-jenkins
	$(call COMPOSE_RUN_TEST, $(MAKE) _test-debugger, --service-ports)
	$(MAKE) _clean-docker

_test-debugger:
	node --inspect-brk=0.0.0.0 -r ts-node/register node_modules/.bin/jest $(JEST_ARGS) --runInBand

test-env:
	$(call COMPOSE_RUN_TEST, /bin/bash)

# Private Targets

_start-jenkins:
	docker-compose build jenkins
	docker-compose up -d jenkins

_clean-docker:
	docker-compose down --remove-orphans
