COMPOSE_BUILD_DEV = docker-compose build dev
COMPOSE_BUILD_TEST = docker-compose build test
COMPOSE_RUN_DEV = $(COMPOSE_BUILD_DEV) && docker-compose run --rm dev
COMPOSE_RUN_TEST = $(COMPOSE_BUILD_TEST) && docker-compose run --rm test

export WORKSPACE_PREFIX = /build
export WORKING_DIR = $(WORKSPACE_PREFIX)$(shell echo "$(WORKSPACE)" | sed -e 's|^'$(AGENT_ROOT)'||')
export WORKSPACE_MOUNT ?= ..

# Pipeline Targets

ci: check test

# Public Targets

check:
	docker run --rm -i hadolint/hadolint:v2.6.0-alpine < Dockerfile

dev-env:
	$(COMPOSE_RUN_DEV) /bin/bash

test:
	$(MAKE) _clean-docker _start-chrome
	$(COMPOSE_RUN_TEST) ./gradlew test
	$(MAKE) _clean-docker

test-env:
	$(MAKE) _clean-docker _start-chrome
	$(COMPOSE_RUN_TEST) /bin/bash
	$(MAKE) _clean-docker

# Private Targets

_start-chrome:
	docker-compose build chrome
	docker-compose up -d chrome

_clean-docker:
	docker-compose down --remove-orphans
