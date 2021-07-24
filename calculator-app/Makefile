COMPOSE_BUILD_DEV = docker-compose build dev
COMPOSE_RUN_DEV = $(COMPOSE_BUILD_DEV) && docker-compose run --service-ports --rm dev

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

ci: check build-image push-image

# Public Targets

build-image:
	docker build -t $(IMAGE_TAG) .

check:
	docker run --rm -i hadolint/hadolint:v2.6.0-alpine < Dockerfile

dev-deps:
	$(COMPOSE_RUN_DEV) npm install

dev-env:
	$(COMPOSE_RUN_DEV) /bin/bash

push-image:
	docker push $(IMAGE_TAG)

require-build:
	@docker manifest inspect $(IMAGE_TAG) > /dev/null 2>&1 && echo "NO" || echo "YES"

run-image:
	docker run -p 3000:3000 $(IMAGE_TAG)
