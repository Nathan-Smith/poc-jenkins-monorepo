#!/bin/bash

# fail if anything errors
set -e
# fail if a function call is missing an argument
set -u

source ${0%/*}/verbose-log.sh

changed_components=($(${0%/*}/changed-components.sh))

base_commit=$(${0%/*}/base-commit.sh)

branch_type=$(${0%/*}/branch-type.sh)

case "$branch_type" in
  feature)
    preid="dev"
    ;;
  bugfix)
    preid="rc"
    ;;
esac

verboseLog "base_commit=$base_commit"

function isPrelease {
  base_version=$1
  # Inline node script to check is a given version is a prerelease
  echo $(cd /opt/app; node -e "console.log(require('semver/functions/prerelease')('$base_version') != null ? 'true' : 'false')")
}

changed_components+=(".")

# For every changed component, bump the version from the base commit (common to stable and unstable branch), for new components ensure it has a prerelease
for i in "${changed_components[@]}"; do
  verboseLog  "-- $i --"
  verboseLog  "VERSION=$(cat $i/VERSION)"

  set +e
  # Check if a component is new
  git show $base_commit:$i/VERSION > /dev/null 2>&1
  is_new_component=$?
  set -e
  verboseLog "is_new_component=$is_new_component"
  if [ $is_new_component -eq 0 ]; then
    # Load the VERSION file from the base commit, this is the starting point where the bump logic will work from
    git checkout $base_commit -- $i/VERSION
    base_version=$(cat $i/VERSION)

    verboseLog  "VERSION=$(cat $i/VERSION)"

    # If not hotfix, it must be a prerelease, otherwise a patch bump
    if [[ "$branch_type" != "hotfix" ]]; then
      # If the base version is already a prerelease, bump it, otherwise this is the first change to the component, so minor bump with a prerelease
      if [[ $(isPrelease $base_version) == "true" ]]; then
        echo "$(cd /opt/app; npx semver -i prerelease --preid $preid $base_version)" > $i/VERSION
      else
        echo "$(cd /opt/app; npx semver -i minor $base_version)-$preid.0" > $i/VERSION
      fi
    else
      echo "$(cd /opt/app; npx semver -i patch $base_version)" > $i/VERSION
    fi
  else
    if [[ $(isPrelease $(cat $i/VERSION)) == "false" && "$branch_type" != "hotfix" ]]; then
      echo "$(cat $i/VERSION)-$preid.0" > $i/VERSION
    fi
  fi

done
