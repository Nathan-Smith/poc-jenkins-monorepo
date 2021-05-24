COMPOSE_RUN_NEXUS_PROVISION = docker-compose run  --rm nexus-provision
COMPOSE_RUN_OPENJDK8 = docker-compose run  --rm openjdk8
COMPOSE_RUN_TEST_MAVEN = docker-compose run  --rm test-maven
COMPOSE_RUN_TEST_NPM = docker-compose run  --rm test-npm

export WORKSPACE_PREFIX = /build
export WORKING_DIR = $(WORKSPACE_PREFIX)$(shell echo "$(WORKSPACE)" | sed -e 's|^'$(AGENT_ROOT)'||')
export WORKSPACE_MOUNT ?= ../..

# Pipeline Targets

ci: envfile build test

# Public Targets

envfile:
	cd ../.. && make envfile ENVFILE=env.example

build:
	$(COMPOSE_RUN_OPENJDK8) ./gradlew build
.PHONY: build

test: _clean-docker _start-nexus
	docker-compose build nexus-provision
	$(COMPOSE_RUN_NEXUS_PROVISION)
	$(COMPOSE_RUN_NEXUS_PROVISION)
	$(MAKE) _test-maven
	$(MAKE) _test-npm
	$(MAKE) _clean-docker
.PHONY: test

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
