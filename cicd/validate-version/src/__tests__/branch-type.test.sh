#!/bin/bash

# fail if anything errors
set -e
# fail if a function call is missing an argument
set -u

source ./src/__tests__/__helpers__/asserts.sh

function setup {
  echo "$test_name"

  git config --global init.defaultBranch main
  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"
  mkdir ./test-repo
  pushd ./test-repo
  git init
}

function tearDown {
  popd
  rm -rf ./test-repo

  echo "${test_results[-1]}"
  echo "--------------------"
}

test_results=('TEST RESULTS:')

# -----------------------------------------------------------------------------

test_name="TEST - Detect feature branch type --"

setup

git checkout -b feature/testing-detection

actual=`../src/branch-type.sh`

test_results+=("$test_name- $(expectEqual "$actual" "feature")")

tearDown

# -----------------------------------------------------------------------------

test_name="TEST - Detect bugfix branch type ---"

setup

git checkout -b bugfix/testing-detection

actual=`../src/branch-type.sh`

test_results+=("$test_name- $(expectEqual "$actual" "bugfix")")

tearDown

# -----------------------------------------------------------------------------

test_name="TEST - Detect hotfix branch type ---"

setup

git checkout -b hotfix/testing-detection

actual=`../src/branch-type.sh`

test_results+=("$test_name- $(expectEqual "$actual" "hotfix")")

tearDown

# -----------------------------------------------------------------------------

test_name="TEST - Handle incorrect branch type "

setup

git checkout -b random/testing-detection

actual=`../src/branch-type.sh`

test_results+=("$test_name- $(expectEqual "$actual" "random/testing-detection")")

tearDown

# -----------------------------------------------------------------------------

test_name="TEST - Handle develop branch type --"

setup

git checkout -b develop

actual=`../src/branch-type.sh`

test_results+=("$test_name- $(expectEqual "$actual" "develop")")

tearDown

# -----------------------------------------------------------------------------

test_name="TEST - Handle main branch type -----"

setup

actual=`../src/branch-type.sh`

test_results+=("$test_name- $(expectEqual "$actual" "main")")

tearDown

# -----------------------------------------------------------------------------

test_name="TEST - Handle release branch type --"

setup

git checkout -b release/1.0

actual=`../src/branch-type.sh`

test_results+=("$test_name- $(expectEqual "$actual" "release/1.0")")

tearDown

# -----------------------------------------------------------------------------

test_name="TEST - Detached HEAD using BRANCH_NAME as fallback --"

setup

git checkout -b feature/testing
touch THIS2.md
git add .
git commit -m "Commit on feature/testing"
git checkout --detach feature/testing

export BRANCH_NAME=feature/testing
actual=`../src/branch-type.sh`

test_results+=("$test_name- $(expectEqual "$actual" "feature")")

tearDown

# -----------------------------------------------------------------------------

exit_code=0
for i in "${test_results[@]}"; do
  echo "${i}"
  if [[ "${i}" =~ .*❌.*$ ]]; then
    exit_code=2
  fi
done

exit $exit_code
