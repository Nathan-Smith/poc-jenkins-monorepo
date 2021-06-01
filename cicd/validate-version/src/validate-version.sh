#!/bin/bash

# fail if anything errors
set -e
# fail if a function call is missing an argument
set -u

${0%/*}/bump-base-versions.sh

# Check if any VERSION files have changed after bumping, if yes mark the build as failed.
git add . && git diff --staged --exit-code
