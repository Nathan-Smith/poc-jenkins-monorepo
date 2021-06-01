#!/bin/bash

# fail if anything errors
set -e
# fail if a function call is missing an argument
set -u

# Helper method that only logs if VERBOSE is set, and outputs on stderr so it don't mess with return values of scripts
function verboseLog {
  if [[ ${VERBOSE:-0} -eq 1 ]]; then
    echo "$1" 1>&2
  fi
}

