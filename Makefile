
# ENVFILE is env.template by default but can be overwritten
ENVFILE ?= env.template

# envfile creates or overwrites .env with $(ENVFILE)
envfile:
	cp -f $(ENVFILE) .env

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
