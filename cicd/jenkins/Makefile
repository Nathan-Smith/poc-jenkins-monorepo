VERSION :=$(file < VERSION)
IMAGE_TAG :=docker-repository-127-0-0-1.nip.io/jenkins:$(VERSION)

# Pipeline Targets

ci: build-image push-image

# Public Targets

require-build:
	@docker manifest inspect $(IMAGE_TAG) > /dev/null 2>&1 && echo "NO" || echo "YES"

build-image:
	docker build --no-cache -t $(IMAGE_TAG) .

push-image:
	docker push $(IMAGE_TAG)
