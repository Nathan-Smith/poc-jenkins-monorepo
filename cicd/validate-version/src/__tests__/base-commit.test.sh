#!/bin/bash

# fail if anything errors
set -e
# fail if a function call is missing an argument
set -u

source ./src/__tests__/__helpers__/asserts.sh

function setup {
  local test_name=$1
  local base_branch=$2

  echo "$test_name"

  git config --global init.defaultBranch main
  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"
  mkdir ./test-repo
  pushd ./test-repo
  git init

  git checkout -b $base_branch
  touch THIS.md
  git add .
  git commit -m "Commit on $base_branch"
}

function tearDown {
  popd
  rm -rf ./test-repo

  echo "${test_results[-1]}"
  echo "--------------------"
}

function detach {
  local branch_type=$1
  local base_branch=$2
  local detached_no_local=$3

  if [[ "$detached_no_local" == "true" ]]; then
    git checkout --detach $branch_type/testing-detection
    git branch -m $base_branch origin/$base_branch
    git branch -m $branch_type/testing-detection origin/$branch_type/testing-detection
    export BRANCH_NAME=$branch_type/testing-detection
  fi
}

function testBranchOnTheSameCommitAsBaseBranch {
  local branch_type=$1
  local base_branch=$2
  local detached_no_local=$3

  local test_name="TEST - $branch_type branch on the same commit as $base_branch deteched=$detached_no_local -"

  setup "$test_name" "$base_branch"

  local expected=$(git rev-parse HEAD)
  git checkout -b $branch_type/testing-detection

  detach $branch_type $base_branch $detached_no_local

  local actual=`../src/base-commit.sh`

  test_results+=("$test_name- $(expectEqual "$actual" "$expected")")

  tearDown
}

function testBranchOneCommitAheadOfBaseBranch {
  local branch_type=$1
  local base_branch=$2
  local detached_no_local=$3

  local test_name="TEST - $branch_type branch one commit ahead of $base_branch deteched=$detached_no_local -"

  setup "$test_name" "$base_branch"

  local expected=$(git rev-parse HEAD)
  git checkout -b $branch_type/testing-detection
  touch THIS2.md
  git add .
  git commit -m "Commit on $branch_type/testing-detection"

  detach $branch_type $base_branch $detached_no_local

  local actual=`../src/base-commit.sh`

  test_results+=("$test_name- $(expectEqual "$actual" "$expected")")

  tearDown
}

function testBranchOneCommitBehindOfBaseBranch {
  local branch_type=$1
  local base_branch=$2
  local detached_no_local=$3

  local test_name="TEST - $branch_type branch one commit behind of $base_branch deteched=$detached_no_local -"

  setup "$test_name" "$base_branch"

  local expected=$(git rev-parse HEAD)
  git checkout -b $branch_type/testing-detection
  git checkout $base_branch
  touch THIS2.md
  git add .
  git commit -m "Commit on $base_branch"
  git checkout $branch_type/testing-detection

  detach $branch_type $base_branch $detached_no_local

  local actual=`../src/base-commit.sh`

  test_results+=("$test_name- $(expectEqual "$actual" "$expected")")

  tearDown
}

function testBranchOneCommitBehindAndOneAheadOfBaseBranch {
  local branch_type=$1
  local base_branch=$2
  local detached_no_local=$3

  local test_name="TEST - $branch_type branch one commit behind and one ahead of $base_branch deteched=$detached_no_local -"

  setup "$test_name" "$base_branch"

  local expected=$(git rev-parse HEAD)
  git checkout -b $branch_type/testing-detection
  touch THIS2.md
  git add .
  git commit -m "Commit on $branch_type/testing-detection"
  git checkout $base_branch
  touch THIS3.md
  git add .
  git commit -m "Commit on $base_branch"
  git checkout $branch_type/testing-detection

  detach $branch_type $base_branch $detached_no_local

  local actual=`../src/base-commit.sh`

  test_results+=("$test_name- $(expectEqual "$actual" "$expected")")

  tearDown
}

function testBranchWithAnotherBranchBetweenBaseBranch {
  local branch_type=$1
  local base_branch=$2
  local detached_no_local=$3

  local test_name="TEST - $branch_type branch with another branch between $base_branch deteched=$detached_no_local -"

  setup "$test_name" "$base_branch"

  local expected=$(git rev-parse HEAD)
  git checkout -b $branch_type/testing-detection
  touch THIS2.md
  git add .
  git commit -m "Commit on $branch_type/testing-detection"
  git checkout $base_branch
  touch THIS3.md
  git add .
  git commit -m "Commit on $base_branch"
  git checkout -b $branch_type/another-branch
  git checkout $base_branch
  touch THIS4.md
  git add .
  git commit -m "Commit on $base_branch"
  git checkout $branch_type/testing-detection

  detach $branch_type $base_branch $detached_no_local

  local actual=`../src/base-commit.sh`

  test_results+=("$test_name- $(expectEqual "$actual" "$expected")")

  tearDown
}

test_results=('TEST RESULTS:')

function testSuite {
  local detached_no_local=$1

  # -----------------------------------------------------------------------------

  testBranchOnTheSameCommitAsBaseBranch "feature" "develop" $detached_no_local

  # -----------------------------------------------------------------------------

  testBranchOnTheSameCommitAsBaseBranch "bugfix" "release/1.0" $detached_no_local

  # -----------------------------------------------------------------------------

  testBranchOnTheSameCommitAsBaseBranch "bugfix" "release/2.0" $detached_no_local

  # -----------------------------------------------------------------------------

  testBranchOnTheSameCommitAsBaseBranch "hotfix" "main" $detached_no_local

  # -----------------------------------------------------------------------------

  testBranchOneCommitAheadOfBaseBranch "feature" "develop" $detached_no_local

  # -----------------------------------------------------------------------------

  testBranchOneCommitAheadOfBaseBranch "bugfix" "release/1.0" $detached_no_local

  # -----------------------------------------------------------------------------

  testBranchOneCommitAheadOfBaseBranch "bugfix" "release/2.0" $detached_no_local

  # -----------------------------------------------------------------------------

  testBranchOneCommitAheadOfBaseBranch "hotfix" "main" $detached_no_local

  # -----------------------------------------------------------------------------

  testBranchOneCommitBehindOfBaseBranch "feature" "develop" $detached_no_local

  # -----------------------------------------------------------------------------

  testBranchOneCommitBehindOfBaseBranch "bugfix" "release/1.0" $detached_no_local

  # -----------------------------------------------------------------------------

  testBranchOneCommitBehindOfBaseBranch "bugfix" "release/2.0" $detached_no_local

  # -----------------------------------------------------------------------------

  testBranchOneCommitBehindOfBaseBranch "hotfix" "main" $detached_no_local

  # -----------------------------------------------------------------------------

  testBranchOneCommitBehindAndOneAheadOfBaseBranch "feature" "develop" $detached_no_local

  # -----------------------------------------------------------------------------

  testBranchOneCommitBehindAndOneAheadOfBaseBranch "bugfix" "release/1.0" $detached_no_local

  # -----------------------------------------------------------------------------

  testBranchOneCommitBehindAndOneAheadOfBaseBranch "bugfix" "release/2.0" $detached_no_local

  # -----------------------------------------------------------------------------

  testBranchOneCommitBehindAndOneAheadOfBaseBranch "hotfix" "main" $detached_no_local

  # -----------------------------------------------------------------------------

  testBranchWithAnotherBranchBetweenBaseBranch "feature" "develop" $detached_no_local

  # -----------------------------------------------------------------------------

  testBranchWithAnotherBranchBetweenBaseBranch "bugfix" "release/1.0" $detached_no_local

  # -----------------------------------------------------------------------------

  testBranchWithAnotherBranchBetweenBaseBranch "bugfix" "release/2.0" $detached_no_local

  # -----------------------------------------------------------------------------

  testBranchWithAnotherBranchBetweenBaseBranch "hotfix" "main" $detached_no_local

  # -----------------------------------------------------------------------------

}

# -----------------------------------------------------------------------------

testSuite "false"

# -----------------------------------------------------------------------------

testSuite "true"

# -----------------------------------------------------------------------------

exit_code=0
for i in "${test_results[@]}"; do
  echo "${i}"
  if [[ "${i}" =~ .*❌.*$ ]]; then
    exit_code=2
  fi
done

exit $exit_code
