#!/bin/bash

# fail if anything errors
set -e
# fail if a function call is missing an argument
set -u

source ${0%/*}/verbose-log.sh

# Using diff between base and HEAD, get all the directories that contain some change
directories_with_change=($(git diff --name-only $(${0%/*}/base-commit.sh)..HEAD | xargs -I {} dirname {} | sort | uniq))
if [[ ${#directories_with_change[@]} -gt 0 && "${directories_with_change[0]}" == "." ]]; then
  unset directories_with_change[0]
fi

# Absolute path from the root of the git repo allows this tool to run in any directory
root=$(git rev-parse --show-toplevel)

changed_components=()

# Find all the components, the process is improved by not looking in directories that would never contain a Component
all_components=($(find $root -type d \( -name node_modules -o -name .jenkins \) -prune -false -o -type f -name VERSION -printf "%P\n" | xargs -I {} dirname {} | sort | uniq))
unset all_components[0]

verboseLog "-- changed_components --"

# Filter Components that contain some change
for i in "${all_components[@]}"; do
  for j in "${directories_with_change[@]}"; do
    if [[ "$j" =~ "$i" ]]; then
      changed_components+=($i)
      verboseLog $i
    fi
  done
done

components_with_dependencies=()

# Filter out any Components that don't have dependencies, since no Component that has changed will affect it.
for i in "${all_components[@]}"; do
  if [[ -e "$root/$i/deps" ]]; then
    components_with_dependencies+=($i)
  fi
done

verboseLog "-- components_with_dependencies --"

for i in "${components_with_dependencies[@]}"; do
  verboseLog $i
done

unchecked_dependencies=("${changed_components[@]}")

verboseLog "-- unchecked_dependencies --"

for i in "${unchecked_dependencies[@]}"; do
  verboseLog $i
done

# Walk the dependency graph of Components that are impacted by a change of its dependency or transitive dependency
while [[ ${#unchecked_dependencies[@]} != 0 ]]; do

  new_unchecked=()

  for i in "${!unchecked_dependencies[@]}"; do
    for j in "${components_with_dependencies[@]}"; do
      # If the Component depends on a Component that has changed, mark it also as changed, and check all Components that depend on it.
      if [[ $(grep -c ${unchecked_dependencies[$i]} $root/$j/deps) != 0 ]]; then
        new_unchecked+=($j)
        changed_components+=($j)
      fi
    done

    unset unchecked_dependencies[$i]
  done

  # Filter out any duplicates
  unchecked_dependencies=($(tr ' ' '\n' <<< "${new_unchecked[@]}" | sort -u | tr '\n' ' '))
  changed_components=($(tr ' ' '\n' <<< "${changed_components[@]}" | sort -u | tr '\n' ' '))

  verboseLog "-- unchecked_dependencies --"

  for i in "${unchecked_dependencies[@]}"; do
    verboseLog $i
  done

done

verboseLog "-- changed_components --"

for i in "${changed_components[@]}"; do
  echo $i
  verboseLog $i
done
