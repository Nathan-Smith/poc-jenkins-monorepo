COMPOSE_BUILD_DEV = docker-compose build dev
COMPOSE_BUILD_TEST = docker-compose build test
COMPOSE_RUN_DEV = $(COMPOSE_BUILD_DEV) && docker-compose run --service-ports --rm dev
COMPOSE_RUN_TEST = $(COMPOSE_BUILD_TEST); docker-compose run --rm $(2) test /bin/bash -c "$(SETUP_TESTS) && $(1); $(TEARDOWN_TESTS)"
SETUP_TESTS = rsync -a \$$WORKING_DIR/ /opt/app --exclude node_modules --exclude package.json --exclude package-lock.json && cd /opt/app
TEARDOWN_TESTS = rsync -a /opt/app/ \$$WORKING_DIR --exclude node_modules --exclude package.json --exclude package-lock.json

VERSION :=$(file < VERSION)
IMAGE_TAG :=docker-repository-127-0-0-1.nip.io/calculator-app:$(VERSION)

export WORKSPACE_PREFIX = /build
# When running in Jenkins, the WORKSPACE points to the full path to the repo, need to remove the path where the volume / host directoy is mounted too.
export WORKING_DIR = $(WORKSPACE_PREFIX)$(shell echo "$(WORKSPACE)" | sed -e 's|^'$(AGENT_ROOT)'||')
# Running locally this is just the root of the repo, when running in Jenkins the Agent defines what is mount too.
export WORKSPACE_MOUNT ?= ..
export VERBOSE ?= 0
export JEST_ARGS ?=

# Pipeline Targets

ci: check test build-image push-image

# Public Targets

build-image:
	docker build -t $(IMAGE_TAG) .

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

push-image:
	docker push $(IMAGE_TAG)

require-build:
	@docker manifest inspect $(IMAGE_TAG) > /dev/null 2>&1 && echo "NO" || echo "YES"

run-image:
	docker run -p 3000:3000 $(IMAGE_TAG)

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
