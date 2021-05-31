VERSION :=$(file < VERSION)
IMAGE_TAG :=docker-repository-127-0-0-1.nip.io/nexus:$(VERSION)

# Pipeline Targets

ci: build-image push-image

# Public Targets

build-image:
	docker build --no-cache -t $(IMAGE_TAG) .

push-image:
	docker push $(IMAGE_TAG)
