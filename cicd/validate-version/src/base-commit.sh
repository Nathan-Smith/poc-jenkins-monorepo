#!/bin/bash

# fail if anything errors
set -e
# fail if a function call is missing an argument
set -u

source ${0%/*}/verbose-log.sh

branch_type=$(${0%/*}/branch-type.sh)

current=$(git branch --show-current)

# Fallback to BRANCH_NAME that is defined in the environment
current=${current:-$BRANCH_NAME}

merge_base=""

if [[ "$branch_type" == "feature" ]]; then
  merge_base="develop"
elif  [[ "$branch_type" == "hotfix" ]]; then
  merge_base="main"
elif  [[ "$branch_type" == "bugfix" ]]; then
  branches=$(git branch --contains HEAD)
  # If HEAD is release/* then bugfix hasn't moved to just use HEAD
  if [[ "$branches" =~ release/ ]]; then
    merge_base="HEAD"
  else
    # Filter all branches 'connected' to the current branch by the current branch, the first in this list will be release/*
    merge_base="$(git show-branch | sed 's/\(]\|\^\|~\).*//' | grep "\*\|+" | grep -v "$current" | head -n1 | sed "s/^.*\[//")"

    # For detached HEADs lookup the closest release branch ref
    if [[ -z "$merge_base" ]]; then
      verboseLog $(git show-branch release/\*)
      merge_base="$(git show-branch release/\* | sed 's/\(]\|\^\|~\).*//' | sed "s/^.*\[//")"
    fi
  fi
fi

verboseLog "merge_base=$merge_base"

if [[ -n "$merge_base" ]]; then
  # Check for local branches first, fallback to origin tracking branches
  if [[ -n "$(git show-ref --verify $merge_base)" || -n "$(git show-ref refs/heads/$merge_base)" || "$merge_base" == "HEAD" ]]; then
    printf "$(git merge-base HEAD $merge_base)"
  else
    printf "$(git merge-base HEAD origin/$merge_base)"
  fi
else
  verboseLog "unknown merge-base for $branch_type"
fi
