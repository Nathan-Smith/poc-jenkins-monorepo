# PoC Jenkins Mono Repo

## Requirements
1. Docker

## Run Jenkins
`$  docker-compose up jenkins`

This will run on `http://localhost:8080`

## Component

### Structure
```
.
├── deps        List of dependencies
└── Makefile    ci target required
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

## Auto-generated Build Pipeline

### Step 1 - Create Directed Graph by added Edges towards Dependencies and find Vertices without Outgoing Edges (i.e. no dependency)
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

### Step 2 - Create first parallel stage

```
.
├──  lib1
└──  lib2
```

### Step 3 - Remove Vertices from previous step and find Vertices without Outgoing Edges (i.e. no dependency)
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
