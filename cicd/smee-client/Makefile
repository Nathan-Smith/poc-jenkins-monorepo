VERSION :=$(file < VERSION)
IMAGE_TAG :=docker-repository-127-0-0-1.nip.io/smee-client:$(VERSION)

# Pipeline Targets

ci: check build-image push-image

# Public Targets

build-image:
	docker build -t $(IMAGE_TAG) .

check: run-lint

push-image:
	docker push $(IMAGE_TAG)

run-lint:
	docker run --rm -i hadolint/hadolint:v2.6.0-alpine < Dockerfile
