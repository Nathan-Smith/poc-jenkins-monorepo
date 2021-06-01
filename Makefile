
# ENVFILE is env.template by default but can be overwritten
ENVFILE ?= env.template

# envfile creates or overwrites .env with $(ENVFILE)
envfile:
	cp -f $(ENVFILE) .env

bootstrap:
	cd cicd/docker-repository-proxy && $(MAKE) build-image
	cd cicd/ingress && $(MAKE) build-image
	cd cicd/jenkins && $(MAKE) build-image
	cd cicd/nexus && $(MAKE) build-image
	cd cicd/nexus-provision && $(MAKE) build-image
	cd cicd/smee-client && $(MAKE) build-image
	cd cicd/step-ca && $(MAKE) build-image
	cd cicd/step-renewer && $(MAKE) build-image

build-pipeline:
	cd cicd/build-pipeline-generator && $(MAKE) pipeline

validate-version:
	cd cicd/validate-version && $(MAKE) validate-version

version-%-patch:
	make _version-$*-patch

_version-%-patch:
	echo "Patch version bump for $*..."

version-%-minor:
	make _version-$*-minor

_version-%-minor:
	echo "Minor version bump for $*..."

version-%-major:
	make _version-$*-major

_version-%-major:
	echo "Major version bump for $*..."
