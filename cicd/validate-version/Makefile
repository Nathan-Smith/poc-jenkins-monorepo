VERBOSE ?= 0

COMPOSE_RUN_DEV = docker-compose run --rm dev
COMPOSE_RUN_TEST = docker-compose run --rm -e VERBOSE=$(VERBOSE) test
COMPOSE_RUN_VALIDATE_VERSION = docker-compose run --rm -e VERBOSE=$(VERBOSE) validate-version

export WORKSPACE_PREFIX = /build
export WORKING_DIR = $(WORKSPACE_PREFIX)$(shell echo "$(WORKSPACE)" | sed -e 's|^'$(AGENT_ROOT)'||')
export WORKSPACE_MOUNT ?= ../..

# Pipeline Targets

ci: check test validate-version

# Public Targets

check: run-lint

run-lint:
	docker run --rm -i hadolint/hadolint:v2.6.0-alpine < Dockerfile

test:
	docker-compose build test
	$(COMPOSE_RUN_TEST) ./src/__tests__/base-commit.test.sh
	$(COMPOSE_RUN_TEST) ./src/__tests__/branch-type.test.sh
	$(COMPOSE_RUN_TEST) ./src/__tests__/bump-base-versions.test.sh
	$(COMPOSE_RUN_TEST) ./src/__tests__/changed-components.test.sh
	$(COMPOSE_RUN_TEST) ./src/__tests__/validate-version.test.sh
	$(COMPOSE_RUN_TEST) ./src/__tests__/verbose-log.test.sh

validate-version:
	docker-compose build validate-version
	$(COMPOSE_RUN_VALIDATE_VERSION)

# Private Targets

_npm-install-%:
	$(COMPOSE_RUN_DEV) npm install -DE $*

_npm-%:
	$(COMPOSE_RUN_DEV) npm $*

_npx-%:
	$(COMPOSE_RUN_DEV) npx $*
