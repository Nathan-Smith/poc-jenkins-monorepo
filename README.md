# PoC Jenkins Mono Repo

- [System Dependencies](#system-dependencies)
  - [Required](#required)
  - [Optional](#optional)
- [Running CI/CD Locally](#running-cicd-locally)
  - [Stopping CI/CD](#stopping-cicd)
- [Components](#components)
  - [Structure](#structure)
  - [deps file](#deps-file)
  - [Makefile](#makefile)
- [Git Workflow and Versioning](#git-workflow-and-versioning)
  - [Complete Picture](#complete-picture)
  - [`master`](#master)
  - [`develop`](#develop)
  - [`feature/*`](#feature)
  - [`release/*`](#release)
  - [`bugfix/*`](#bugfix)
  - [`hotfix/*`](#hotfix)
- [Auto-generated Build Pipeline](#auto-generated-build-pipeline)
  - [Step 1 - Identify Components](#step-1---identify-components)
  - [Step 2 - Build a Directed Graph by adding a Vertex for every Component and adding an Edges to every Dependency of that Component](#step-2---build-a-directed-graph-by-adding-a-vertex-for-every-component-and-adding-an-edges-to-every-dependency-of-that-component)
  - [Step 3 - Find Vertices without Outgoing Edges (i.e. no Dependency)](#step-3---find-vertices-without-outgoing-edges-ie-no-dependency)
  - [Step 4 - Create first parallel stage](#step-4---create-first-parallel-stage)
  - [Step 5 - Remove Vertices from previous step and find Vertices without Outgoing Edges (i.e. no dependency)](#step-5---remove-vertices-from-previous-step-and-find-vertices-without-outgoing-edges-ie-no-dependency)
  - [Step 4 - Create second parallel stage](#step-4---create-second-parallel-stage)
  - [Step 5 - Remove Vertices from previous step and find Vertices without Outgoing Edges (i.e. no dependency)](#step-5---remove-vertices-from-previous-step-and-find-vertices-without-outgoing-edges-ie-no-dependency-1)
  - [Step 6 - Create third parallel stage](#step-6---create-third-parallel-stage)
  - [Step 7 - Remove Vertices from previous step and find Vertices without Outgoing Edges (i.e. no dependency)](#step-7---remove-vertices-from-previous-step-and-find-vertices-without-outgoing-edges-ie-no-dependency)
  - [Step 8 - Create forth parallel stage](#step-8---create-forth-parallel-stage)
- [Decisions](#decisions)
  - [D-1 Component Version Source of Truth](#d-1-component-version-source-of-truth)
  - [D-2 Component Independent Versioning](#d-2-component-independent-versioning)

## System Dependencies

### Required
* [Docker](https://www.docker.com/products/docker-desktop)
* [Compose](https://docs.docker.com/compose/install)
* [make](https://www.gnu.org/software/make)

### Optional
* [Visual Studio Code](https://code.visualstudio.com)
  * `.vscode` contains useful extensions for documentation authoring

## Running CI/CD Locally

`$  docker-compose up`

Jenkins will be available on `http://localhost:8080`
Nexus will be available on `http://localhost:8081`

### Stopping CI/CD

`$ docker-compose down`

## Components

* **MUST** have an unique name

### Structure
```
.
├── deps        List of dependencies
├── Makefile    ci target required
└── VERSION     Component version (semver)
```

### deps file
```
app1
lib2
```

### Makefile
```
ci: deps test build publish

deps:
	echo "Installing Dependencies"

test:
	echo "Testing..."

build:
	echo "Building..."

publish:
	echo "Publishing..."
```

## Git Workflow and Versioning

### Complete Picture
```
───────────────────o───────────o───────── master
                  ╱ ╲         ╱ ╲
                 ╱   ╲───────o╴╴╴o        hotfix/*
                ╱     ╲         ╱ ╲
           o───o╴╴╴╴╴╴╴o       ╱   ╲      release/*
          ╱ ╲ ╱       ╱ ╲     ╱     ╲
         ╱   o       ╱   ╲   ╱       ╲    bugfix/*
        ╱           ╱     ╲ ╱         ╲
───o───o───o───o───o───────o───────────o─ develop
    ╲ ╱ ╲ ╱ ╲ ╱ ╲ ╱
     o   o   o   o                        feature/*
```

### `master`
All commits into master are Fast-Forward Only `--ff-only` Merges, CI Release Builds occur just before merging, running this build again is a no-op since the artifacts have already been published. All commits in `master` will point to the original CI Release Build. [`release/*`](#feature) and [`hotfix/*`](#hotfix) branches target `master`.

### `develop`
Functionally the same as [`master`](#master) and more. First[ `release/*`](#feature) and [`hotfix/*`](#hotfix) branches are integrated back into `develop`, this involves locking `develop` during this process since its the only point in the workflow where a No Fast-Forward `--no-ff` merge occurs to keep the history with [`master`](#master) intact. [`feature/*`](#feature) branches target `develop`

### `feature/*`
```
───o───o develop
    ╲ ╱
     o   feature/*
```
`VERSION` examples:
```
repo        : 6.4.0-dev.8 ⇒ 6.4.0-dev.9
component-a : 3.4.0-dev.0 ⇒ 3.4.0-dev.1
component-b : 1.2.0-dev.5 ⇒ 1.2.0-dev.6
```
Workflow:
1. Async: Checkout new branch `feature/*` from [`develop`](#develop)
2. Async: Push Commits to `feature/*`
   1. Sync: Bump `major` / `minor` version bump with `-dev.0` pre-release, if first change to component
   2. Sync: CI Snapshot Build
3. Async: Merge
   1. Sync: Squash `feature/*` commits
   2. Sync: Rebase `feature/*` onto [`develop`](#develop)
   3. Sync: Increment `-dev.x` to changed components `VERSION` file, if not first change to component
   4. Sync: CI Release Build
   5. Sync: [`develop`](#develop) Fast-Forward Only `--ff-only` Merge in `feature/*`
   6. Sync: Delete `feature/*`

### `release/*`
At a point in time, a decision is made to take what has been developed (in [`develop`](#develop)) and promote to production (in [`master`](#master)). `release/*` allows testing on a 'snapshot' of changes and fix issues with [`bugfix/*`](#bugfix) branches.
```
─────────────────o─────── master
                ╱ ╲
           o───o╴╴╴o      release/*
          ╱ ╲ ╱   ╱ ╲
         ╱   o   ╱   ╲    bugfix/*
        ╱       ╱     ╲
───o───o───o───o───────o─ develop
```
`VERSION` examples (merging to [`master`](#master)):
```
repo        : 6.4.0-dev.8 ⇒ 6.4.0
component-a : 3.4.0-dev.0 ⇒ 3.4.0
component-b : 1.2.0-dev.5 ⇒ 1.2.0
```
Workflow:
1. Async: Checkout new branch `release/*` from [`develop`](#develop)
   1. Sync: replace all `-dev.x` pre-release version bump with `-rc.0`
   2. Sync: CI Build
2. Async: Checkout new branch [`bugfix/*`](#bugfix) from `release/*`, see [`bugfix/*` workflow](#bugfix)
3. Async: 1st Merge
   1. Sync: drop pre-release version
   2. Sync: CI Release Build
   3. Sync: [`master`](#master) Fast-Forward Only `--ff-only` Merge in `release/*`
4. Async: 2nd Merge
   1. Sync: Lock [`develop`](#develop)
   2. Sync: `release/*` No Fast-Forward `--no-ff` Merge in [`develop`](#develop)
   3. Sync: Increment `-dev.x` to changed components `VERSION` file, if not first change to component
   4. Sync: CI Release Build
   5. Sync: [`develop`](#develop) Fast-Forward Only `--ff-only` Merge in `release/*`
   6. Sync: Delete `release/*`
   7. Sync: Unlock [`develop`](#develop)

### `bugfix/*`
Functionally the same as [`feature/*`](#feature) but is created and merged into [`release/*`](#release). Pre-release versions are `-rc.x`
```
───o───o╴ release/*
    ╲ ╱
     o    bugfix/*
```
`VERSION` examples:
```
repo        : 6.4.0-rc.8 ⇒ 6.4.0-rc.9
component-a : 3.4.0-rc.0 ⇒ 3.4.0-rc.1
component-b : 1.2.0-rc.5 ⇒ 1.2.0-rc.6
```
Workflow:
1. Async: Checkout new branch `bugfix/*` from [`release/*`](#release)
2. Async: Push Commits to `bugfix/*`
   1. Sync: `minor` version bump with `-rc.0` pre-release, if first change to component
   2. Sync: CI Snapshot Build
3. Async: Merge
   1. Sync: Squash `bugfix/*` commits
   2. Sync: Rebase `bugfix/*` onto [`release/*`](#release)
   3. Sync: Increment `-rc.x` to changed components `VERSION` file, if not first change to component
   4. Sync: CI Release Build
   5. Sync: [`release/*`](#release) Fast-Forward Only `--ff-only` Merge in `bugfix/*`
   6. Sync: Delete `bugfix/*`

### `hotfix/*`
Functionally the same as [`release/*`](#release) but is created from [`master`](#master) and contains a single commit. Components are bumped `patch`. Pre-release versions are `-hotfix`.

**Note** if there is a [`release/*`](#release) branch, the 2nd merge target ([`develop`](#develop)) is replaced with that [`release/*`](#release) branch.
```
───o───o───── master
    ╲ ╱ ╲
     o╴╴╴o    hotfix/*
        ╱ ╲
───────o───o─ develop
```
`VERSION` examples (merging to [`master`](#master)):
```
repo        : 6.4.0 ⇒ 6.4.1
component-a : 3.4.0 ⇒ 3.4.1
component-b : 1.2.0 ⇒ 1.2.1
```
Workflow:
1. Async: Checkout new branch `hotfix/*` from [`develop`](#develop)
2. Async: Push Commits to `hotfix/*`
   1. Sync: `patch` version bump, if first change to component
   2. Sync: CI Snapshot Build
3. Async: 1st Merge
   1. Sync: drop pre-release version
   2. Sync: CI Release Build
   3. Sync: [`master`](#master) Fast-Forward Only `--ff-only` Merge in `hotfix/*`
4. Async: 2nd Merge
   1. Sync: Lock [`develop`](#develop)
   2. Sync: `hotfix/*` No Fast-Forward `--no-ff` Merge in [`develop`](#develop)
   3. Sync: Increment `-dev.x` to changed components `VERSION` file, if not first change to component
   4. Sync: CI Release Build
   5. Sync: [`develop`](#develop) Fast-Forward Only `--ff-only` Merge in `hotfix/*`
   6. Sync: Delete `hotfix/*`
   7. Sync: Unlock [`develop`](#develop)

## Auto-generated Build Pipeline

### Step 1 - Identify Components

1. Find all `VERSION` files, the directory is a Component
2. Filter out Components that have Git Tags for its `VERSION`

### Step 2 - Build a Directed Graph by adding a Vertex for every Component and adding an Edges to every Dependency of that Component

```
.
├── tests1
│   ├── app1
│   │   ├── lib1
│   │   └── lib3
│   │       └── lib2
│   └── app2
│       └── lib3
│           └── lib2
└── tests2
    └── app2
        └── lib3
            └── lib2
```

### Step 3 - Find Vertices without Outgoing Edges (i.e. no Dependency)
Found Vertices labeled with `*`

```
.
├── tests1
│   ├── app1
│   │   ├── lib1 *
│   │   └── lib3
│   │       └── lib2 *
│   └── app2
│       └── lib3
│           └── lib2 *
└── tests2
    └── app2
        └── lib3
            └── lib2 *
```

### Step 4 - Create first parallel stage

```
.
├──  lib1
└──  lib2
```

### Step 5 - Remove Vertices from previous step and find Vertices without Outgoing Edges (i.e. no dependency)
Found Vertices labeled with `*`

```
.
├── tests1
│   ├── app1
│   │   └── lib3 *
│   └── app2
│       └── lib3 *
└── tests2
    └── app2
        └── lib3 *
```

### Step 4 - Create second parallel stage

```
.
├──  lib1
└──  lib2  ─────  lib3
```

### Step 5 - Remove Vertices from previous step and find Vertices without Outgoing Edges (i.e. no dependency)
Found Vertices labeled with `*`

```
.
├── tests1
│   ├── app1 *
│   └── app2 *
└── tests2
    └── app2 *
```

### Step 6 - Create third parallel stage

```
.
├──  lib1  ───────────────┬──  app1
└──  lib2  ─────  lib3  ──┴──  app2
```

### Step 7 - Remove Vertices from previous step and find Vertices without Outgoing Edges (i.e. no dependency)
Found Vertices labeled with `*`

```
.
├── tests1 *
└── tests2 *
```

### Step 8 - Create forth parallel stage

```
.
├──  lib1  ───────────────┬──  app1  ──┬── tests1
└──  lib2  ─────  lib3  ──┴──  app2  ──┴── tests2
```

## Decisions

### D-1 Component Version Source of Truth

* **Outcome**:
  * Option 1: `VERSION` file
* **Options**:
  * **Option 1**: `VERSION` file
    * **Pros:**
      * Automated in CI, if build triggers omit automated commits
      * Searchable in repo history, if part of commit message
      * Consistent across components
    * **Cons:**
      * Breaks "commit sha" ⇒ "component version" relationship, if automated
      * Keeping Git Tag and `package.json` in sync
  * **Option 2**: Git Tag
    * **Pros:**
      * Automated in CI, if build triggers omit tags pushed
      * Searchable in repo history, if all tags are pulled
      * Git Tagging should be done regardless other Options as best practice
      * Strict "commit sha" ⇒ "component version" relationship
      * CI Shallow Builds, using Tag as an indicator of a build already done
      * Consistent across components
    * **Cons:**
      * Keeping Git Tag and `package.json` in sync
  * **Option 3**: `package.json` / `build.gradle`
    * **Pros:**
      * Aligns with component framework standards (npm / maven)
      * Automated in CI, if build triggers omit automated commits
      * Searchable in repo history, if part of commit message
    * **Cons:**
      * Inconsistent across components
      * Breaks "commit sha" ⇒ "version" relationship, if automated
* **Recommended Option**:
  * Option 1: `VERSION` file
    * Manually triggered via Make:
      * `$ make version-<component>-patch`
      * `$ make version-<component>-minor`
      * `$ make version-<component>-major`
    * Make Targets updates:
      * Component `VERSION` and `package.json`
      * Dependent Components `package.json`
    * Build Pipeline creates Git Tags upon pipeline completion

### D-2 Component Independent Versioning

* **Outcome**:
  * Option 2: Semantic Versioning per component
* **Options**:
  * **Option 1**: Aligned to Mono-repo `VERSION`
    * **Pros:**
      * Consistent across components
    * **Cons:**
      * Breaking changes across components are not defined as a major version bump
  * **Option 2**: Semantic Versioning per component
    * **Pros:**
      * Existing components migrated to Mono-repo can retain versioning lineage
    * **Cons:**
      * Each component requires versioning step
      * Each dependent dependencies require change
* **Recommended Option**:
  * Option 2: Semantic Versioning per component
    * Build Pipeline asserts diff on component ⇒ version bump
    * Build Pipeline asserts dependent requires change if dependencies change
      * This doesn't 100% assert that dependent change actually targets new dependency version, but should be captured during code review
        * Could use dependency reports to check pre-build
