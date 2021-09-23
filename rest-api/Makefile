
VERSION=`cat $(VERSION)`

ci: check

check:
	docker run --rm -v $$PWD:/spec redocly/openapi-cli:v1.0.0-beta.61 lint openapi.yaml
