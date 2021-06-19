# build-pipeline-generator

Generates the repo `Jenkinsfile` based on components and dependencies.

## Targets

### `ci`

Pipeline Target, runs all targets

### `build-pipeline-generator`

Validates Component `Jenkinsfile` and Generates Repo `Jenkinsfile`

### `check`

Checks the Source to ensure it meets development expectations, i.e. Formatting, Linting, Compiling

### `dev-deps`

Install Component Dependencies in the Development Environment

### `dev-env`

Runs a Development Environment Shell, use this to run `npm` commands

### `fix-lint`

Fixes Linting issues that have a automatic fix

### `fix-format`

Fixes Formatting issues

### `run-lint`

Runs Lint on the Source

### `run-format`

Runs Format on the Source

### `run-tsc`

Runs the Typescript Compiler on the Source

### `test`

Tests the Component, use `JEST_ARGS` to pass command arguments to `jest`

#### Updating Snapshot

`make test JEST_ARGS="--update-snapshot"`

#### Running a single Test file

`make test JEST_ARGS="validate-jenkinsfile"`

### `test-debugger`

Same as `test` but runs `jest` in `--inInBand`, halts testing until a debugger is attached and opens a debugger port

### `test-env`

Same as `dev-env` but includes all dependencies by default
