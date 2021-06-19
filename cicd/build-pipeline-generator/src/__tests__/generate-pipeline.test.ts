import { DepGraph } from 'dependency-graph'

import { Component } from '../generate-dep-graph'
import generatePipeline from '../generate-pipeline'

test('empty graph', () => {
  const graph = new DepGraph<Component>()

  const pipeline = generatePipeline(graph)
  expect(pipeline.parallelStages.length).toBe(0)
})

test(`
.
└── app1
`, () => {
  const graph = new DepGraph<Component>()

  graph.addNode('app1', { name: 'app1', path: '' })

  const pipeline = generatePipeline(graph)
  expect(pipeline.parallelStages.length).toBe(1)
  expect(pipeline.parallelStages[0].name).toEqual('1')
  expect(pipeline.parallelStages[0].stages.length).toBe(1)
  expect(pipeline.parallelStages[0].stages[0].name).toEqual('app1')
})

test(`
.
└── app1
    └── lib1
`, () => {
  const graph = new DepGraph<Component>()

  graph.addNode('app1', { name: 'app1', path: '' })
  graph.addNode('lib1', { name: 'lib1', path: '' })

  graph.addDependency('app1', 'lib1')

  const pipeline = generatePipeline(graph)
  expect(pipeline.parallelStages.length).toBe(2)
  expect(pipeline.parallelStages[0].name).toEqual('1')
  expect(pipeline.parallelStages[0].stages.length).toBe(1)
  expect(pipeline.parallelStages[0].stages[0].name).toEqual('lib1')
  expect(pipeline.parallelStages[1].name).toEqual('2')
  expect(pipeline.parallelStages[1].stages.length).toBe(1)
  expect(pipeline.parallelStages[1].stages[0].name).toEqual('app1')
})

test(`
.
├── app1
│   └── lib1
└── app2
    └── lib1
`, () => {
  const graph = new DepGraph<Component>()

  graph.addNode('app1', { name: 'app1', path: '' })
  graph.addNode('app2', { name: 'app2', path: '' })
  graph.addNode('lib1', { name: 'lib1', path: '' })

  graph.addDependency('app1', 'lib1')
  graph.addDependency('app2', 'lib1')

  const pipeline = generatePipeline(graph)
  expect(pipeline.parallelStages.length).toBe(2)
  expect(pipeline.parallelStages[0].name).toEqual('1')
  expect(pipeline.parallelStages[0].stages.length).toBe(1)
  expect(pipeline.parallelStages[0].stages[0].name).toEqual('lib1')
  expect(pipeline.parallelStages[1].name).toEqual('2')
  expect(pipeline.parallelStages[1].stages.length).toBe(2)
  expect(pipeline.parallelStages[1].stages[0].name).toEqual('app1')
  expect(pipeline.parallelStages[1].stages[1].name).toEqual('app2')
})

test(`
.
├── app1
│   ├── lib1
│   └── lib2
└── app2
    ├── lib1
    └── lib2
`, () => {
  const graph = new DepGraph<Component>()

  graph.addNode('app1', { name: 'app1', path: '' })
  graph.addNode('app2', { name: 'app2', path: '' })
  graph.addNode('lib1', { name: 'lib1', path: '' })
  graph.addNode('lib2', { name: 'lib2', path: '' })

  graph.addDependency('app1', 'lib1')
  graph.addDependency('app1', 'lib2')
  graph.addDependency('app2', 'lib1')
  graph.addDependency('app2', 'lib2')

  const pipeline = generatePipeline(graph)
  expect(pipeline.parallelStages.length).toBe(2)
  expect(pipeline.parallelStages[0].name).toEqual('1')
  expect(pipeline.parallelStages[0].stages.length).toBe(2)
  expect(pipeline.parallelStages[0].stages[0].name).toEqual('lib1')
  expect(pipeline.parallelStages[0].stages[1].name).toEqual('lib2')
  expect(pipeline.parallelStages[1].name).toEqual('2')
  expect(pipeline.parallelStages[1].stages.length).toBe(2)
  expect(pipeline.parallelStages[1].stages[0].name).toEqual('app1')
  expect(pipeline.parallelStages[1].stages[1].name).toEqual('app2')
})

test(`
.
└── tests1
    ├── app1
    │   ├── lib1
    │   └── lib2
    └── app2
        ├── lib1
        └── lib2
`, () => {
  const graph = new DepGraph<Component>()

  graph.addNode('app1', { name: 'app1', path: '' })
  graph.addNode('app2', { name: 'app2', path: '' })
  graph.addNode('lib1', { name: 'lib1', path: '' })
  graph.addNode('lib2', { name: 'lib2', path: '' })
  graph.addNode('tests1', { name: 'tests1', path: '' })

  graph.addDependency('app1', 'lib1')
  graph.addDependency('app1', 'lib2')
  graph.addDependency('app2', 'lib1')
  graph.addDependency('app2', 'lib2')
  graph.addDependency('tests1', 'app1')
  graph.addDependency('tests1', 'app2')

  const pipeline = generatePipeline(graph)
  expect(pipeline.parallelStages.length).toBe(3)
  expect(pipeline.parallelStages[0].name).toEqual('1')
  expect(pipeline.parallelStages[0].stages.length).toBe(2)
  expect(pipeline.parallelStages[0].stages[0].name).toEqual('lib1')
  expect(pipeline.parallelStages[0].stages[1].name).toEqual('lib2')
  expect(pipeline.parallelStages[1].name).toEqual('2')
  expect(pipeline.parallelStages[1].stages.length).toBe(2)
  expect(pipeline.parallelStages[1].stages[0].name).toEqual('app1')
  expect(pipeline.parallelStages[1].stages[1].name).toEqual('app2')
  expect(pipeline.parallelStages[2].name).toEqual('3')
  expect(pipeline.parallelStages[2].stages.length).toBe(1)
  expect(pipeline.parallelStages[2].stages[0].name).toEqual('tests1')
})

test(`
.
├── app3
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
`, () => {
  const graph = new DepGraph<Component>()

  graph.addNode('app1', { name: 'app1', path: '' })
  graph.addNode('app2', { name: 'app2', path: '' })
  graph.addNode('app3', { name: 'app3', path: '' })
  graph.addNode('lib1', { name: 'lib1', path: '' })
  graph.addNode('lib2', { name: 'lib2', path: '' })
  graph.addNode('lib3', { name: 'lib3', path: '' })
  graph.addNode('tests1', { name: 'tests1', path: '' })
  graph.addNode('tests2', { name: 'tests2', path: '' })

  graph.addDependency('tests1', 'app1')
  graph.addDependency('tests1', 'app2')
  graph.addDependency('tests2', 'app2')
  graph.addDependency('app1', 'lib1')
  graph.addDependency('app1', 'lib3')
  graph.addDependency('app2', 'lib3')
  graph.addDependency('lib3', 'lib2')

  const pipeline = generatePipeline(graph)
  expect(pipeline.parallelStages.length).toBe(4)
  expect(pipeline.parallelStages[0].name).toEqual('1')
  expect(pipeline.parallelStages[0].stages.length).toBe(3)
  expect(pipeline.parallelStages[0].stages[0].name).toEqual('app3')
  expect(pipeline.parallelStages[0].stages[1].name).toEqual('lib1')
  expect(pipeline.parallelStages[0].stages[2].name).toEqual('lib2')
  expect(pipeline.parallelStages[1].name).toEqual('2')
  expect(pipeline.parallelStages[1].stages.length).toBe(1)
  expect(pipeline.parallelStages[1].stages[0].name).toEqual('lib3')
  expect(pipeline.parallelStages[2].name).toEqual('3')
  expect(pipeline.parallelStages[2].stages.length).toBe(2)
  expect(pipeline.parallelStages[2].stages[0].name).toEqual('app1')
  expect(pipeline.parallelStages[2].stages[1].name).toEqual('app2')
  expect(pipeline.parallelStages[3].name).toEqual('4')
  expect(pipeline.parallelStages[3].stages.length).toBe(2)
  expect(pipeline.parallelStages[3].stages[0].name).toEqual('tests1')
  expect(pipeline.parallelStages[3].stages[1].name).toEqual('tests2')
})
