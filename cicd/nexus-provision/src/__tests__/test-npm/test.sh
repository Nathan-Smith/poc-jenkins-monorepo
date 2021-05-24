#!/bin/bash

# fail if anything errors
set -e
# fail if a function call is missing an argument
set -u
set +x

npm install

printf "Test npm publish with auth\n"

npm publish

printf "Test npm publish without auth\n"

echo "@test:registry=http://nexus:8081/repository/npm-internal/" > .npmrc
cat .npmrc

# Expecting error
set +e
npm publish
result=$?
set -e

printf "publishing without auth should fail\n"

if [[ "$result" == "0" ]]; then
  exit 1
fi

printf "Test npm install without auth\n"

npm install @test/test-npm
