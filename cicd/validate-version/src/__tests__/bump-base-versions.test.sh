#!/bin/bash

# fail if anything errors
set -e
# fail if a function call is missing an argument
set -u

source ./src/__tests__/__helpers__/asserts.sh

declare -A initial_versions
declare -A changed_versions
declare -A expected_versions

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

function testBumpBaseVersions {
  branch_type=$1
  base_branch=$2
  initial_versions=$3
  changed_versions=$4
  expected_versions=$5

  test_name="TEST - Bump Base Versions for $branch_type "

  setup "$test_name"

  git checkout -b $base_branch

  echo ${initial_versions[.]} > VERSION

  mkdir app1
  touch app1/README.md
  touch app1/test.js
  echo ${initial_versions[app1]} > app1/VERSION
  echo "lib1" > app1/deps
  echo "lib2" >> app1/deps

  mkdir app2
  touch app2/README.md
  touch app2/test.js
  mkdir app2/part
  touch app2/part/index.js
  echo ${initial_versions[app2]} > app2/VERSION
  echo "lib2" > app2/deps

  mkdir app3
  touch app3/README.md
  touch app3/test.js
  echo ${initial_versions[app3]} > app3/VERSION
  echo "lib2" > app3/deps

  mkdir lib1
  touch lib1/README.md
  echo ${initial_versions[lib1]} > lib1/VERSION

  mkdir lib2
  touch lib2/README.md
  echo ${initial_versions[lib2]} > lib2/VERSION

  mkdir test1
  touch test1/README.md
  touch test1/test.js
  echo ${initial_versions[test1]} > test1/VERSION
  echo "app3" > test1/deps

  git add .
  git commit -m "Commit on $base_branch"
  git checkout -b $branch_type/testing-detection

  echo ${changed_versions[.]} > VERSION
  touch app1/new-file.js
  echo ${changed_versions[app1]} > app1/VERSION
  echo "Hello world" > app2/test.js
  echo "Hello world" > app2/part/index.js
  echo ${changed_versions[app2]} > app2/VERSION
  echo "Hello world" > lib2/test.js

  mkdir test2
  touch test2/README.md
  touch test2/test.js
  echo ${changed_versions[test2]} > test2/VERSION
  echo "app3" > test2/deps

  git add .
  git commit -m "Commit on $branch_type/testing-detection"

  ../src/bump-base-versions.sh

  function actual {
    cat <<EOF
.=>$(cat VERSION)
app1=>$(cat app1/VERSION)
app2=>$(cat app2/VERSION)
app3=>$(cat app3/VERSION)
lib1=>$(cat lib1/VERSION)
lib2=>$(cat lib2/VERSION)
test1=>$(cat test1/VERSION)
test2=>$(cat test2/VERSION)
EOF
  }

  function expected {
    cat <<EOF
.=>${expected_versions[.]}
app1=>${expected_versions[app1]}
app2=>${expected_versions[app2]}
app3=>${expected_versions[app3]}
lib1=>${expected_versions[lib1]}
lib2=>${expected_versions[lib2]}
test1=>${expected_versions[test1]}
test2=>${expected_versions[test2]}
EOF
  }

  test_results+=("$test_name- $(expectEqual "$(actual)" "$(expected)")")

  tearDown
}

# -----------------------------------------------------------------------------

initial_versions[.]="0.1.0"
initial_versions[app1]="0.1.0"
initial_versions[app2]="0.1.0"
initial_versions[app3]="0.1.0"
initial_versions[lib1]="0.1.0"
initial_versions[lib2]="0.2.0-dev.0"
initial_versions[test1]="0.1.0"

changed_versions[.]="0.1.0"
changed_versions[app1]="0.2.0-dev.0"
changed_versions[app2]="0.1.1-dev.0"
changed_versions[test2]="2.3.0"

expected_versions[.]="0.2.0-dev.0"
expected_versions[app1]="0.2.0-dev.0"
expected_versions[app2]="0.2.0-dev.0"
expected_versions[app3]="0.2.0-dev.0"
expected_versions[lib1]="0.1.0"
expected_versions[lib2]="0.2.0-dev.1"
expected_versions[test1]="0.2.0-dev.0"
expected_versions[test2]="2.3.0-dev.0"

testBumpBaseVersions "feature" "develop" initial_versions changed_versions expected_versions

# -----------------------------------------------------------------------------

initial_versions[.]="0.1.0"
initial_versions[app1]="0.1.0"
initial_versions[app2]="0.1.0"
initial_versions[app3]="0.1.0"
initial_versions[lib1]="0.1.0"
initial_versions[lib2]="0.2.0-rc.0"
initial_versions[test1]="0.1.0"

changed_versions[.]="0.1.0"
changed_versions[app1]="0.2.0-rc.0"
changed_versions[app2]="0.1.1-rc.0"
changed_versions[test2]="2.3.0"

expected_versions[.]="0.2.0-rc.0"
expected_versions[app1]="0.2.0-rc.0"
expected_versions[app2]="0.2.0-rc.0"
expected_versions[app3]="0.2.0-rc.0"
expected_versions[lib1]="0.1.0"
expected_versions[lib2]="0.2.0-rc.1"
expected_versions[test1]="0.2.0-rc.0"
expected_versions[test2]="2.3.0-rc.0"

testBumpBaseVersions "bugfix" "release/1.0" initial_versions changed_versions expected_versions

# -----------------------------------------------------------------------------

initial_versions[.]="0.1.0"
initial_versions[app1]="0.1.0"
initial_versions[app2]="0.1.0"
initial_versions[app3]="0.1.0"
initial_versions[lib1]="0.1.0"
initial_versions[lib2]="0.2.0"
initial_versions[test1]="0.1.0"

changed_versions[.]="0.1.0"
changed_versions[app1]="0.1.1"
changed_versions[app2]="0.2.0"
changed_versions[test2]="2.3.0"

expected_versions[.]="0.1.1"
expected_versions[app1]="0.1.1"
expected_versions[app2]="0.1.1"
expected_versions[app3]="0.1.1"
expected_versions[lib1]="0.1.0"
expected_versions[lib2]="0.2.1"
expected_versions[test1]="0.1.1"
expected_versions[test2]="2.3.0"

testBumpBaseVersions "hotfix" "main" initial_versions changed_versions expected_versions

# -----------------------------------------------------------------------------

initial_versions[.]="0.1.0-dev.0"
initial_versions[app1]="0.1.0"
initial_versions[app2]="0.1.0"
initial_versions[app3]="0.1.0"
initial_versions[lib1]="0.1.0"
initial_versions[lib2]="0.2.0-dev.0"
initial_versions[test1]="0.1.0"

changed_versions[.]="0.1.0-dev.0"
changed_versions[app1]="0.2.0-dev.0"
changed_versions[app2]="0.1.1-dev.0"
changed_versions[test2]="2.3.0-dev.0"

expected_versions[.]="0.1.0-dev.1"
expected_versions[app1]="0.2.0-dev.0"
expected_versions[app2]="0.2.0-dev.0"
expected_versions[app3]="0.2.0-dev.0"
expected_versions[lib1]="0.1.0"
expected_versions[lib2]="0.2.0-dev.1"
expected_versions[test1]="0.2.0-dev.0"
expected_versions[test2]="2.3.0-dev.0"

testBumpBaseVersions "feature" "develop" initial_versions changed_versions expected_versions

# -----------------------------------------------------------------------------

exit_code=0
for i in "${test_results[@]}"; do
  echo "${i}"
  if [[ "${i}" =~ .*❌.*$ ]]; then
    exit_code=2
  fi
done

exit $exit_code
