#!/bin/bash

# fail if anything errors
set -e
# fail if a function call is missing an argument
set -u

source ${0%/*}/verbose-log.sh

current=$(git branch --show-current)
current=${current:-$BRANCH_NAME}

if [[ "$current" =~ ^feature/.* ]]; then
  branch_type="feature"
elif  [[ "$current" =~ ^bugfix/.* ]]; then
  branch_type="bugfix"
elif  [[ "$current" =~ ^hotfix/.* ]]; then
  branch_type="hotfix"
else
  branch_type=$current
fi

echo "$branch_type"

verboseLog "current=$current"
verboseLog "branch_type=$branch_type"
