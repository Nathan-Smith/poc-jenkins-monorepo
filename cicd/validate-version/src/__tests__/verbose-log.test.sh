#!/bin/bash

# fail if anything errors
set -e
# fail if a function call is missing an argument
set -u

source ./src/__tests__/__helpers__/asserts.sh
source ./src/verbose-log.sh

test_results=('TEST RESULTS:')

# -----------------------------------------------------------------------------

test_name="TEST - No logging when VERBOSE is not set -"
echo $test_name

unset VERBOSE

actual=$(verboseLog "Hello World" 2>&1 >/dev/null)

test_results+=("$test_name- $(expectEqual "$actual" "")")

# -----------------------------------------------------------------------------

test_name="TEST - Logging when VERBOSE is set to true/1 -"
echo $test_name

VERBOSE=1

actual=$(verboseLog "Hello World" 2>&1 >/dev/null)

test_results+=("$test_name- $(expectEqual "$actual" "Hello World")")

# -----------------------------------------------------------------------------

test_name="TEST - Logging when VERBOSE is set to false/0 -"
echo $test_name

VERBOSE=0

actual=$(verboseLog "Hello World" 2>&1 >/dev/null)

test_results+=("$test_name- $(expectEqual "$actual" "")")

# -----------------------------------------------------------------------------

exit_code=0
for i in "${test_results[@]}"; do
  echo "${i}"
  if [[ "${i}" =~ .*❌.*$ ]]; then
    exit_code=2
  fi
done

exit $exit_code
