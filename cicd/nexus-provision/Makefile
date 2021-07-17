VERSION :=$(file < VERSION)
IMAGE_TAG :=docker-repository-127-0-0-1.nip.io/nexus-provision:$(VERSION)

COMPOSE_RUN_NEXUS_PROVISION = docker-compose run  --rm nexus-provision
COMPOSE_RUN_OPENJDK8 = docker-compose run  --rm openjdk8
COMPOSE_RUN_TEST_MAVEN = docker-compose run  --rm test-maven
COMPOSE_RUN_TEST_NPM = docker-compose run  --rm test-npm

export WORKSPACE_PREFIX = /build
export WORKING_DIR = $(WORKSPACE_PREFIX)$(shell echo "$(WORKSPACE)" | sed -e 's|^'$(AGENT_ROOT)'||')
export WORKSPACE_MOUNT ?= ../..

# Pipeline Targets

ci: envfile check build test build-image push-image

# Public Targets

require-build:
	@docker manifest inspect $(IMAGE_TAG) > /dev/null 2>&1 && echo "NO" || echo "YES"

envfile:
	cd ../.. && make envfile ENVFILE=env.example

build:
	$(COMPOSE_RUN_OPENJDK8) ./gradlew build
.PHONY: build

build-image:
	docker build -t $(IMAGE_TAG) .

check: run-lint

push-image:
	docker push $(IMAGE_TAG)

test: _clean-docker _start-nexus
	docker-compose build nexus-provision
	$(COMPOSE_RUN_NEXUS_PROVISION)
	$(COMPOSE_RUN_NEXUS_PROVISION)
	$(MAKE) _test-maven
	$(MAKE) _test-npm
	$(MAKE) _clean-docker
.PHONY: test

run-lint:
	docker run --rm -i hadolint/hadolint:v2.6.0-alpine < Dockerfile

# Private Targets

_test-maven:
	docker-compose build test-maven
	$(COMPOSE_RUN_TEST_MAVEN)

_test-npm:
	docker-compose build test-npm
	$(COMPOSE_RUN_TEST_NPM)

_start-nexus:
	docker-compose up -d nexus

_clean-docker:
	docker-compose down --remove-orphans
