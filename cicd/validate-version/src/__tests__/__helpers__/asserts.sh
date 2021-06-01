#!/bin/bash

# fail if anything errors
set -e
# fail if a function call is missing an argument
set -u

function expectEqual {
  if [[ "$1" == "$2" ]]; then
    printf "✅\n"
  else
    printf "❌\n"
    printf "Expected $2 but got $1\n"
  fi
}
