import { DepGraph } from 'dependency-graph'

import { Component } from './generate-dep-graph'

export interface ParallelStage {
  name: string
  stages: Component[]
}

export interface Pipeline {
  parallelStages: ParallelStage[]
}

/**
 * Converts a Directed Graph into a Build Pipeline that adheres to dependency ordering and optimise performance by grouping unrelated components into stages that can run in parallel
 * @param graph Directed Graph contains components as nodes and its dependencies as edges
 * @returns Build Pipeline with dependency ordering and parallelism
 */
export default function generatePipeline(graph: DepGraph<Component>): Pipeline {
  // Exit if nothing to do
  if (graph.size() === 0) {
    return {
      parallelStages: [],
    }
  }

  return {
    parallelStages: [
      {
        // Map over all the 'leaves' (components that have no dependencies) combining them into a group to be run in parallel
        stages: graph.overallOrder(true).map((node) => {
          const component = graph.getNodeData(node)
          graph.removeNode(node) // Once the node has been added to the build pipeline, discard it. This leaves components that once had a dependency (this one) now added to the next parallel stage
          return component
        }),
        name: '', // Create the name later once all the parallel stages are known
      },
    ]
      .concat(generatePipeline(graph).parallelStages) // Go down the next level of `leaves` and generate the next parallel stage, this recursively happens until the graph is empty (all components added to the build pipeline), add the resulting parallel stages
      // Create friendly names for the parallel stages, using its index as a name
      .map((val, i) => ({
        ...val,
        name: `${i + 1}`,
      })),
  }
}
