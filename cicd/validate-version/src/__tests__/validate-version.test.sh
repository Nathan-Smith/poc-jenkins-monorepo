#!/bin/bash

# fail if anything errors
set -e
# fail if a function call is missing an argument
set -u

source ./src/__tests__/__helpers__/asserts.sh


function setup {
  local test_name=$1

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

function testUnstableBranch {
  branch_type=$1
  base_branch=$2
  expected=$3

  test_name="TEST - Validate Versions for $branch_type "

  setup "$test_name"

  git checkout -b $base_branch

  mkdir app1
  touch app1/README.md
  touch app1/test.js
  echo "0.1.0" > app1/VERSION

  git add .
  git commit -m "Commit on $base_branch"
  git checkout -b $branch_type/testing-detection

  touch app1/new-file.js

  git add .
  git commit -m "Commit on $branch_type/testing-detection"

  set +e
  ../src/validate-version.sh > /tmp/diff.txt
  validate_code=$?
  set -e

  function actual {
    cat <<EOF
validate_code=${validate_code}
diff=$(cat /tmp/diff.txt)
EOF
  }

  test_results+=("$test_name- $(expectEqual "$(actual)" "$(expected)")")

  tearDown
}

# -----------------------------------------------------------------------------

function testStableBranch {
  branch=$1

  test_name="TEST - Ignore $branch "

  setup "$test_name"

  git checkout -b $branch

  mkdir app1
  touch app1/README.md
  touch app1/test.js
  echo "0.1.0" > app1/VERSION

  git add .
  git commit -m "Commit on $branch"

  set +e
  ../src/validate-version.sh > /tmp/diff.txt
  validate_code=$?
  set -e

  function actual {
    cat <<EOF
validate_code=${validate_code}
diff=$(cat /tmp/diff.txt)
EOF
  }

  function expected {
    cat <<EOF
validate_code=0
diff=
EOF
  }

  test_results+=("$test_name- $(expectEqual "$(actual)" "$(expected)")")

  tearDown
}

# -----------------------------------------------------------------------------

function expected {
  cat <<EOF
validate_code=1
diff=diff --git a/app1/VERSION b/app1/VERSION
index 6e8bf73..3a9f305 100644
--- a/app1/VERSION
+++ b/app1/VERSION
@@ -1 +1 @@
-0.1.0
+0.2.0-dev.0
EOF
}

testUnstableBranch "feature" "develop" $(expected)

# -----------------------------------------------------------------------------

function expected {
  cat <<EOF
validate_code=1
diff=diff --git a/app1/VERSION b/app1/VERSION
index 6e8bf73..bba3d1a 100644
--- a/app1/VERSION
+++ b/app1/VERSION
@@ -1 +1 @@
-0.1.0
+0.2.0-rc.0
EOF
}

testUnstableBranch "bugfix" "release/1.0" $(expected)

# -----------------------------------------------------------------------------

function expected {
  cat <<EOF
validate_code=1
diff=diff --git a/app1/VERSION b/app1/VERSION
index 6e8bf73..17e51c3 100644
--- a/app1/VERSION
+++ b/app1/VERSION
@@ -1 +1 @@
-0.1.0
+0.1.1
EOF
}

testUnstableBranch "hotfix" "main" $(expected)

# -----------------------------------------------------------------------------

testStableBranch "main"

# -----------------------------------------------------------------------------

testStableBranch "develop"

# -----------------------------------------------------------------------------

testStableBranch "release/1.0"

# -----------------------------------------------------------------------------

exit_code=0
for i in "${test_results[@]}"; do
  echo "${i}"
  if [[ "${i}" =~ .*❌.*$ ]]; then
    exit_code=2
  fi
done

exit $exit_code
