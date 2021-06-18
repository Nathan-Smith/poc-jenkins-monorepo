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

branch_type="feature"
base_branch="develop"

test_name="TEST - Changed Components with change on root "

setup "$test_name"

git checkout -b $base_branch

echo "0.1.0" > VERSION

mkdir app1
touch app1/README.md
touch app1/test.js
echo "0.1.0" > app1/VERSION
echo "lib1" > app1/deps
echo "lib2" >> app1/deps

mkdir app2
touch app2/README.md
touch app2/test.js
mkdir app2/part
touch app2/part/index.js
echo "0.1.0" > app2/VERSION
echo "lib2" > app2/deps

mkdir app3
touch app3/README.md
touch app3/test.js
echo "0.1.0" > app3/VERSION
echo "lib2" > app3/deps

mkdir test1
touch test1/README.md
touch test1/test.js
echo "0.1.0" > test1/VERSION
echo "app3" > test1/deps

mkdir lib1
touch lib1/README.md
echo "0.1.0" > lib1/VERSION

mkdir lib2
touch lib2/README.md
echo "0.1.0" > lib2/VERSION

mkdir lib3
touch lib3/README.md
mkdir lib3/part
touch lib3/part/index.js
echo "0.1.0" > lib3/VERSION

mkdir tool1
touch tool1/README.md
echo "0.1.0" > tool1/VERSION

mkdir tool1-provision
touch tool1-provision/README.md
echo "0.1.0" > tool1-provision/VERSION
echo "tool1" > tool1-provision/deps

git add .
git commit -m "Commit on $base_branch"
git checkout -b $branch_type/testing-detection

touch app1/new-file.js
echo "0.1.0-dev.0" > VERSION
echo "0.2.0-dev.0" > app1/VERSION
echo "Hello world" > app2/test.js
echo "Hello world" > app2/part/index.js
echo "0.2.0-dev.0" > app2/VERSION
echo "Hello world" > lib2/test.js
echo "Hello world" > lib3/part/index.js
echo "Hello world" > tool1-provision/test.js

git add .
git commit -m "Commit on $branch_type/testing-detection"

actual="$(../src/changed-components.sh)"

function expected {
  cat <<EOF
app1
app2
app3
lib2
lib3
test1
tool1-provision
EOF
}

test_results+=("$test_name- $(expectEqual "$actual" "$(expected)")")

tearDown

# -----------------------------------------------------------------------------

branch_type="feature"
base_branch="develop"

test_name="TEST - Changed Components without change on root "

setup "$test_name"

git checkout -b $base_branch

echo "0.1.0" > VERSION

mkdir app1
touch app1/README.md
touch app1/test.js
echo "0.1.0" > app1/VERSION
echo "lib1" > app1/deps
echo "lib2" >> app1/deps

git add .
git commit -m "Commit on $base_branch"
git checkout -b $branch_type/testing-detection

touch app1/new-file.js
echo "hello world" > app1/test.js

git add .
git commit -m "Commit on $branch_type/testing-detection"

actual="$(../src/changed-components.sh)"

function expected {
  cat <<EOF
app1
EOF
}

test_results+=("$test_name- $(expectEqual "$actual" "$(expected)")")

tearDown

# -----------------------------------------------------------------------------

base_branch="develop"

test_name="TEST - Changed Components with no change "

setup "$test_name"

git checkout -b $base_branch

echo "0.1.0" > VERSION

mkdir app1
touch app1/README.md
touch app1/test.js
echo "0.1.0" > app1/VERSION
echo "lib1" > app1/deps
echo "lib2" >> app1/deps

git add .
git commit -m "Commit on $base_branch"

actual="$(../src/changed-components.sh)"

function expected {
  cat <<EOF
EOF
}

test_results+=("$test_name- $(expectEqual "$actual" "$(expected)")")

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
