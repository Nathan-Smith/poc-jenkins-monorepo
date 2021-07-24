COMPOSE_BUILD_DEV = docker-compose build dev
COMPOSE_RUN_DEV = $(COMPOSE_BUILD_DEV); docker-compose run --service-ports --rm dev

export WORKSPACE_PREFIX = /build
# When running in Jenkins, the WORKSPACE points to the full path to the repo, need to remove the path where the volume / host directoy is mounted too.
export WORKING_DIR = $(WORKSPACE_PREFIX)$(shell echo "$(WORKSPACE)" | sed -e 's|^'$(AGENT_ROOT)'||')
# Running locally this is just the root of the repo, when running in Jenkins the Agent defines what is mount too.
export WORKSPACE_MOUNT ?= ..
export VERBOSE ?= 0
export JEST_ARGS ?=
export VERSION=`cat VERSION`

COMPOSE_RUN_ALPINE = docker-compose run --rm alpine

ci:
	$(COMPOSE_RUN_ALPINE) make _ci

_ci:
	pwd
	ls -la
	cat VERSION

# Public Targets

dev-deps:
	$(COMPOSE_RUN_DEV) npm install

dev-env:
	$(COMPOSE_RUN_DEV) /bin/bash

